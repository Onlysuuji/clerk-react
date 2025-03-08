import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from 'pg';
const { Pool } = pkg;  // Clientの代わりにPoolを使用

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// データベース接続プールの設定
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  // コネクション設定を追加
  max: 20,           // 最大プール数
  idleTimeoutMillis: 30000,  // コネクションのアイドルタイムアウト時間
  connectionTimeoutMillis: 2000, // コネクション取得のタイムアウト時間
});

// データベース接続エラーハンドリング
pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

// 環境変数の検証
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_DATABASE', 'DB_PORT'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// ユーザー一覧を取得 (パラメータ化されたクエリを使用)
app.get("/users", async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error.message);
    // ユーザーに詳細なエラーを見せないよう、一般的なエラーメッセージを返す
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // クライアントをリリースして接続プールに戻す
    client.release();
  }
});

// IDによるユーザー取得の追加 (パラメータ化されたクエリでSQLインジェクション対策)
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();
  
  try {
    // パラメータ化されたクエリ
    const result = await client.query("SELECT * FROM users WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
});

// グレースフルシャットダウンの処理
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

async function shutdown() {
  console.log('Shutting down server...');
  
  try {
    // データベースプールを終了
    await pool.end();
    console.log('Database pool has ended');
    
    // サーバーを正常終了
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
}

// サーバーポートを環境変数から取得（デフォルトは5000）
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
