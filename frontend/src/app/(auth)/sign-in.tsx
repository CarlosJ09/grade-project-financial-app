import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import Checkbox from 'expo-checkbox';
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {

    const [errors, setErrors] = useState<{
        cedula: string;
        password: string;
    }>({
        cedula: '',
        password: '',
    });

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-600">
            <View className="flex-1 justify-center p-8">

                <View className="w-full gap-8 mb-8">
                    <TextInput label="Cédula" placeholder="000-0000000-0" keyboardType="numeric" error={errors.cedula} />

                    <TextInput label="Contraseña" placeholder="*********" keyboardType="visible-password" error={errors.password} />

                    <View className="flex-row items-center gap-2">
                        <Checkbox />
                        <Text>Recordar Sesión</Text>
                    </View>
                </View>

                <Button title="Iniciar Sesión" onPress={() => { }} />

                <Link href="/app/(auth)/forgot-password" asChild>
                    <Text className="mt-4">Olvidé mi contraseña</Text>
                </Link>

                <View className="flex-row items-center justify-center gap-2 mt-16">
                    <Text>No tienes una cuenta?</Text>
                    <Link href="/app/(auth)/sign-up" asChild>
                        <Text>Registrate</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView >
    );
};

export default SignIn;