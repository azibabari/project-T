import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Heart, Share, QrCode, ChevronRight, Copy } from 'lucide-react-native';
import { Platform } from 'react-native';

interface PairingFlowProps {
  onComplete: () => void;
  data: any;
  setData: (data: any) => void;
}

const relationshipTypes = [
  { label: 'Romantic Partner', value: 'romantic', emoji: '💕' },
  { label: 'Close Friend', value: 'friend', emoji: '👫' },
  { label: 'Family Member', value: 'family', emoji: '👨‍👩‍👧‍👦' },
  { label: 'Life Partner', value: 'life-partner', emoji: '💍' },
];

const partnerPreferences = [
  { label: 'They love surprises', value: 'surprises', emoji: '🎁' },
  { label: 'They prefer planned activities', value: 'planned', emoji: '📅' },
  { label: 'They enjoy deep conversations', value: 'deep-talks', emoji: '💭' },
  { label: 'They like simple gestures', value: 'simple', emoji: '🌸' },
];

const partnerPersonalities = [
  { label: 'Very thoughtful & reflective', value: 'thoughtful', emoji: '🤔' },
  { label: 'Energetic & spontaneous', value: 'energetic', emoji: '⚡' },
  { label: 'Calm & steady', value: 'calm', emoji: '🧘‍♂️' },
  { label: 'Creative & expressive', value: 'creative', emoji: '🎨' },
];

export function PairingFlow({ onComplete, data, setData }: PairingFlowProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteLink] = useState('https://tendlie.app/join/abc123');

  const questions = [
    {
      title: "What's your relationship with this person?",
      subtitle: "This helps us personalize the experience for both of you 💫",
      options: relationshipTypes,
      key: 'relationshipType',
    },
    {
      title: "What do you know about their preferences?",
      subtitle: "These insights will help us suggest better ways to connect 🎯",
      options: partnerPreferences,
      key: 'partnerPreferences',
    },
    {
      title: "How would you describe their personality?",
      subtitle: "This helps us tailor suggestions that resonate with them ✨",
      options: partnerPersonalities,
      key: 'partnerPersonality',
    },
  ];

  const handleAnswer = (value: string) => {
    const currentQ = questions[currentQuestion];
    setData({ ...data, [currentQ.key]: value });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowInvite(true);
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  if (showInvite) {
    return (
      <LinearGradient colors={['#F8F5FF', '#FFF0F5']} style={styles.container}>
        <ScrollView contentContainerStyle={styles.inviteContainer}>
          <View style={styles.inviteHeader}>
            <Share size={48} color="#81a8ae" />
            <Text style={styles.inviteTitle}>Perfect! Let's invite them 💝</Text>
            <Text style={styles.inviteSubtitle}>
              Share this link so they can join your Tendlie journey
            </Text>
          </View>

          {Platform.OS !== 'web' ? (
            <View style={styles.qrContainer}>
              <View style={styles.qrPlaceholder}>
                <QrCode size={48} color="#81a8ae" />
                <Text style={styles.qrText}>QR Code</Text>
                <Text style={styles.qrSubtext}>Available on mobile app</Text>
              </View>
            </View>
          ) : (
            <View style={styles.qrContainer}>
              <View style={styles.qrPlaceholder}>
                <QrCode size={48} color="#81a8ae" />
                <Text style={styles.qrText}>QR Code</Text>
                <Text style={styles.qrSubtext}>Available on mobile app</Text>
              </View>
            </View>
          )}

          <View style={styles.linkContainer}>
            <Text style={styles.linkLabel}>Share this link:</Text>
            <View style={styles.linkBox}>
              <Text style={styles.linkText}>{inviteLink}</Text>
              <TouchableOpacity style={styles.copyButton}>
                <Copy size={16} color="#81a8ae" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.shareButton}>
            <LinearGradient
              colors={['#dc8484', '#89CFF0', '#81a8ae']}
              style={styles.buttonGradient}
            >
              <Share size={20} color="white" />
              <Text style={styles.shareButtonText}>Share Invitation</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.continueButton} onPress={handleComplete}>
            <Text style={styles.continueButtonText}>Continue Without Sharing</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <LinearGradient colors={['#F8F5FF', '#E6F3FF', '#FFF0F5']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.questionContainer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressDots}>
            {questions.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index <= currentQuestion && styles.activeDot
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.questionHeader}>
          <Users size={32} color="#D7B9D5" />
          <Text style={styles.questionTitle}>{currentQ.title}</Text>
          <Text style={styles.questionSubtitle}>{currentQ.subtitle}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQ.options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.optionCard}
              onPress={() => handleAnswer(option.value)}
            >
              <Text style={styles.optionEmoji}>{option.emoji}</Text>
              <Text style={styles.optionLabel}>{option.label}</Text>
              <ChevronRight size={20} color="#81a8ae" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
  },
  activeDot: {
    backgroundColor: '#A3C9A8',
  },
  questionHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Lora_700Bold',
  },
  questionSubtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Lora_400Regular',
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F7FAFC',
  },
  optionEmoji: {
    fontSize: 24,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    fontFamily: 'Lora_400Regular',
  },
  inviteContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  inviteHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  inviteTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Lora_700Bold',
  },
  inviteSubtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Lora_400Regular',
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
  },
  qrText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginTop: 12,
    fontFamily: 'Lora_600SemiBold',
  },
  qrSubtext: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
    fontFamily: 'Lora_400Regular',
  },
  linkContainer: {
    width: '100%',
    marginBottom: 24,
  },
  linkLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
    fontFamily: 'Lora_400Regular',
  },
  linkBox: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    color: '#4A5568',
    fontFamily: 'Lora_400Regular',
  },
  copyButton: {
    padding: 4,
  },
  shareButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  shareButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Lora_600SemiBold',
  },
  continueButton: {
    paddingVertical: 16,
  },
  continueButtonText: {
    fontSize: 16,
    color: '#81a8ae',
    textAlign: 'center',
    fontFamily: 'Lora_400Regular',
  },
});