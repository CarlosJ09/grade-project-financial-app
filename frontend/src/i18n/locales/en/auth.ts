export default {
  // Sign In
  signIn: {
    title: 'Sign In',
    subtitle: 'Welcome back to your financial journey',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    forgotPassword: 'Forgot Password?',
    signInButton: 'Sign In',
    noAccount: "Don't have an account?",
    signUpLink: 'Sign Up',
    signingIn: 'Signing in...',
  },

  // Sign Up
  signUp: {
    title: 'Create Account',
    subtitle: 'Start your financial education journey',
    firstNamePlaceholder: 'First Name',
    lastNamePlaceholder: 'Last Name',
    emailPlaceholder: 'Email Address',
    passwordPlaceholder: 'Password (min 8 characters)',
    confirmPasswordPlaceholder: 'Confirm Password',
    signUpButton: 'Create Account',
    haveAccount: 'Already have an account?',
    signInLink: 'Sign In',
    creatingAccount: 'Creating account...',
    terms:
      'By signing up, you agree to our Terms of Service and Privacy Policy',
  },

  // Forgot Password
  forgotPassword: {
    title: 'Reset Password',
    subtitle: 'Enter your email to receive reset instructions',
    emailPlaceholder: 'Enter your email',
    sendButton: 'Send Reset Link',
    backToSignIn: 'Back to Sign In',
    checkEmail: 'Check your email for reset instructions',
  },

  // Validation Messages
  validation: {
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordTooShort: 'Password must be at least 8 characters',
    confirmPasswordRequired: 'Please confirm your password',
    passwordsDoNotMatch: 'Passwords do not match',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
  },

  // Error Messages
  errors: {
    loginFailed: 'Login failed. Please check your credentials.',
    registrationFailed: 'Registration failed. Please try again.',
    emailAlreadyExists: 'An account with this email already exists',
    invalidCredentials: 'Invalid email or password',
    networkError:
      'Cannot connect to server. Please check your internet connection.',
    serverError: 'Server error. Please try again later.',
  },

  // Success Messages
  success: {
    accountCreated: 'Account created successfully!',
    loginSuccessful: 'Login successful!',
    passwordResetSent: 'Password reset instructions sent to your email',
  },
};
