import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Heart, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withDelay
} from 'react-native-reanimated';
import { useAuth } from '@/contexts/AuthContext';

type AuthMode = 'welcome' | 'login' | 'signup';

const AuthScreen = () => {
  const router = useRouter();
  const { signIn, signUp, signInWithGoogle, signInWithApple } = useAuth();
  const [mode, setMode] = useState<AuthMode>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const logoOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  React.useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 800 });
    contentOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      if (mode === 'signup') {
        await signUp(email, password);
        Alert.alert('Success', 'Account created! Please check your email to verify your account.');
      } else {
        await signIn(email, password);
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithApple();
      }
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Social authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const renderWelcome = () => (
    <View style={styles.welcomeContainer}>
      <Animated.View style={[styles.logoSection, logoAnimatedStyle]}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/dmjxpa5gy/image/upload/v1756674257/image.jpg_lrafqk.jpg' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.brandName}>Tendlie</Text>
        <Text style={styles.tagline}>Care thoughtfully with AI</Text>
      </Animated.View>

      <Animated.View style={[styles.welcomeContent, contentAnimatedStyle]}>
        <Text style={styles.welcomeTitle}>
          Build deeper connections with personalized AI guidance
        </Text>
      </Animated.View>

      <Animated.View style={[styles.actionButtons, contentAnimatedStyle]}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/auth')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setMode('login')}
        >
          <Text style={styles.secondaryButtonText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );

  const renderAuthForm = () => (
    <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.formHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setMode('welcome')}
        >
          <ArrowLeft size={24} color="#718096" />
        </TouchableOpacity>
        
        <View style={styles.formLogo}>
          <Image
            source={{ uri: 'https://res.cloudinary.com/dmjxpa5gy/image/upload/v1756674257/image.jpg_lrafqk.jpg' }}
            style={styles.logoSmall}
            resizeMode="contain"
          />
          <Text style={styles.logoTextSmall}>Tendlie</Text>
        </View>
      </View>

      <View style={styles.formContent}>
        <Text style={styles.formTitle}>
          {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
        </Text>
        <Text style={styles.formSubtitle}>
          {mode === 'signup' 
            ? 'Start your journey to deeper connections' 
            : 'Continue your journey with Tendlie'
          }
        </Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Mail size={20} color="#718096" />
            <TextInput
              style={styles.textInput}
              placeholder="Email address"
              placeholderTextColor="#A0AEC0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Lock size={20} color="#718096" />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor="#A0AEC0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="password"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? (
                <EyeOff size={20} color="#718096" />
              ) : (
                <Eye size={20} color="#718096" />
              )}
            </TouchableOpacity>
          </View>

          {mode === 'signup' && (
            <View style={styles.inputWrapper}>
              <Lock size={20} color="#718096" />
              <TextInput
                style={styles.textInput}
                placeholder="Confirm password"
                placeholderTextColor="#A0AEC0"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.authButton, isLoading && styles.disabledButton]}
          onPress={handleEmailAuth}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.authButtonText}>
              {mode === 'signup' ? 'Create Account' : 'Sign In'}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialAuth('google')}
            disabled={isLoading}
          >
            <Text style={styles.socialButtonText}>🔍 Google</Text>
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialAuth('apple')}
              disabled={isLoading}
            >
              <Text style={styles.socialButtonText}>🍎 Apple</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.switchModeButton}
          onPress={() => setMode(mode === 'signup' ? 'login' : 'signup')}
        >
          <Text style={styles.switchModeText}>
            {mode === 'signup' 
              ? 'Already have an account? Sign in' 
              : "Don't have an account? Sign up"
            }
          </Text>
        </TouchableOpacity>

        {mode === 'signup' && (
          <Text style={styles.termsText}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </Text>
        )}
      </View>
    </ScrollView>
  );

  return (
    <LinearGradient colors={['#F8F5FF', '#E6F3FF', '#FFF0F5']} style={styles.container}>
      {mode === 'welcome' ? renderWelcome() : renderAuthForm()}
    </LinearGradient>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 60,
  },
  logoSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  brandName: {
    fontSize: 42,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 8,
    fontFamily: 'Lora_700Bold',
  },
  tagline: {
    fontSize: 18,
    color: '#718096',
    fontFamily: 'Lora_400Regular',
  },
  welcomeContent: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  welcomeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
    fontFamily: 'Lora_600SemiBold',
  },
  actionButtons: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#81a8ae',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Lora_600SemiBold',
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#81a8ae',
    fontFamily: 'Lora_400Regular',
  },
  formContainer: {
    flex: 1,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  formLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  logoSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  logoTextSmall: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3748',
    fontFamily: 'Lora_700Bold',
  },
  formContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Lora_700Bold',
  },
  formSubtitle: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 40,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'Lora_400Regular',
  },
  inputContainer: {
    gap: 16,
    marginBottom: 32,
  },
  inputWrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    fontFamily: 'Lora_400Regular',
  },
  eyeButton: {
    padding: 4,
  },
  authButton: {
    backgroundColor: '#81a8ae',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#CBD5E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  authButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Lora_600SemiBold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 14,
    color: '#718096',
    fontFamily: 'Lora_400Regular',
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3748',
    fontFamily: 'Lora_500Medium',
  },
  switchModeButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
  },
  switchModeText: {
    fontSize: 16,
    color: '#81a8ae',
    fontFamily: 'Lora_400Regular',
  },
  termsText: {
    fontSize: 12,
    color: '#A0AEC0',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 16,
    fontFamily: 'Lora_400Regular',
  },
});