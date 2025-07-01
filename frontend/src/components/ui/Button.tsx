import { Pressable, PressableProps, Text, useColorScheme } from 'react-native';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'error';
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

  const baseContainerClass = 'items-center justify-center rounded-xl';
  const baseTextClass = 'font-poppins-medium';

  const variantStyles = {
    primary: {
      container: 'bg-primary active:opacity-90',
      text: 'text-white',
    },
    secondary: {
      container: 'bg-secondary active:opacity-90',
      text: 'text-white',
    },
    success: {
      container: 'bg-success active:opacity-90',
      text: 'text-text-primary',
    },
    error: {
      container: 'bg-error active:opacity-90',
      text: 'text-white',
    },
    outline: {
      container:
        'border-2 border-primary bg-transparent active:bg-success-light',
      text: 'text-primary',
    },
  };

  const sizeStyles = {
    small: {
      container: 'px-4 py-2',
      text: 'text-sm',
    },
    medium: {
      container: 'px-6 py-3',
      text: 'text-base',
    },
    large: {
      container: 'px-8 py-4',
      text: 'text-lg',
    },
  };

  const disabledStyles = disabled ? 'opacity-50' : '';

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
    <Pressable className={containerClasses} disabled={disabled} {...props}>
      <Text className={textClasses}>{title}</Text>
    </Pressable>
  );
};

export default Button;
