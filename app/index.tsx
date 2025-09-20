import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function IndexScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/persona-selection');
      } else {
        router.replace('/auth');
      }
    }
  }, [isAuthenticated, isLoading]);

  return (
    <LinearGradient colors={['#F8F5FF', '#E6F3FF', '#FFF0F5']} style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#89CFF0" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});