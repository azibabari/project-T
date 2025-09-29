import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Heart, Users, UserCircle, Brain, ChevronRight } from "lucide-react-native";

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
}

export function PersonaQuestions({ personaId, onComplete }: PersonaQuestionsProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const questions = questionsByPersona[personaId as keyof typeof questionsByPersona] || [];

  const handleOptionSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const isComplete = questions.every(q => answers[q.id]);

  return (
    <LinearGradient colors={["#F8F5FF", "#E6F3FF", "#FFF0F5"]} style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {questions.map((question) => (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.question}>{question.question}</Text>
            {question.description && (
              <Text style={styles.questionDescription}>{question.description}</Text>
            )}
            <View style={styles.optionsContainer}>
              {question.options.map((option) => {
                const isSelected = answers[question.id] === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionCard,
                      isSelected && styles.selectedOption
                    ]}
                    onPress={() => handleOptionSelect(question.id, option.value)}
                  >
                    <Text style={[
                      styles.optionLabel,
                      isSelected && styles.selectedText
                    ]}>
                      {option.label}
                    </Text>
                    {option.description && (
                      <Text style={[
                        styles.optionDescription,
                        isSelected && styles.selectedText
                      ]}>
                        {option.description}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
        
        <TouchableOpacity
          style={[styles.continueButton, !isComplete && styles.disabledButton]}
          onPress={() => isComplete && onComplete(answers)}
          disabled={!isComplete}
        >
          <LinearGradient
            colors={isComplete ? ["#89CFF0", "#81a8ae", "#6d9499"] : ["#E2E8F0", "#CBD5E0"]}
            style={styles.buttonGradient}
          >
            <Text style={[
              styles.buttonText,
              !isComplete && styles.disabledButtonText
            ]}>
              Continue
            </Text>
            <ChevronRight size={20} color={isComplete ? "white" : "#A0AEC0"} />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  questionContainer: {
    marginBottom: 32,
  },
  question: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 8,
    fontFamily: "Lora_700Bold",
  },
  questionDescription: {
    fontSize: 16,
    color: "#718096",
    marginBottom: 16,
    fontFamily: "Lora_400Regular",
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedOption: {
    backgroundColor: "#81a8ae",
    borderColor: "#81a8ae",
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 4,
    fontFamily: "Lora_600SemiBold",
  },
  optionDescription: {
    fontSize: 14,
    color: "#718096",
    fontFamily: "Lora_400Regular",
  },
  selectedText: {
    color: "white",
  },
  continueButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    fontFamily: "Lora_600SemiBold",
  },
  disabledButtonText: {
    color: "#A0AEC0",
  },
});
