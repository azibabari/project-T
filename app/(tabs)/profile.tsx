import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Heart, Globe, Settings, CreditCard as Edit } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <LinearGradient colors={['#F8F5FF', '#E6F3FF', '#FFF0F5']} style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#D7B9D5', '#89CFF0', '#81a8ae']}
              style={styles.avatar}
            >
              <User size={32} color="white" />
            </LinearGradient>
          </View>
          <Text style={styles.name}>Your Tendlie Profile</Text>
          <Text style={styles.subtitle}>Nurturing connections with AI guidance</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Heart size={24} color="#dc8484" />
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </View>
          <View style={styles.statCard}>
            <Globe size={24} color="#81a8ae" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Insights Gained</Text>
          </View>
        </View>

        <View style={styles.sectionsContainer}>
          <TouchableOpacity style={styles.sectionCard}>
            <Edit size={20} color="#D7B9D5" />
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Edit Profile</Text>
              <Text style={styles.sectionDescription}>
                Update your preferences and cultural settings
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionCard}>
            <Heart size={20} color="#dc8484" />
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Relationship Journey</Text>
              <Text style={styles.sectionDescription}>
                View your connection progress and insights
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionCard}>
            <Globe size={20} color="#81a8ae" />
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Cultural Preferences</Text>
              <Text style={styles.sectionDescription}>
                Manage your cultural context and traditions
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 4,
    fontFamily: 'Lora_700Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    fontFamily: 'Lora_400Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    marginTop: 8,
    marginBottom: 4,
    fontFamily: 'Lora_700Bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    fontFamily: 'Lora_400Regular',
  },
  sectionsContainer: {
    gap: 12,
  },
  sectionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
    fontFamily: 'Lora_600SemiBold',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
    fontFamily: 'Lora_400Regular',
  },
});