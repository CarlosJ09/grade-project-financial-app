import { Pressable, PressableProps, Text, useColorScheme } from "react-native";

interface ButtonProps extends Omit<PressableProps, 'children'> {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    containerClassName?: string;
    textClassName?: string;
}

export const Button = ({
    title,
    variant = 'primary',
    size = 'medium',
    containerClassName,
    textClassName,
    disabled,
    ...props
}: ButtonProps) => {
    const colorScheme = useColorScheme() ?? 'light';

    const baseContainerClass = "items-center justify-center rounded-xl";
    const baseTextClass = "font-semibold";

    const variantStyles = {
        primary: {
            container: "bg-gray-800 active:bg-gray-900",
            text: "text-white"
        },
        secondary: {
            container: "bg-gray-500 active:bg-gray-600",
            text: "text-white"
        },
        outline: {
            container: "border-2 border-blue-500 bg-transparent active:bg-blue-50",
            text: "text-blue-500"
        }
    };

    const sizeStyles = {
        small: {
            container: "px-4 py-2",
            text: "text-sm"
        },
        medium: {
            container: "px-6 py-3",
            text: "text-base"
        },
        large: {
            container: "px-8 py-4",
            text: "text-lg"
        }
    };

    const disabledStyles = disabled ? "opacity-50" : "";

    const containerClasses = `
        ${baseContainerClass}
        ${variantStyles[variant].container}
        ${sizeStyles[size].container}
        ${disabledStyles}
        ${containerClassName || ''}
    `.trim();

    const textClasses = `
        ${baseTextClass}
        ${variantStyles[variant].text}
        ${sizeStyles[size].text}
        ${textClassName || ''}
    `.trim();

    return (
        <Pressable
            className={containerClasses}
            disabled={disabled}
            {...props}
        >
            <Text className={textClasses}>
                {title}
            </Text>
        </Pressable>
    );
};

export default Button;