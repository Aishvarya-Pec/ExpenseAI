import React, { useState } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { AuthLayout } from './AuthLayout'

type AuthMode = 'login' | 'register'

interface AuthPageProps {
  onSuccess?: () => void
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login')

  const getTitle = () => {
    switch (mode) {
      case 'login':
        return 'Welcome Back'
      case 'register':
        return 'Create Account'
      default:
        return 'ExpenseAI'
    }
  }

  const getSubtitle = () => {
    switch (mode) {
      case 'login':
        return 'Sign in to your account to continue'
      case 'register':
        return 'Start tracking your expenses with AI'
      default:
        return ''
    }
  }

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700',
                card: 'bg-white dark:bg-gray-800 shadow-xl',
                headerTitle: 'text-gray-900 dark:text-white',
                headerSubtitle: 'text-gray-600 dark:text-gray-400',
                socialButtonsBlockButton: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
                formFieldInput: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
                formFieldLabel: 'text-gray-700 dark:text-gray-300',
                footerActionLink: 'text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300',
              }
            }}
            afterSignInUrl="/dashboard"
            signUpUrl="/auth?mode=register"
            redirectUrl="/dashboard"
          />
        )
      case 'register':
        return (
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700',
                card: 'bg-white dark:bg-gray-800 shadow-xl',
                headerTitle: 'text-gray-900 dark:text-white',
                headerSubtitle: 'text-gray-600 dark:text-gray-400',
                socialButtonsBlockButton: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
                formFieldInput: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
                formFieldLabel: 'text-gray-700 dark:text-gray-300',
                footerActionLink: 'text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300',
              }
            }}
            afterSignUpUrl="/dashboard"
            signInUrl="/auth?mode=login"
            redirectUrl="/dashboard"
          />
        )
      default:
        return null
    }
  }

  return (
    <AuthLayout title={getTitle()} subtitle={getSubtitle()}>
      <div className="flex justify-center">
        {renderForm()}
      </div>
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </AuthLayout>
  )
}