import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  View,
} from 'react-native';

interface TextInputProps extends RNTextInputProps {
  label: string;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export const TextInput = (props: TextInputProps) => {
  return (
    <View className={`gap-2 ${props.containerClassName}`}>
      <Text className={`text-sm font-medium ${props.labelClassName}`}>
        {props.label}
      </Text>

      <View
        className={`w-full rounded-xl border border-gray-200 p-2 ${props.inputClassName}`}
      >
        <RNTextInput {...props} />
      </View>

      {props.error && <Text>{props.error}</Text>}
    </View>
  );
};

export default TextInput;
