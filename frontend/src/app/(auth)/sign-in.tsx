import { CustomTextInput } from "@/components/ui/CustomTextInput";
import { Link } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
    return (
        <SafeAreaView className="flex-1 items-center justify-center">
            <Text className="text-2xl font-bold">SignIn</Text>

            <CustomTextInput label="Email" error="Error" />
            <CustomTextInput label="Password" error="Error" />

            <Button title="SignIn" onPress={() => { }} />

            <Link href="/app/(auth)/sign-up" asChild>
                <Text className="text-blue-500">SignUp</Text>
            </Link>
        </SafeAreaView>
    );
};

export default SignIn;