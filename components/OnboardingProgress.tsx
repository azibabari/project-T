import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface OnboardingProgressProps {
  progress: number; // 0 to 1
}

export function OnboardingProgress({ progress }: OnboardingProgressProps) {
  return (
    <View style={styles.container}>
      <View style={styles.progressTrack}>
        <LinearGradient
          colors={['#89CFF0', '#81a8ae', '#D7B9D5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressFill, { width: `${progress * 100}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingTop: 60,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});