import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI financial assistant 🤖\n\nI can help you with:\n• Budgeting and saving tips\n• Investment advice\n• Understanding financial products\n• Analyzing your spending patterns\n\nWhat would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your question! I'm currently being developed to provide personalized financial advice. Soon I'll be able to help you with detailed financial planning and insights based on your data.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const quickQuestions = [
    'How can I start budgeting?',
    "What's a good savings rate?",
    'How do I build an emergency fund?',
    'Should I invest or pay off debt first?',
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="border-b border-gray-200 p-4 dark:border-gray-700">
          <ThemedText type="title" className="text-center">
            AI Financial Assistant
          </ThemedText>
          <Text className="mt-1 text-center text-sm text-gray-600 dark:text-gray-400">
            Get personalized financial guidance
          </Text>
        </View>

        {/* Welcome Message */}
        <ScrollView className="flex-1 p-4">
          <View className="mb-4 items-start">
            <View className="max-w-[90%] rounded-2xl rounded-bl-md bg-gray-100 p-4 dark:bg-gray-800">
              <Text className="mb-2 text-gray-900 dark:text-white">
                Hello! I&apos;m your AI financial assistant 🤖
              </Text>
              <Text className="text-sm text-gray-700 dark:text-gray-300">
                I can help you with budgeting, saving tips, investment advice,
                and analyzing your spending patterns.
              </Text>
            </View>
          </View>

          {/* Quick Questions */}
          <View className="mt-4">
            <Text className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              Quick questions to get started:
            </Text>
            <View className="gap-2">
              <TouchableOpacity className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                <Text className="text-sm text-gray-700 dark:text-gray-300">
                  How can I start budgeting?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                <Text className="text-sm text-gray-700 dark:text-gray-300">
                  What&apos;s a good savings rate?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                <Text className="text-sm text-gray-700 dark:text-gray-300">
                  How do I build an emergency fund?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Input */}
        <View className="mb-12 border-t border-gray-200 p-4 dark:border-gray-700">
          <View className="flex-row items-center gap-3">
            <TextInput
              className="flex-1 rounded-2xl bg-gray-100 p-3 text-gray-900 dark:bg-gray-800 dark:text-white"
              placeholder="Ask me anything about finances..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity className="rounded-full bg-blue-500 p-3">
              <Text className="text-lg text-white">➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
