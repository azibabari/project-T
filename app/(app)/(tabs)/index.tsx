import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Heart, Sparkles } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#F8F5FF', '#E6F3FF', '#FFF0F5']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Heart size={32} color="#81a8ae" />
            <Text style={styles.logoText}>Tendlie</Text>
          </View>
          <Text style={styles.tagline}>Care thoughtfully with AI</Text>
        </View>

        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Nurture deeper emotional{'\n'}connections with AI guidance
          </Text>
          <Text style={styles.heroSubtitle}>
            Personalized insights for meaningful relationships,{'\n'}
            culturally adapted for your world
          </Text>
        </View>

        <View style={styles.featureCards}>
          <View style={styles.featureCard}>
            <Sparkles size={24} color="#D7B9D5" />
            <Text style={styles.featureTitle}>AI-Powered Insights</Text>
            <Text style={styles.featureText}>
              Get personalized relationship advice
            </Text>
          </View>
          
          <View style={styles.featureCard}>
            <Heart size={24} color="#F4C2C2" />
            <Text style={styles.featureTitle}>Cultural Awareness</Text>
            <Text style={styles.featureText}>
              Wisdom adapted to your heritage
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push('/onboarding')}
        >
          <LinearGradient
            colors={['#89CFF0', '#81a8ae', '#6d9499']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Begin Your Journey</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    paddingTop: 60,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    marginLeft: 8,
    fontFamily: 'Lora_700Bold',
  },
  tagline: {
    fontSize: 16,
    color: '#718096',
    fontFamily: 'Lora_400Regular',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2D3748',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 16,
    fontFamily: 'Lora_700Bold',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: 'Lora_400Regular',
  },
  featureCards: {
    gap: 16,
    marginBottom: 48,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginTop: 12,
    marginBottom: 8,
    fontFamily: 'Lora_600SemiBold',
  },
  featureText: {
    fontSize: 16,
    color: '#718096',
    lineHeight: 24,
    fontFamily: 'Lora_400Regular',
  },
  startButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Lora_600SemiBold',
  },
});