import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStore } from '@/stores';

const SignUp = () => {
  const { register, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    cedula: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [errors, setErrors] = useState<{
    cedula: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }>({
    cedula: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleRegister = async () => {
    // Clear previous errors
    clearError();
    setErrors({
      cedula: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    });

    // Basic validation
    if (!formData.cedula.trim()) {
      setErrors(prev => ({ ...prev, cedula: 'Cédula es requerida' }));
      return;
    }
    if (!formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email es requerido' }));
      return;
    }
    if (!formData.password.trim()) {
      setErrors(prev => ({ ...prev, password: 'Contraseña es requerida' }));
      return;
    }
    if (!formData.firstName.trim()) {
      setErrors(prev => ({ ...prev, firstName: 'Nombre es requerido' }));
      return;
    }
    if (!formData.lastName.trim()) {
      setErrors(prev => ({ ...prev, lastName: 'Apellido es requerido' }));
      return;
    }

    await register(formData);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-600">
      <View className="flex-1 justify-center p-8">
        <View className="mb-8 w-full gap-8">
          <TextInput
            label="Nombre"
            placeholder="Juan"
            value={formData.firstName}
            onChangeText={text =>
              setFormData(prev => ({ ...prev, firstName: text }))
            }
            error={errors.firstName}
          />

          <TextInput
            label="Apellido"
            placeholder="Pérez"
            value={formData.lastName}
            onChangeText={text =>
              setFormData(prev => ({ ...prev, lastName: text }))
            }
            error={errors.lastName}
          />

          <TextInput
            label="Cédula"
            placeholder="000-0000000-0"
            keyboardType="numeric"
            value={formData.cedula}
            onChangeText={text =>
              setFormData(prev => ({ ...prev, cedula: text }))
            }
            error={errors.cedula}
          />

          <TextInput
            label="Correo Electrónico"
            placeholder="ejemplo@example.com"
            keyboardType="email-address"
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
        </View>

        {error && (
          <View className="mb-4 rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
            <Text className="text-center text-red-600 dark:text-red-400">
              {error.message}
            </Text>
          </View>
        )}

        <Button
          title={isLoading ? 'Registrando...' : 'Registrarse'}
          onPress={handleRegister}
          disabled={isLoading}
        />

        <View className="mt-16 flex-row items-center justify-center gap-2">
          <Text>Ya tienes una cuenta?</Text>
          <Link href="/auth/sign-in" asChild>
            <Text>Inicia Sesión</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
