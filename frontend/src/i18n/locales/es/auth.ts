export default {
  signIn: {
    title: 'Iniciar Sesión',
    subtitle: 'Bienvenido de nuevo a tu jornada financiera',
    emailPlaceholder: 'Ingresa tu correo',
    passwordPlaceholder: 'Ingresa tu contraseña',
    forgotPassword: '¿Olvidaste tu contraseña?',
    signInButton: 'Iniciar Sesión',
    noAccount: '¿No tienes una cuenta?',
    signUpLink: 'Registrarse',
    signingIn: 'Iniciando sesión...',
  },

  signUp: {
    title: 'Crear Cuenta',
    subtitle: 'Comienza tu jornada de educación financiera',
    firstNamePlaceholder: 'Nombre',
    lastNamePlaceholder: 'Apellido',
    emailPlaceholder: 'Correo Electrónico',
    passwordPlaceholder: 'Contraseña (mín 8 caracteres)',
    confirmPasswordPlaceholder: 'Confirmar Contraseña',
    signUpButton: 'Crear Cuenta',
    haveAccount: '¿Ya tienes una cuenta?',
    signInLink: 'Iniciar Sesión',
    creatingAccount: 'Creando cuenta...',
    terms:
      'Al registrarte, aceptas nuestros Términos de Servicio y Política de Privacidad',
  },

  forgotPassword: {
    title: 'Restablecer Contraseña',
    subtitle:
      'Ingresa tu correo para recibir instrucciones de restablecimiento',
    emailPlaceholder: 'Ingresa tu correo',
    sendButton: 'Enviar Enlace de Restablecimiento',
    backToSignIn: 'Volver a Iniciar Sesión',
    checkEmail: 'Revisa tu correo para las instrucciones de restablecimiento',
  },

  validation: {
    emailRequired: 'El correo es obligatorio',
    emailInvalid: 'Por favor ingresa un correo válido',
    passwordRequired: 'La contraseña es obligatoria',
    passwordTooShort: 'La contraseña debe tener al menos 8 caracteres',
    confirmPasswordRequired: 'Por favor confirma tu contraseña',
    passwordsDoNotMatch: 'Las contraseñas no coinciden',
    firstNameRequired: 'El nombre es obligatorio',
    lastNameRequired: 'El apellido es obligatorio',
  },

  errors: {
    loginFailed: 'Error al iniciar sesión. Verifica tus credenciales.',
    registrationFailed: 'Error al registrarse. Inténtalo de nuevo.',
    emailAlreadyExists: 'Ya existe una cuenta con este correo',
    invalidCredentials: 'Correo o contraseña inválidos',
    networkError:
      'No se puede conectar al servidor. Verifica tu conexión a internet.',
    serverError: 'Error del servidor. Inténtalo más tarde.',
  },

  success: {
    accountCreated: '¡Cuenta creada exitosamente!',
    loginSuccessful: '¡Inicio de sesión exitoso!',
    passwordResetSent:
      'Instrucciones de restablecimiento de contraseña enviadas a tu correo',
  },
};
