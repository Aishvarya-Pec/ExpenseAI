import { useState, useEffect } from 'react'
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
// Check if Clerk is properly configured
const isClerkConfigured = () => {
  const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  return key && key !== 'pk_test_your-clerk-key'
}
export const useAuth = () => {
  // Only use Clerk hooks if Clerk is configured
  const clerkConfigured = isClerkConfigured()
  const { user, isLoaded: userLoaded } = clerkConfigured ? useUser() : { user: null, isLoaded: true }
  const { signOut: clerkSignOut } = clerkConfigured ? useClerkAuth() : { signOut: async () => {} }
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (isClerkConfigured()) {
      // Use real Clerk authentication
      setLoading(!userLoaded)
    } else {
      // Use mock authentication for development
      
      // Using mock authentication for development
      setLoading(false)
    }
  }, [userLoaded])



  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true)
      

      if (isClerkConfigured()) {
        // Clerk handles signup through their UI components
        // This function is kept for compatibility but Clerk signup is typically done via <SignUp />
        toast.success('Please use the signup form below!')
        return { data: { user }, error: null }
      } else {
        // Mock signup for development
       
        // Mock signup for development
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
       
        toast.success(`Account created successfully for ${fullName}! (Mock mode)`)
        // Use the parameters to satisfy linting
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
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const signIn = async (email: string, _password: string) => {
    try {
      setLoading(true)
      


      if (isClerkConfigured()) {
        // Clerk handles signin through their UI components
        // This function is kept for compatibility but Clerk signin is typically done via <SignIn />
        toast.success('Please use the signin form below!')
        return { data: { user }, error: null }
      } else {
        // Mock signin for development
        console.log('🎭 Using mock authentication')
        // Mock authentication for development
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
        toast.success(`Welcome back, ${email}! (Mock mode)`)
        // Use the email parameter to satisfy linting
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
        // Mock signout for development
        await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
        toast.success('Signed out successfully (Mock mode)')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resetPassword = async (_email: string) => {
    try {
      if (isClerkConfigured()) {
        // Clerk handles password reset through their UI components
        toast.success('Please use the password reset form!')
        return { error: null }
      } else {
        // Mock password reset for development
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
        toast.success('Password reset email sent! (Mock mode)')
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