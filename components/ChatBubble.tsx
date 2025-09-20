import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  options?: Array<{ label: string; value: string; emoji?: string }>;
}

interface ChatBubbleProps {
  message: Message;
  onOptionSelect?: (value: string, label: string) => void;
  selectedAnswers?: string[];
  showContinueButton?: boolean;
  onContinue?: () => void;
}

export function ChatBubble({ 
  message, 
  onOptionSelect, 
  selectedAnswers = [],
  showContinueButton,
  onContinue 
}: ChatBubbleProps) {
  const isMultiSelect = message.options && message.options.length > 0 && selectedAnswers.length >= 0;

  return (
    <View style={[styles.container, message.isUser ? styles.userContainer : styles.botContainer]}>
      <View style={[styles.bubble, message.isUser ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.messageText, message.isUser ? styles.userText : styles.botText]}>
          {message.text}
        </Text>
      </View>
      
      {message.options && !message.isUser && (
        <View style={styles.optionsContainer}>
          {message.options.map((option) => {
            const isSelected = selectedAnswers.includes(option.value);
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  isSelected && styles.selectedOption
                ]}
                onPress={() => onOptionSelect?.(option.value, option.label)}
              >
                <Text style={styles.optionEmoji}>{option.emoji}</Text>
                <Text style={[
                  styles.optionText,
                  isSelected && styles.selectedOptionText
                ]}>
                  {option.label}
                </Text>
                {!isMultiSelect && (
                  <ChevronRight size={16} color={isSelected ? 'white' : '#81a8ae'} />
                )}
              </TouchableOpacity>
            );
          })}
          
          {showContinueButton && (
            <TouchableOpacity
              style={styles.continueButton}
              onPress={onContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
              <ChevronRight size={16} color="white" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  botContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#81a8ae',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Lora_400Regular',
  },
  userText: {
    color: 'white',
  },
  botText: {
    color: '#2D3748',
  },
  optionsContainer: {
    marginTop: 12,
    gap: 8,
    width: '100%',
  },
  optionButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedOption: {
    backgroundColor: '#81a8ae',
    borderColor: '#81a8ae',
  },
  optionEmoji: {
    fontSize: 20,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    fontFamily: 'Lora_400Regular',
  },
  selectedOptionText: {
    color: 'white',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#81a8ae',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Lora_600SemiBold',
  },
});