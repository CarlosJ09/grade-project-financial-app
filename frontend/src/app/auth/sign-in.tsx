import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStore } from '@/stores';

const SignIn = () => {
  const { login, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [rememberSession, setRememberSession] = useState(false);

  const [errors, setErrors] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    // Clear previous errors
    clearError();
    setErrors({
      email: '',
      password: '',
    });

    // Basic validation
    if (!formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email es requerido' }));
      return;
    }
    if (!formData.password.trim()) {
      setErrors(prev => ({ ...prev, password: 'Contraseña es requerida' }));
      return;
    }

    await login(formData);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-600">
      <View className="flex-1 justify-center p-8">
        <View className="mb-8 w-full gap-8">
          <TextInput
            label="Email"
            placeholder="ejemplo@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={text =>
              setFormData(prev => ({ ...prev, email: text }))
            }
            error={errors.email}
          />

          <TextInput
            label="Contraseña"
            placeholder="*********"
            secureTextEntry
            value={formData.password}
            onChangeText={text =>
              setFormData(prev => ({ ...prev, password: text }))
            }
            error={errors.password}
          />

          <View className="flex-row items-center gap-2">
            <Checkbox
              value={rememberSession}
              onValueChange={setRememberSession}
            />
            <Text>Recordar Sesión</Text>
          </View>
        </View>

        {error && (
          <View className="mb-4 rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
            <Text className="text-center text-red-600 dark:text-red-400">
              {error.message}
            </Text>
          </View>
        )}

        <Button
          title={isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
          onPress={handleLogin}
          disabled={isLoading}
        />

        <Link href="/auth/forgot-password" asChild>
          <Text className="mt-4">Olvidé mi contraseña</Text>
        </Link>

        <View className="mt-16 flex-row items-center justify-center gap-2">
          <Text>No tienes una cuenta?</Text>
          <Link href="/auth/sign-up" asChild>
            <Text>Registrate</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
