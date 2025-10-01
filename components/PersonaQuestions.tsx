import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Check, ChevronRight } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { OnboardingProgress } from './OnboardingProgress';

interface PersonaQuestion {
  id: string;
  question: string;
  description?: string;
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
}

const personalWellnessQuestions: PersonaQuestion[] = [
  {
    id: "emotional-needs",
    question: "What emotional support do you need most?",
    options: [
      { value: "reflection", label: "Self-reflection guidance", description: "Help in understanding my emotions" },
      { value: "coping", label: "Coping strategies", description: "Tools to handle stress and anxiety" },
      { value: "growth", label: "Personal growth", description: "Support in achieving personal goals" },
      { value: "mindfulness", label: "Mindfulness practices", description: "Living in the present moment" },
    ]
  },
  {
    id: "self-care",
    question: "How do you prefer to practice self-care?",
    options: [
      { value: "active", label: "Active self-care", description: "Exercise, outdoor activities" },
      { value: "creative", label: "Creative expression", description: "Art, music, writing" },
      { value: "meditative", label: "Meditative practices", description: "Meditation, yoga, breathing" },
      { value: "social", label: "Social connection", description: "Time with friends, community" },
    ]
  }
];

const romanticConnectionQuestions: PersonaQuestion[] = [
  {
    id: "communication-style",
    question: "What's your preferred way of expressing love?",
    options: [
      { value: "words", label: "Words of affirmation", description: "Verbal expressions of love" },
      { value: "actions", label: "Acts of service", description: "Showing love through actions" },
      { value: "touch", label: "Physical touch", description: "Physical expressions of affection" },
      { value: "time", label: "Quality time", description: "Dedicated attention and presence" },
    ]
  },
  {
    id: "relationship-goals",
    question: "What are your relationship priorities?",
    options: [
      { value: "growth", label: "Growing together", description: "Learning and evolving as a couple" },
      { value: "stability", label: "Building stability", description: "Creating a secure foundation" },
      { value: "adventure", label: "Shared adventures", description: "Exploring life together" },
      { value: "harmony", label: "Emotional harmony", description: "Deep emotional connection" },
    ]
  }
];

const familyBondingQuestions: PersonaQuestion[] = [
  {
    id: "family-dynamics",
    question: "What aspect of family relationships do you want to strengthen?",
    options: [
      { value: "communication", label: "Open communication", description: "Better family discussions" },
      { value: "traditions", label: "Family traditions", description: "Creating lasting memories" },
      { value: "support", label: "Mutual support", description: "Being there for each other" },
      { value: "understanding", label: "Understanding", description: "Bridging generational gaps" },
    ]
  },
  {
    id: "family-time",
    question: "How do you prefer to spend family time?",
    options: [
      { value: "activities", label: "Shared activities", description: "Games, sports, hobbies" },
      { value: "meals", label: "Family meals", description: "Cooking and eating together" },
      { value: "conversations", label: "Deep conversations", description: "Meaningful discussions" },
      { value: "celebrations", label: "Family celebrations", description: "Special occasions" },
    ]
  }
];

const friendshipQuestions: PersonaQuestion[] = [
  {
    id: "friendship-style",
    question: "What kind of friend are you?",
    options: [
      { value: "listener", label: "The listener", description: "Supporting through listening" },
      { value: "organizer", label: "The organizer", description: "Planning get-togethers" },
      { value: "motivator", label: "The motivator", description: "Encouraging growth" },
      { value: "nurturer", label: "The nurturer", description: "Caring and supporting" },
    ]
  },
  {
    id: "friendship-needs",
    question: "What do you value most in friendships?",
    options: [
      { value: "trust", label: "Trust & loyalty", description: "Reliable, honest connections" },
      { value: "fun", label: "Fun & laughter", description: "Enjoying time together" },
      { value: "growth", label: "Personal growth", description: "Supporting each other's goals" },
      { value: "understanding", label: "Deep understanding", description: "Emotional connection" },
    ]
  }
];

const questionsByPersona = {
  "personal-wellness": personalWellnessQuestions,
  "romantic-connection": romanticConnectionQuestions,
  "family-bonding": familyBondingQuestions,
  "friendship-nurturing": friendshipQuestions,
};

interface PersonaQuestionsProps {
  personaId: string;
  onComplete: (answers: Record<string, string>) => void;
  onBack?: () => void;
}

export function PersonaQuestions({ personaId, onComplete, onBack }: PersonaQuestionsProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = questionsByPersona[personaId as keyof typeof questionsByPersona] || [];

  // Animation values
  const questionOpacity = useSharedValue(1);
  const questionTranslateY = useSharedValue(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    // Animate question entrance
    questionOpacity.value = withTiming(1, { duration: 400 });
    questionTranslateY.value = withSpring(0, { damping: 15, stiffness: 150 });
  }, [currentQuestionIndex]);

  const handleOptionSelect = (value: string) => {
    const questionId = currentQuestion.id;

    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));

    // Animate question exit and move to next
    questionOpacity.value = withTiming(0, { duration: 300 });
    questionTranslateY.value = withTiming(-50, { duration: 300 });

    // Use setTimeout to handle the next action after animation
    setTimeout(() => {
      if (isLastQuestion) {
        // Complete the questionnaire
        onComplete({ ...answers, [questionId]: value });
      } else {
        // Move to next question
        setCurrentQuestionIndex(prev => prev + 1);
        questionTranslateY.value = 50;
        questionOpacity.value = 0;
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      // Go back to previous question
      questionOpacity.value = withTiming(0, { duration: 200 });
      questionTranslateY.value = withTiming(50, { duration: 200 });

      // Use setTimeout to handle the next action after animation
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
        questionTranslateY.value = -50;
        questionOpacity.value = 0;
      }, 200);
    } else if (onBack) {
      // Go back to persona selection
      onBack();
    }
  };

  // Animated styles
  const questionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: questionOpacity.value,
    transform: [{ translateY: questionTranslateY.value }],
  }));

  if (!currentQuestion) return null;

  // Calculate progress for the progress bar (start from 0 on first question)
  const progressValue = currentQuestionIndex / questions.length;

  return (
    <LinearGradient colors={["#F8F5FF", "#E6F3FF", "#FFF0F5"]} style={styles.container}>
      {/* Back Button at the very top */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <ArrowLeft size={24} color="#718096" />
      </TouchableOpacity>

      {/* Progress Bar positioned below back button */}
      <View style={styles.progressWrapper}>
        <OnboardingProgress progress={progressValue} />
      </View>

      {/* Question Content */}
      <Animated.View style={[styles.questionContent, questionAnimatedStyle]}>
        <View style={styles.questionHeader}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionCard,
                {
                  transform: [{
                    scale: answers[currentQuestion.id] === option.value ? 0.98 : 1
                  }]
                }
              ]}
              onPress={() => handleOptionSelect(option.value)}
              activeOpacity={0.7}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionLeft}>
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionLabel}>{option.label}</Text>
                    {option.description && (
                      <Text style={styles.optionDescription}>{option.description}</Text>
                    )}
                  </View>
                </View>
                <ChevronRight size={16} color="#CBD5E0" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Completion Message */}
      {isLastQuestion && (
        <View style={styles.completionHint}>
          <Check size={16} color="#81a8ae" />
          <Text style={styles.completionText}>
            Choose your answer to complete your profile
          </Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0, // Remove top padding to start from very top
  },
  backButton: {
    position: "absolute",
    top: 50, // Position at the very top (below status bar)
    left: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 10,
  },
  progressWrapper: {
    marginTop: 80, // Move progress bar down
  },
  questionContent: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
    marginTop: -20, // Move questions up to close gap with progress bar
  },
  questionHeader: {
    marginBottom: 32, // Reduced space between question and options
  },
  question: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2D3748",
    lineHeight: 40,
    fontFamily: "Lora_700Bold",
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 2,
    fontFamily: "Lora_600SemiBold",
  },
  optionDescription: {
    fontSize: 14,
    color: "#718096",
    fontFamily: "Lora_400Regular",
    lineHeight: 20,
  },
  completionHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingBottom: 40,
    gap: 8,
  },
  completionText: {
    fontSize: 16,
    color: "#81a8ae",
    fontFamily: "Lora_400Regular",
  },
});
