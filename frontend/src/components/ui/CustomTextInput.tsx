import { Text, TextInput, TextInputProps, View } from "react-native";

interface CustomTextInputProps extends TextInputProps {
    label: string;
    error?: string;
}

export const CustomTextInput = (props: CustomTextInputProps) => {
    return (
        <View>
            <Text>{props.label}</Text>
            <TextInput {...props} />
            {props.error && <Text>{props.error}</Text>}
        </View>
    );
};

export default CustomTextInput;