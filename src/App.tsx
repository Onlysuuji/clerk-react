import Navigation from './components/Navigation'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react'

export default function App() {
  const { user, isLoaded } = useUser();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SignedIn>
            {isLoaded ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h1 className="text-2xl font-bold text-gray-900">ユーザープロフィール</h1>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">ようこそ、{user?.firstName} {user?.lastName}さん</p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">フルネーム</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.fullName}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">メールアドレス</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.primaryEmailAddress?.emailAddress}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">ユーザーID</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.id}</dd>
                    </div>
                    {user?.imageUrl && (
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">プロフィール画像</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <img src={user.imageUrl} alt="プロフィール" className="h-20 w-20 rounded-full" />
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600">ユーザー情報を読み込み中...</p>
              </div>
            )}
          </SignedIn>
          
          <SignedOut>
            <div className="text-center py-12 bg-white shadow sm:rounded-lg">
              <h1 className="text-3xl font-bold text-gray-900">ようこそ</h1>
              <p className="mt-4 text-gray-600">ログインするとユーザー情報が表示されます。</p>
              <p className="mt-2 text-gray-500">右上のSign Inボタンからログインしてください。</p>
            </div>
          </SignedOut>
        </div>
      </main>
    </div>
  )
}