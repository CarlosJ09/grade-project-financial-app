import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  const [errors, setErrors] = useState<{
    cedula: string;
    email: string;
    password: string;
  }>({
    cedula: '',
    email: '',
    password: '',
  });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-600">
      <View className="flex-1 justify-center p-8">
        <View className="mb-8 w-full gap-8">
          <TextInput
            label="Cédula"
            placeholder="000-0000000-0"
            keyboardType="numeric"
            error={errors.cedula}
          />

          <TextInput
            label="Correo Electrónico"
            placeholder="ejemplo@example.com"
            keyboardType="email-address"
            error={errors.email}
          />

          <TextInput
            label="Contraseña"
            placeholder="*********"
            keyboardType="visible-password"
            error={errors.password}
          />
        </View>

        <Button title="Registrarse" onPress={() => {}} />

        <View className="mt-16 flex-row items-center justify-center gap-2">
          <Text>Ya tienes una cuenta?</Text>
          <Link href="/app/(auth)/sign-in" asChild>
            <Text>Inicia Sesión</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
