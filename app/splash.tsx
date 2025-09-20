import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withDelay,
  withRepeat,
  Easing
} from 'react-native-reanimated';

const SplashScreen = () => {
  const router = useRouter();
  
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);
  const heartPulse = useSharedValue(1);

  useEffect(() => {
    // Start animations
    logoScale.value = withSequence(
      withTiming(1.2, { duration: 800, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: 200 })
    );
    logoOpacity.value = withTiming(1, { duration: 800 });
    textOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
    taglineOpacity.value = withDelay(1200, withTiming(1, { duration: 800 }));
    
    // Heart pulse animation
    heartPulse.value = withDelay(
      1500,
      withRepeat(
        withSequence(
          withTiming(1.1, { duration: 800, easing: Easing.inOut(Easing.quad) }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.quad) })
        ),
        -1,
        false
      )
    );

    // Auto navigate after 10 seconds
    const timer = setTimeout(() => {
      router.replace('/auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const taglineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartPulse.value }],
  }));

  return (
    <LinearGradient
      colors={['#F8F5FF', '#E6F3FF', '#FFF0F5']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <Animated.View style={heartAnimatedStyle}>
            <Image
              source={{ uri: 'https://res.cloudinary.com/dmjxpa5gy/image/upload/v1756674257/image.jpg_lrafqk.jpg' }}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>
        </Animated.View>

        <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
          <Text style={styles.title}>Tendlie</Text>
        </Animated.View>

        <Animated.View style={[styles.taglineContainer, taglineAnimatedStyle]}>
          <Text style={styles.tagline}>Care thoughtfully with AI</Text>
          <View style={styles.taglineUnderline} />
        </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#2D3748',
    fontFamily: 'Lora_700Bold',
  },
  taglineContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  tagline: {
    fontSize: 20,
    color: '#718096',
    textAlign: 'center',
    fontFamily: 'Lora_400Regular',
    marginBottom: 8,
  },
  taglineUnderline: {
    width: 60,
    height: 2,
    backgroundColor: '#89CFF0',
    borderRadius: 1,
  },
});