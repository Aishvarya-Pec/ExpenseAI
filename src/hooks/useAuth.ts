import { useState, useEffect } from 'react'
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

const isClerkConfigured = () => {
  const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  return key && key !== 'pk_test_your-clerk-key'
}

export const useAuth = () => {
  const clerkConfigured = isClerkConfigured()
  const { user, isLoaded: userLoaded } = clerkConfigured ? useUser() : { user: null, isLoaded: true }
  const { signOut: clerkSignOut } = clerkConfigured ? useClerkAuth() : { signOut: async () => {} }
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isClerkConfigured()) {
      setLoading(!userLoaded)
    } else {
      setLoading(false)
    }
  }, [userLoaded])

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true)
      
      if (isClerkConfigured()) {
        toast.success('Please use the signup form below!')
        return { data: { user }, error: null }
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success(`Account created successfully for ${fullName}!`)
        const mockUser = { email, fullName, hasPassword: password.length > 0 }
        return { data: { user: mockUser }, error: null }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }
  
  const signIn = async (email: string, _password: string) => {
    try {
      setLoading(true)
      
      if (isClerkConfigured()) {
        toast.success('Please use the signin form below!')
        return { data: { user }, error: null }
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success(`Welcome back, ${email}!`)
        const mockUser = { email }
        return { data: { user: mockUser }, error: null }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      
      if (isClerkConfigured()) {
        await clerkSignOut()
        toast.success('Signed out successfully')
      } else {
        await new Promise(resolve => setTimeout(resolve, 500))
        toast.success('Signed out successfully')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }
  
  const resetPassword = async (_email: string) => {
    try {
      if (isClerkConfigured()) {
        toast.success('Please use the password reset form!')
        return { error: null }
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success('Password reset email sent!')
        return { error: null }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage)
      return { error }
    }
  }

  return {
    user,
    session: user ? { user } : null,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }
}