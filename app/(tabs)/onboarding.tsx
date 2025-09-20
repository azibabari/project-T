import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ChevronRight, ArrowLeft, Check } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withDelay,
  FadeInUp,
  FadeOutUp
} from 'react-native-reanimated';

interface Question {
  id: string;
  type: 'single-choice' | 'multiple-choice' | 'text' | 'welcome' | 'completion';
  title: string;
  subtitle?: string;
  options?: Array<{ label: string; value: string; emoji?: string }>;
  placeholder?: string;
  required?: boolean;
}

const questions: Question[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: 'Welcome to Tendlie! 👋',
    subtitle: 'Let\'s create your personalized journey for deeper connections. This will take about 3 minutes.',
  },
  {
    id: 'culture',
    type: 'single-choice',
    title: 'What\'s your cultural background?',
    subtitle: 'This helps us personalize your experience with relevant wisdom and traditions.',
    options: [
      { label: 'Nigeria', value: 'nigeria', emoji: '🇳🇬' },
      { label: 'United Kingdom', value: 'uk', emoji: '🇬🇧' },
      { label: 'United States', value: 'us', emoji: '🇺🇸' },
      { label: 'India', value: 'india', emoji: '🇮🇳' },
      { label: 'Ghana', value: 'ghana', emoji: '🇬🇭' },
      { label: 'Other', value: 'other', emoji: '🌍' },
    ],
    required: true,
  },
  {
    id: 'personality',
    type: 'single-choice',
    title: 'How would you describe your social energy?',
    subtitle: 'There\'s no right or wrong answer - we\'re just getting to know you better.',
    options: [
      { label: 'I recharge with quiet time alone', value: 'introverted', emoji: '🤗' },
      { label: 'I\'m a mix of both', value: 'balanced', emoji: '⚖️' },
      { label: 'I get energy from being around people', value: 'outgoing', emoji: '✨' },
    ],
    required: true,
  },
  {
    id: 'emotional-needs',
    type: 'multiple-choice',
    title: 'What makes you feel most loved?',
    subtitle: 'Select all that resonate with you. These are your love languages.',
    options: [
      { label: 'Hearing "I love you" and words of encouragement', value: 'words', emoji: '💬' },
      { label: 'Spending uninterrupted time together', value: 'time', emoji: '⏰' },
      { label: 'Hugs, kisses, and physical closeness', value: 'touch', emoji: '🤝' },
      { label: 'When someone does something helpful for me', value: 'service', emoji: '🎁' },
      { label: 'Thoughtful gifts and surprises', value: 'gifts', emoji: '💝' },
    ],
    required: true,
  },
  {
    id: 'self-care',
    type: 'single-choice',
    title: 'How do you like to recharge and care for yourself?',
    subtitle: 'Understanding your self-care style helps us suggest better ways to nurture your relationships.',
    options: [
      { label: 'Quiet reflection, meditation, or journaling', value: 'quiet', emoji: '🧘‍♀️' },
      { label: 'Music, art, or creative expression', value: 'creative', emoji: '🎵' },
      { label: 'Exercise, sports, or physical activity', value: 'active', emoji: '🏃‍♀️' },
      { label: 'Socializing and connecting with others', value: 'social', emoji: '👥' },
    ],
    required: true,
  },
  {
    id: 'lifestyle',
    type: 'single-choice',
    title: 'What\'s your daily rhythm like?',
    subtitle: 'This helps us suggest relationship activities that fit your lifestyle.',
    options: [
      { label: 'Very busy - I\'m always on the go', value: 'busy', emoji: '⚡' },
      { label: 'Moderate pace - balanced work and personal time', value: 'moderate', emoji: '🌸' },
      { label: 'Relaxed and peaceful - I prefer slower rhythms', value: 'relaxed', emoji: '🌿' },
    ],
    required: true,
  },
  {
    id: 'relationship-focus',
    type: 'single-choice',
    title: 'What relationship would you like to focus on?',
    subtitle: 'We can help you nurture any meaningful connection in your life.',
    options: [
      { label: 'My romantic partner', value: 'romantic', emoji: '💕' },
      { label: 'A close friend', value: 'friend', emoji: '👫' },
      { label: 'Family relationships', value: 'family', emoji: '👨‍👩‍👧‍👦' },
      { label: 'Personal growth and self-care', value: 'personal', emoji: '🌱' },
    ],
    required: true,
  },
  {
    id: 'completion',
    type: 'completion',
    title: 'You\'re all set! ✨',
    subtitle: 'Your personalized Tendlie journey begins now. We\'ll help you build deeper, more meaningful connections.',
  },
];

const OnboardingScreen = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [textInput, setTextInput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = currentQuestionIndex / (questions.length - 1);

  const fadeOpacity = useSharedValue(1);

  const fadeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: fadeOpacity.value,
  }));

  const handleAnswer = (value: string | string[]) => {
    if (isAnimating) return;

    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    if (currentQuestion.type !== 'multiple-choice') {
      setTimeout(() => moveToNext(), 300);
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      handleAnswer(textInput.trim());
      setTextInput('');
    }
  };

  const moveToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsAnimating(true);
      fadeOpacity.value = withTiming(0, { duration: 200 }, () => {
        setCurrentQuestionIndex(prev => prev + 1);
        fadeOpacity.value = withTiming(1, { duration: 300 });
        setIsAnimating(false);
      });
    }
  };

  const moveToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsAnimating(true);
      fadeOpacity.value = withTiming(0, { duration: 200 }, () => {
        setCurrentQuestionIndex(prev => prev - 1);
        fadeOpacity.value = withTiming(1, { duration: 300 });
        setIsAnimating(false);
      });
    }
  };

  const handleMultipleChoiceContinue = () => {
    const selectedAnswers = answers[currentQuestion.id] as string[] || [];
    if (selectedAnswers.length > 0) {
      moveToNext();
    }
  };

  const toggleMultipleChoice = (value: string) => {
    const currentAnswers = (answers[currentQuestion.id] as string[]) || [];
    const newAnswers = currentAnswers.includes(value)
      ? currentAnswers.filter(v => v !== value)
      : [...currentAnswers, value];
    
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: newAnswers }));
  };

  const renderWelcome = () => (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>{currentQuestion.title}</Text>
      <Text style={styles.welcomeSubtitle}>{currentQuestion.subtitle}</Text>
      
      <TouchableOpacity style={styles.startButton} onPress={moveToNext}>
        <Text style={styles.startButtonText}>Let's get started</Text>
        <ChevronRight size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  const renderCompletion = () => (
    <View style={styles.completionContainer}>
      <Text style={styles.completionTitle}>{currentQuestion.title}</Text>
      <Text style={styles.completionSubtitle}>{currentQuestion.subtitle}</Text>
      
      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>💡 Your first insight:</Text>
        <Text style={styles.insightText}>
          {answers.culture === 'nigeria' 
            ? "As the Yoruba say: 'Eniyan ni aṣọ mi' - People are my clothing. Start your week by checking in with someone you care about."
            : "Small gestures of care create the strongest bonds. Consider sending a thoughtful message to someone important to you today."
          }
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.completeButton} 
        onPress={() => router.replace('/(tabs)')}
      >
        <Text style={styles.completeButtonText}>Enter Tendlie</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSingleChoice = () => (
    <View style={styles.questionContainer}>
      <View style={styles.questionHeader}>
        <Text style={styles.questionNumber}>
          {currentQuestionIndex} of {questions.length - 2}
        </Text>
        <Text style={styles.questionTitle}>{currentQuestion.title}</Text>
        {currentQuestion.subtitle && (
          <Text style={styles.questionSubtitle}>{currentQuestion.subtitle}</Text>
        )}
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options?.map((option, index) => {
          const isSelected = answers[currentQuestion.id] === option.value;
          return (
            <Animated.View
              key={option.value}
              entering={FadeInUp.delay(index * 100)}
            >
              <TouchableOpacity
                style={[styles.optionButton, isSelected && styles.selectedOption]}
                onPress={() => handleAnswer(option.value)}
              >
                <Text style={styles.optionEmoji}>{option.emoji}</Text>
                <Text style={[
                  styles.optionText,
                  isSelected && styles.selectedOptionText
                ]}>
                  {option.label}
                </Text>
                {isSelected && <Check size={20} color="white" />}
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );

  const renderMultipleChoice = () => {
    const selectedAnswers = (answers[currentQuestion.id] as string[]) || [];
    
    return (
      <View style={styles.questionContainer}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionNumber}>
            {currentQuestionIndex} of {questions.length - 2}
          </Text>
          <Text style={styles.questionTitle}>{currentQuestion.title}</Text>
          {currentQuestion.subtitle && (
            <Text style={styles.questionSubtitle}>{currentQuestion.subtitle}</Text>
          )}
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options?.map((option, index) => {
            const isSelected = selectedAnswers.includes(option.value);
            return (
              <Animated.View
                key={option.value}
                entering={FadeInUp.delay(index * 100)}
              >
                <TouchableOpacity
                  style={[styles.optionButton, isSelected && styles.selectedOption]}
                  onPress={() => toggleMultipleChoice(option.value)}
                >
                  <Text style={styles.optionEmoji}>{option.emoji}</Text>
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.selectedOptionText
                  ]}>
                    {option.label}
                  </Text>
                  {isSelected && <Check size={20} color="white" />}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {selectedAnswers.length > 0 && (
          <Animated.View entering={FadeInUp.delay(300)}>
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={handleMultipleChoiceContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
              <ChevronRight size={20} color="white" />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    );
  };

  const renderContent = () => {
    switch (currentQuestion.type) {
      case 'welcome':
        return renderWelcome();
      case 'completion':
        return renderCompletion();
      case 'single-choice':
        return renderSingleChoice();
      case 'multiple-choice':
        return renderMultipleChoice();
      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={['#F8F5FF', '#E6F3FF', '#FFF0F5']} style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Progress Bar */}
        {currentQuestion.type !== 'welcome' && currentQuestion.type !== 'completion' && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
          </View>
        )}

        {/* Back Button */}
        {currentQuestionIndex > 0 && currentQuestion.type !== 'completion' && (
          <TouchableOpacity style={styles.backButton} onPress={moveToPrevious}>
            <ArrowLeft size={24} color="#718096" />
          </TouchableOpacity>
        )}

        {/* Content */}
        <Animated.View style={[styles.contentContainer, fadeAnimatedStyle]}>
          {renderContent()}
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#81a8ae',
    borderRadius: 2,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Lora_700Bold',
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 48,
    fontFamily: 'Lora_400Regular',
  },
  startButton: {
    backgroundColor: '#81a8ae',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Lora_600SemiBold',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  questionHeader: {
    marginBottom: 40,
  },
  questionNumber: {
    fontSize: 14,
    color: '#A0AEC0',
    marginBottom: 8,
    fontFamily: 'Lora_400Regular',
  },
  questionTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2D3748',
    lineHeight: 40,
    marginBottom: 12,
    fontFamily: 'Lora_700Bold',
  },
  questionSubtitle: {
    fontSize: 18,
    color: '#718096',
    lineHeight: 26,
    fontFamily: 'Lora_400Regular',
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedOption: {
    backgroundColor: '#81a8ae',
    borderColor: '#81a8ae',
  },
  optionEmoji: {
    fontSize: 24,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    color: '#2D3748',
    fontFamily: 'Lora_400Regular',
  },
  selectedOptionText: {
    color: 'white',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#81a8ae',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginTop: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  continueButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Lora_600SemiBold',
  },
  hintContainer: {
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
  },
  hintText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    fontFamily: 'Lora_400Regular',
  },
  completionContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  completionTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Lora_700Bold',
  },
  completionSubtitle: {
    fontSize: 18,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
    fontFamily: 'Lora_400Regular',
  },
  insightCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
    fontFamily: 'Lora_600SemiBold',
  },
  insightText: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
    fontFamily: 'Lora_400Regular',
  },
  completeButton: {
    backgroundColor: '#81a8ae',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Lora_600SemiBold',
  },
});

export default OnboardingScreen;