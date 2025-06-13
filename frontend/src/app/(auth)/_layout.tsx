import { Stack } from "expo-router";

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerTitle: "Registro" }} />
            <Stack.Screen name="forgot-password" options={{ headerTitle: "Recuperar contraseña" }} />
        </Stack>
    );
};

export default AuthLayout;
