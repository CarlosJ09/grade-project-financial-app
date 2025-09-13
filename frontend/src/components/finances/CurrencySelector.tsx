import { Currency } from '@/types/financial/shared';
import { Text, TouchableOpacity, View } from 'react-native';

interface CurrencySelectorProps {
  currencies: Currency[];
  form: any;
  update: (key: string, value: any) => void;
}

export default function CurrencySelector({
  currencies,
  form,
  update,
}: CurrencySelectorProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Currency
      </Text>
      <View className="rounded-lg border border-gray-300 dark:border-gray-600">
        {currencies.map(currency => (
          <TouchableOpacity
            key={currency.id}
            className={`border-b border-gray-200 p-3 dark:border-gray-700 ${
              form.currencyId === currency.id
                ? 'bg-blue-50 dark:bg-blue-900/20'
                : ''
            }`}
            onPress={() => update('currencyId', currency.id)}
          >
            <Text
              className={`font-medium ${
                form.currencyId === currency.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {currency.code}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
