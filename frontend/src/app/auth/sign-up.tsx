import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStore } from '@/stores/authStore';

const SignUp = () => {
  const { register, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    identificationNumber: '',
    email: '',
    password: '',
    name: '',
    lastName: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState<{
    identificationNumber: string;
    email: string;
    password: string;
    name: string;
    lastName: string;
    dateOfBirth: string;
  }>({
    identificationNumber: '',
    email: '',
    password: '',
    name: '',
    lastName: '',
    dateOfBirth: '',
  });

  const handleRegister = async () => {
    // Clear previous errors
    clearError();
    setErrors({
      identificationNumber: '',
      email: '',
      password: '',
      name: '',
      lastName: '',
      dateOfBirth: '',
    });

    // Basic validation
    if (!formData.identificationNumber.trim()) {
      setErrors(prev => ({
        ...prev,
        identificationNumber: 'Cédula es requerida',
      }));
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
    if (!formData.name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Nombre es requerido' }));
      return;
    }
    if (!formData.lastName.trim()) {
      setErrors(prev => ({ ...prev, lastName: 'Apellido es requerido' }));
      return;
    }
    if (!formData.dateOfBirth.trim()) {
      setErrors(prev => ({
        ...prev,
        dateOfBirth: 'Fecha de nacimiento es requerida',
      }));
      return;
    }

    await register(formData);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-600">
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 16 }}>
        <View className="mb-8 w-full gap-8">
          <TextInput
            label="Nombre"
            placeholder="Juan"
            value={formData.name}
            onChangeText={text =>
              setFormData(prev => ({ ...prev, name: text }))
            }
            error={errors.name}
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
            value={formData.identificationNumber}
            onChangeText={text =>
              setFormData(prev => ({ ...prev, identificationNumber: text }))
            }
            error={errors.identificationNumber}
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

          <TextInput
            label="Fecha de Nacimiento"
            placeholder="DD/MM/YYYY"
            value={formData.dateOfBirth}
            onChangeText={text =>
              setFormData(prev => ({ ...prev, dateOfBirth: text }))
            }
            error={errors.dateOfBirth}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
