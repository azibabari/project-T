import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Globe, Heart, ChevronRight } from 'lucide-react-native';

interface CulturalQuestionsProps {
  culture?: string;
  onComplete: () => void;
}

const culturalTraditions = {
  nigeria: [
    { label: 'Yoruba Proverbs & Wisdom', value: 'yoruba-proverbs', description: 'Traditional sayings that guide relationships' },
    { label: 'Durbar Festival Celebrations', value: 'durbar-festival', description: 'Community gathering traditions' },
    { label: 'Extended Family Values', value: 'extended-family', description: 'Honoring family connections' },
    { label: 'Ubuntu Philosophy', value: 'ubuntu', description: 'I am because we are' },
  ],
  uk: [
    { label: 'Afternoon Tea Rituals', value: 'afternoon-tea', description: 'Taking time for conversation' },
    { label: 'Pub Culture', value: 'pub-culture', description: 'Community social spaces' },
    { label: 'Royal Traditions', value: 'royal-traditions', description: 'Ceremonial respect and courtesy' },
  ],
  us: [
    { label: 'Thanksgiving Gatherings', value: 'thanksgiving', description: 'Gratitude and family time' },
    { label: 'Regional Customs', value: 'regional', description: 'Local community traditions' },
    { label: 'Independence Celebrations', value: 'independence', description: 'Freedom and individual expression' },
  ],
};

export function CulturalQuestions({ culture, onComplete }: CulturalQuestionsProps) {
  const [selectedTraditions, setSelectedTraditions] = useState<string[]>([]);
  const traditions = culture ? culturalTraditions[culture as keyof typeof culturalTraditions] || [] : [];

  const handleTraditionSelect = (value: string) => {
    setSelectedTraditions(prev => 
      prev.includes(value) 
        ? prev.filter(t => t !== value)
        : [...prev, value]
    );
  };

  const getCulturalPrompt = () => {
    switch (culture) {
      case 'nigeria':
        return "I love connecting with Nigerian traditions! Which of these resonate with how you approach relationships? 🇳🇬";
      case 'uk':
        return "British culture has beautiful relationship traditions. Which feel meaningful to you? 🇬🇧";
      case 'us':
        return "American traditions vary beautifully across regions. What speaks to you? 🇺🇸";
      default:
        return "Let's explore traditions that might influence how you connect with others. 🌍";
    }
  };

  return (
    <LinearGradient colors={['#F8F5FF', '#E6F3FF', '#FFF0F5']} style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Globe size={32} color="#81a8ae" />
          <Text style={styles.title}>Cultural Connections</Text>
          <Text style={styles.subtitle}>{getCulturalPrompt()}</Text>
        </View>

        <View style={styles.traditionsContainer}>
          {traditions.map((tradition) => {
            const isSelected = selectedTraditions.includes(tradition.value);
            return (
              <TouchableOpacity
                key={tradition.value}
                style={[styles.traditionCard, isSelected && styles.selectedTradition]}
                onPress={() => handleTraditionSelect(tradition.value)}
              >
                <View style={styles.traditionHeader}>
                  <Text style={[
                    styles.traditionTitle,
                    isSelected && styles.selectedTraditionText
                  ]}>
                    {tradition.label}
                  </Text>
                  <View style={[
                    styles.checkbox,
                    isSelected && styles.checkedBox
                  ]}>
                    {isSelected && <Heart size={12} color="white" />}
                  </View>
                </View>
                <Text style={[
                  styles.traditionDescription,
                  isSelected && styles.selectedTraditionText
                ]}>
                  {tradition.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {culture === 'nigeria' && (
          <View style={styles.proverbContainer}>
            <Text style={styles.proverbTitle}>💫 Daily Wisdom</Text>
            <Text style={styles.proverb}>
              "Eniyan ni aṣọ mi" - People are my clothing.{'\n'}
              Your relationships are what make you beautiful.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.continueButton, selectedTraditions.length === 0 && styles.disabledButton]}
          onPress={onComplete}
          disabled={selectedTraditions.length === 0}
        >
          <LinearGradient
            colors={selectedTraditions.length > 0 ? ['#89CFF0', '#81a8ae', '#6d9499'] : ['#E2E8F0', '#CBD5E0']}
            style={styles.buttonGradient}
          >
            <Text style={[
              styles.buttonText,
              selectedTraditions.length === 0 && styles.disabledButtonText
            ]}>
              Continue Journey
            </Text>
            <ChevronRight 
              size={20} 
              color={selectedTraditions.length > 0 ? 'white' : '#A0AEC0'} 
            />
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
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Lora_700Bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: 'Lora_400Regular',
  },
  traditionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  traditionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedTradition: {
    backgroundColor: '#81a8ae',
    borderColor: '#81a8ae',
  },
  traditionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  traditionTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    fontFamily: 'Lora_600SemiBold',
  },
  selectedTraditionText: {
    color: 'white',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  traditionDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
    fontFamily: 'Lora_400Regular',
  },
  proverbContainer: {
    backgroundColor: 'rgba(212, 185, 213, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(212, 185, 213, 0.2)',
  },
  proverbTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
    fontFamily: 'Lora_600SemiBold',
  },
  proverb: {
    fontSize: 16,
    color: '#4A5568',
    fontStyle: 'italic',
    lineHeight: 24,
    fontFamily: 'Lora_400Regular',
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: '#000',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Lora_600SemiBold',
  },
  disabledButtonText: {
    color: '#A0AEC0',
  },
});