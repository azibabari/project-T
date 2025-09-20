export interface OnboardingAnswer {
  questionId: string;
  value: string | string[];
  timestamp: Date;
}

export interface OnboardingProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
  answers: OnboardingAnswer[];
  startedAt: Date;
  lastUpdated: Date;
}

export interface CulturalPreference {
  culture: string;
  traditions: string[];
  language?: string;
  communicationStyle: 'direct' | 'indirect' | 'contextual';
}

export interface RelationshipProfile {
  type: 'romantic' | 'friend' | 'family' | 'life-partner';
  partnerPreferences?: string;
  partnerPersonality?: string;
  inviteCode?: string;
  isPaired: boolean;
  pairCode?: string;
}

export interface UserProfile {
  id: string;
  email?: string;
  personality: string;
  emotionalNeeds: string[];
  selfCareStyle: string;
  lifestyle: string;
  cultural: CulturalPreference;
  relationship?: RelationshipProfile;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OnboardingState {
  isLoading: boolean;
  currentStep: string;
  progress: number;
  data: Partial<UserProfile>;
  error?: string;
}