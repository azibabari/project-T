import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, Lock, Eye, ChevronRight, Check } from 'lucide-react-native';

interface PrivacySummaryProps {
  data: any;
  onComplete: () => void;
}

export function PrivacySummary({ data, onComplete }: PrivacySummaryProps) {
  const [hasReviewed, setHasReviewed] = useState(false);
  const [acceptsE2EE, setAcceptsE2EE] = useState(false);

  const privacyFeatures = [
    {
      icon: <Lock size={24} color="#81a8ae" />,
      title: 'End-to-End Encryption',
      description: 'Your personal data is encrypted on your device. We cannot read your private information.',
    },
    {
      icon: <Shield size={24} color="#D7B9D5" />,
      title: 'Local AI Processing',
      description: 'AI insights are generated on your device, keeping your thoughts private.',
    },
    {
      icon: <Eye size={24} color="#dc8484" />,
      title: 'Data Transparency',
      description: 'You can review, export, or delete your data anytime in settings.',
    },
  ];

  const getDataSummary = () => {
    const summary = [];
    if (data.culture) summary.push(`Culture: ${data.culture}`);
    if (data.personality) summary.push(`Personality: ${data.personality}`);
    if (data.emotionalNeeds) summary.push(`Love Languages: ${data.emotionalNeeds.join(', ')}`);
    if (data.selfCare) summary.push(`Self-Care: ${data.selfCare}`);
    if (data.lifestyle) summary.push(`Lifestyle: ${data.lifestyle}`);
    if (data.wantsPairing) summary.push('Relationship nurturing: Enabled');
    return summary;
  };

  const canContinue = hasReviewed && acceptsE2EE;

  return (
    <LinearGradient colors={['#F8F5FF', '#E6F3FF', '#FFF0F5']} style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Shield size={48} color="#81a8ae" />
          <Text style={styles.title}>Your Privacy Matters</Text>
          <Text style={styles.subtitle}>
            Review your data and confirm our privacy commitment
          </Text>
        </View>

        <View style={styles.dataReviewSection}>
          <Text style={styles.sectionTitle}>📋 Data You've Shared</Text>
          <View style={styles.dataCard}>
            {getDataSummary().map((item, index) => (
              <View key={index} style={styles.dataItem}>
                <Check size={16} color="#81a8ae" />
                <Text style={styles.dataText}>{item}</Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity
            style={styles.reviewToggle}
            onPress={() => setHasReviewed(!hasReviewed)}
          >
            <View style={[styles.checkbox, hasReviewed && styles.checkedBox]}>
              {hasReviewed && <Check size={16} color="white" />}
            </View>
            <Text style={styles.reviewText}>I've reviewed my data</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.privacySection}>
          <Text style={styles.sectionTitle}>🔒 Privacy Features</Text>
          {privacyFeatures.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              {feature.icon}
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
          
          <View style={styles.e2eeToggle}>
            <View style={styles.e2eeContent}>
              <Text style={styles.e2eeTitle}>Enable End-to-End Encryption</Text>
              <Text style={styles.e2eeDescription}>
                Keep your conversations and insights completely private
              </Text>
            </View>
            <Switch
              value={acceptsE2EE}
              onValueChange={setAcceptsE2EE}
              trackColor={{ false: '#E2E8F0', true: '#81a8ae' }}
              thumbColor={acceptsE2EE ? '#FFFFFF' : '#F1F5F9'}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.continueButton, !canContinue && styles.disabledButton]}
          onPress={handleComplete}
          disabled={!canContinue}
        >
          <LinearGradient
            colors={canContinue ? ['#89CFF0', '#81a8ae', '#6d9499'] : ['#E2E8F0', '#CBD5E0']}
            style={styles.buttonGradient}
          >
            <Text style={[
              styles.buttonText,
              !canContinue && styles.disabledButtonText
            ]}>
              Complete Setup
            </Text>
            <ChevronRight size={20} color={canContinue ? 'white' : '#A0AEC0'} />
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
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Lora_400Regular',
  },
  dataReviewSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
    fontFamily: 'Lora_600SemiBold',
  },
  dataCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  dataText: {
    fontSize: 14,
    color: '#4A5568',
    fontFamily: 'Lora_400Regular',
  },
  reviewToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    backgroundColor: '#81a8ae',
    borderColor: '#81a8ae',
  },
  reviewText: {
    fontSize: 16,
    color: '#2D3748',
    fontFamily: 'Lora_400Regular',
  },
  privacySection: {
    marginBottom: 32,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
    fontFamily: 'Lora_600SemiBold',
  },
  featureDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
    fontFamily: 'Lora_400Regular',
  },
  e2eeToggle: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  e2eeContent: {
    flex: 1,
  },
  e2eeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
    fontFamily: 'Lora_600SemiBold',
  },
  e2eeDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
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