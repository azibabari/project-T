import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export interface OnboardingData {
  culture?: string;
  personality?: string;
  emotionalNeeds?: string[];
  selfCare?: string;
  lifestyle?: string;
  wantsPairing?: boolean;
  relationshipType?: string;
  partnerPreferences?: string;
  partnerPersonality?: string;
  culturalTraditions?: string[];
  email?: string;
  completedAt?: string;
}

const ONBOARDING_KEY = 'tendlie_onboarding_data';
const ENCRYPTION_KEY = 'tendlie_encryption_key';

export class OnboardingStorage {
  static async saveData(data: OnboardingData): Promise<void> {
    try {
      const jsonData = JSON.stringify({
        ...data,
        completedAt: new Date().toISOString(),
      });
      
      // Save encrypted version for sensitive data
      await SecureStore.setItemAsync(ONBOARDING_KEY, jsonData);
      
      // Also save basic info to AsyncStorage for quick access
      const basicInfo = {
        hasCompletedOnboarding: true,
        culture: data.culture,
        completedAt: data.completedAt,
      };
      await AsyncStorage.setItem('tendlie_basic_info', JSON.stringify(basicInfo));
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
      throw new Error('Unable to save your preferences. Please try again.');
    }
  }

  static async loadData(): Promise<OnboardingData | null> {
    try {
      const data = await SecureStore.getItemAsync(ONBOARDING_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load onboarding data:', error);
      return null;
    }
  }

  static async hasCompletedOnboarding(): Promise<boolean> {
    try {
      const basicInfo = await AsyncStorage.getItem('tendlie_basic_info');
      if (basicInfo) {
        const parsed = JSON.parse(basicInfo);
        return parsed.hasCompletedOnboarding === true;
      }
      return false;
    } catch (error) {
      console.error('Failed to check onboarding status:', error);
      return false;
    }
  }

  static async clearData(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(ONBOARDING_KEY);
      await AsyncStorage.removeItem('tendlie_basic_info');
    } catch (error) {
      console.error('Failed to clear onboarding data:', error);
    }
  }

  static async updatePartialData(updates: Partial<OnboardingData>): Promise<void> {
    try {
      const existingData = await this.loadData();
      const mergedData = { ...existingData, ...updates };
      await this.saveData(mergedData);
    } catch (error) {
      console.error('Failed to update onboarding data:', error);
      throw new Error('Unable to update your preferences. Please try again.');
    }
  }
}