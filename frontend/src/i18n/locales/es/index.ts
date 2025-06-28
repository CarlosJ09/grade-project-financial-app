// Import all translation modules
import auth from './auth';
import chat from './chat';
import common from './common';
import finances from './finances';
import home from './home';
import learn from './learn';
import navigation from './navigation';
import profile from './profile';

// Export consolidated translations
export default {
  // Common translations used across the app
  common,

  // Feature-specific translations
  auth,
  navigation,
  home,
  finances,
  learn,
  chat,
  profile,
};
