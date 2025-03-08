import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useState } from 'react'

// 言語オプションのリスト
const languages = [
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
  { code: 'ko', name: '한국어' },
]

export default function Navigation() {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('ja') // デフォルト言語を日本語に設定
  
  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen)
  }
  
  const selectLanguage = (langCode: string) => {
    setCurrentLanguage(langCode)
    setIsLanguageMenuOpen(false)
    // ここで言語変更のロジックを実装（例：i18nライブラリの設定変更など）
    console.log(`言語を変更: ${langCode}`)
  }
  
  // 現在選択中の言語名を取得
  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === currentLanguage)
    return lang ? lang.name : 'Language'
  }
  
  return (
    <div>
      <nav className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white text-xl font-bold">My App</span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-4">
                <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="/projects" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
                <a href="/calendar" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a>
                <button 
                  onClick={toggleLanguageMenu}
                  className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isLanguageMenuOpen ? 'bg-gray-700 text-white' : ''}`}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    {getCurrentLanguageName()}
                  </span>
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium border border-gray-600">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="ml-4 flex items-center md:ml-6">
                  <UserButton 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10"
                      }
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
      
      {/* 言語選択メニュー */}
      {isLanguageMenuOpen && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-gray-100">
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">言語を選択</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => selectLanguage(lang.code)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    currentLanguage === lang.code
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 