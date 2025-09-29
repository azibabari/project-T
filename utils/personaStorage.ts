import AsyncStorage from '@react-native-async-storage/async-storage';

const PERSONA_KEY = 'tendlie_selected_persona';
const PERSONA_ANSWERS_KEY = 'tendlie_persona_answers';

export class PersonaStorage {
  static async getSelectedPersona(): Promise<string | null> {
    try {
      const persona = await AsyncStorage.getItem(PERSONA_KEY);
      return persona;
    } catch (error) {
      console.error('Failed to get selected persona:', error);
      return null;
    }
  }

  static async saveSelectedPersona(persona: string): Promise<void> {
    try {
      await AsyncStorage.setItem(PERSONA_KEY, persona);
    } catch (error) {
      console.error('Failed to save selected persona:', error);
      throw new Error('Unable to save your persona selection. Please try again.');
    }
  }

  static async savePersonaAnswers(persona: string, answers: Record<string, string>): Promise<void> {
    try {
      const answersJson = JSON.stringify({
        persona,
        answers,
        timestamp: new Date().toISOString(),
      });
      await AsyncStorage.setItem(PERSONA_ANSWERS_KEY, answersJson);
    } catch (error) {
      console.error('Failed to save persona answers:', error);
      throw new Error('Unable to save your responses. Please try again.');
    }
  }

  static async getPersonaAnswers(): Promise<{ persona: string; answers: Record<string, string>; timestamp: string; } | null> {
    try {
      const answersJson = await AsyncStorage.getItem(PERSONA_ANSWERS_KEY);
      return answersJson ? JSON.parse(answersJson) : null;
    } catch (error) {
      console.error('Failed to get persona answers:', error);
      return null;
    }
  }
}
