import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Heart, Users, Chrome as Home, Sparkles } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withDelay,
  useAnimatedProps
} from 'react-native-reanimated';
import { OnboardingProgress } from '@/components/OnboardingProgress';

interface PersonaCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string[];
}

const personas: PersonaCard[] = [
  {
    id: 'personal-wellness',
    title: 'Personal Wellness',
    description: 'Nurture your emotional well-being.',
    icon: <Sparkles size={24} color="#D7B9D5" />,
    gradient: [],
  },
  {
    id: 'romantic-connection',
    title: 'Romantic Connection',
    description: 'Deepen your bond with your partner.',
    icon: <Heart size={24} color="#dc8484" />,
    gradient: [],
  },
  {
    id: 'family-bonding',
    title: 'Family Bonding',
    description: 'Strengthen ties with family.',
    icon: <Users size={24} color="#81a8ae" />,
    gradient: [],
  },
  {
    id: 'friendship-nurturing',
    title: 'Friendship Nurturing',
    description: 'Care for your close friends.',
    icon: <Heart size={24} color="#89CFF0" />,
    gradient: [],
  },
];

export default function PersonaSelectionScreen() {
  const router = useRouter();
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId);
    setTimeout(() => {
      router.push('/(tabs)/onboarding');
    }, 500);
  };


  return (
    <LinearGradient
      colors={['#F8F5FF', '#E6F3FF', '#FFF0F5']}
      style={styles.container}
    >
      <OnboardingProgress progress={0.1} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>What Do You Want to Use{'\n'}Tendlie For?</Text>
          <Text style={styles.subtitle}>
            Choose your path to start your personalized journey
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          {personas.map((persona) => (
            <TouchableOpacity
              key={persona.id}
              style={[
                styles.personaCard,
                selectedPersona === persona.id && styles.selectedCard
              ]}
              onPress={() => handlePersonaSelect(persona.id)}
            >
              <View style={styles.iconContainer}>
                {persona.icon}
              </View>
              <Text style={styles.cardTitle}>{persona.title}</Text>
              <Text style={styles.cardDescription}>{persona.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    paddingBottom: 32,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 16,
    fontFamily: 'Lora_700Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Lora_400Regular',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 8,
  },
  personaCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    minHeight: 140,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#81a8ae',
    backgroundColor: '#F0F8FF',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 6,
    textAlign: 'center',
    fontFamily: 'Lora_600SemiBold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'Lora_400Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Lora_700Bold',
  },
  loadingSubtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Lora_400Regular',
  },
});