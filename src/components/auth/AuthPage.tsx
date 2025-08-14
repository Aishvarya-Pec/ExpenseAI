import React, { useState, useEffect } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { AuthLayout } from './AuthLayout'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'


type AuthMode = 'login' | 'register'

interface AuthPageProps {
  onSuccess?: () => void
  mode?: AuthMode
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode: initialMode = 'login', onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>(initialMode)

// eslint-disable-next-line @typescript-eslint/no-unused-vars

  // Update mode when prop changes
  useEffect(() => {
    setMode(initialMode)
  }, [initialMode])

  const isClerkConfigured = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && import.meta.env.VITE_CLERK_PUBLISHABLE_KEY !== 'pk_test_your-clerk-key')

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
    // If Clerk is not configured, render local forms
    if (!isClerkConfigured) {
      return mode === 'login' ? (
        <LoginForm onToggleMode={() => setMode('register')} onForgotPassword={() => setMode('login')} onSuccess={onSuccess} />
      ) : (
        <RegisterForm onToggleMode={() => setMode('login')} onSuccess={onSuccess} />
      )
    }

    // Otherwise, render Clerk widgets
    switch (mode) {
      case 'login':
        return (
          <SignIn
            appearance={{
              elements: {
              
                formButtonPrimary: 'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold',
                card: 'bg-gray-900 border border-yellow-500/20 shadow-2xl',
                headerTitle: 'text-white',
                headerSubtitle: 'text-gray-300',
                socialButtonsBlockButton: 'border border-yellow-500/30 hover:bg-yellow-500/10 text-white',
                formFieldInput: 'border-yellow-500/30 bg-black/50 text-white placeholder-gray-400 focus:border-yellow-500',
                formFieldLabel: 'text-gray-300',
                footerActionLink: 'text-yellow-400 hover:text-yellow-300',
                dividerLine: 'bg-yellow-500/20',
                dividerText: 'text-gray-400',
                formFieldInputShowPasswordButton: 'text-yellow-400 hover:text-yellow-300',
                identityPreviewText: 'text-gray-300',
                identityPreviewEditButton: 'text-yellow-400 hover:text-yellow-300',
              }
            }}

            afterSignInUrl="#dashboard"
            signUpUrl="#signup"
            redirectUrl="#dashboard"
          />
        )
      case 'register':
        return (
          <SignUp
            appearance={{
              elements: {
               
                formButtonPrimary: 'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold',
                card: 'bg-gray-900 border border-yellow-500/20 shadow-2xl',
                headerTitle: 'text-white',
                headerSubtitle: 'text-gray-300',
                socialButtonsBlockButton: 'border border-yellow-500/30 hover:bg-yellow-500/10 text-white',
                formFieldInput: 'border-yellow-500/30 bg-black/50 text-white placeholder-gray-400 focus:border-yellow-500',
                formFieldLabel: 'text-gray-300',
                footerActionLink: 'text-yellow-400 hover:text-yellow-300',
                dividerLine: 'bg-yellow-500/20',
                dividerText: 'text-gray-400',
                formFieldInputShowPasswordButton: 'text-yellow-400 hover:text-yellow-300',
                identityPreviewText: 'text-gray-300',
                identityPreviewEditButton: 'text-yellow-400 hover:text-yellow-300',
              }
            }}

            afterSignUpUrl="#dashboard"
            signInUrl="#signin"
            redirectUrl="#dashboard"
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
       
        <p className="text-sm text-gray-400">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          
            className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </AuthLayout>
  )
}
