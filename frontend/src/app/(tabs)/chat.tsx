import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
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
import { agentChatService } from '@/services/agentChat';
import { useAuthStore } from '@/stores/authStore';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: string[];
  suggestions?: string[];
  thinking?: string; // AI's internal reasoning
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
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [expandedThinking, setExpandedThinking] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const { user } = useAuthStore();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Parse response to extract thinking tags
  const parseResponse = (text: string) => {
    const thinkRegex = /<think>([\s\S]*?)<\/think>/gi;
    const thinkMatches = text.match(thinkRegex);

    let thinking = '';
    let cleanText = text;

    if (thinkMatches) {
      // Extract all thinking content
      thinking = thinkMatches
        .map(match => match.replace(/<\/?think>/gi, '').trim())
        .join('\n\n');

      // Remove thinking tags from the main text
      cleanText = text.replace(thinkRegex, '').trim();
    }

    return { text: cleanText, thinking };
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await agentChatService.sendMessage({
        message: newMessage.text,
        session_id: sessionId,
        user_id: user?.id || 'guest',
        context: {}, // You can add user context here (balance, transactions, etc.)
      });

      // Store session ID for conversation continuity
      if (!sessionId) {
        setSessionId(response.session_id);
      }

      // Parse response to separate thinking from actual response
      const parsed = parseResponse(response.message);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: parsed.text,
        thinking: parsed.thinking || undefined,
        isUser: false,
        timestamp: new Date(),
        sources: response.sources,
        suggestions: response.suggestions,
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    'How can I start budgeting?',
    "What's a good savings rate?",
    'How do I build an emergency fund?',
  ];

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

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

        {/* Messages */}
        <ScrollView ref={scrollViewRef} className="flex-1 p-4">
          {messages.map(message => (
            <View
              key={message.id}
              className={`mb-4 ${message.isUser ? 'items-end' : 'items-start'}`}
            >
              <View
                className={`max-w-[85%] rounded-2xl p-4 ${
                  message.isUser
                    ? 'rounded-tr-md bg-blue-500'
                    : 'rounded-tl-md bg-gray-100 dark:bg-gray-800'
                }`}
              >
                <Text
                  className={`${
                    message.isUser
                      ? 'text-white'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {message.text}
                </Text>

                {/* AI Thinking Process (Collapsible) */}
                {message.thinking && !message.isUser && (
                  <View className="mt-3 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <TouchableOpacity
                      onPress={() =>
                        setExpandedThinking(
                          expandedThinking === message.id ? null : message.id
                        )
                      }
                      className="flex-row items-center justify-between"
                    >
                      <Text className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        💭 AI Reasoning Process
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {expandedThinking === message.id ? '▼' : '▶'}
                      </Text>
                    </TouchableOpacity>
                    {expandedThinking === message.id && (
                      <View className="mt-2 rounded-lg bg-gray-50 p-2 dark:bg-gray-700">
                        <Text className="text-xs italic text-gray-600 dark:text-gray-400">
                          {message.thinking}
                        </Text>
                      </View>
                    )}
                  </View>
                )}

                {/* Sources */}
                {message.sources && message.sources.length > 0 && (
                  <View className="mt-3 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <Text className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                      Sources:
                    </Text>
                    {message.sources.map((source, idx) => (
                      <Text
                        key={idx}
                        className="text-xs text-gray-700 dark:text-gray-300"
                      >
                        • {source}
                      </Text>
                    ))}
                  </View>
                )}

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <View className="mt-3 gap-2">
                    <Text className="text-xs text-gray-600 dark:text-gray-400">
                      Related topics:
                    </Text>
                    {message.suggestions.map((suggestion, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => handleQuickQuestion(suggestion)}
                        className="rounded-lg bg-gray-200 p-2 dark:bg-gray-700"
                      >
                        <Text className="text-xs text-gray-700 dark:text-gray-300">
                          {suggestion}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <View className="mb-4 items-start">
              <View className="max-w-[85%] rounded-2xl rounded-tl-md bg-gray-100 p-4 dark:bg-gray-800">
                <View className="flex-row items-center gap-2">
                  <ActivityIndicator size="small" color="#3B82F6" />
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    AI is thinking...
                  </Text>
                </View>
                <Text className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  This may take up to 30 seconds
                </Text>
              </View>
            </View>
          )}

          {/* Quick Questions - Show only if no messages sent yet */}
          {messages.length === 1 && (
            <View className="mt-4">
              <Text className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                Quick questions to get started:
              </Text>
              <View className="gap-2">
                {quickQuestions.map((question, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleQuickQuestion(question)}
                    className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800"
                  >
                    <Text className="text-sm text-gray-700 dark:text-gray-300">
                      {question}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
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
              onSubmitEditing={sendMessage}
              multiline
              editable={!isTyping}
            />
            <TouchableOpacity
              className="rounded-full bg-blue-500 p-3 disabled:opacity-50"
              onPress={sendMessage}
              disabled={isTyping || !inputText.trim()}
            >
              <Text className="text-lg text-white">➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
