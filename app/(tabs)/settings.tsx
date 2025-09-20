import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  Globe, 
  ChevronRight,
  Trash2
} from 'lucide-react-native';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [cultureAdaptation, setCultureAdaptation] = useState(true);

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: isDarkMode ? <Moon size={20} color="#D7B9D5" /> : <Sun size={20} color="#F4A261" />,
          icon: isDarkMode ? <Moon size={20} color="#D7B9D5" /> : <Sun size={20} color="#dc8484" />,
          label: 'Dark Mode',
          description: 'Switch between light and dark themes',
          type: 'toggle',
          value: isDarkMode,
          onToggle: setIsDarkMode,
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: <Bell size={20} color="#81a8ae" />,
          label: 'Push Notifications',
          description: 'Gentle reminders and insights',
          type: 'toggle',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
      ],
    },
    {
      title: 'Personalization',
      items: [
        {
          icon: <Globe size={20} color="#dc8484" />,
          label: 'Cultural Adaptation',
          description: 'Personalize insights for your culture',
          type: 'toggle',
          value: cultureAdaptation,
          onToggle: setCultureAdaptation,
        },
        {
          icon: <SettingsIcon size={20} color="#D7B9D5" />,
          label: 'Onboarding Preferences',
          description: 'Review and update your profile',
          type: 'link',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          icon: <Shield size={20} color="#81a8ae" />,
          label: 'Privacy Settings',
          description: 'Manage your data and encryption',
          type: 'link',
        },
        {
          icon: <Trash2 size={20} color="#EF4444" />,
          label: 'Delete Account',
          description: 'Permanently remove your data',
          type: 'link',
          destructive: true,
        },
      ],
    },
  ];

  const renderSettingItem = (item: any) => {
    if (item.type === 'toggle') {
      return (
        <View key={item.label} style={styles.settingItem}>
          {item.icon}
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>{item.label}</Text>
            <Text style={styles.settingDescription}>{item.description}</Text>
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: '#E2E8F0', true: '#81a8ae' }}
            thumbColor={item.value ? '#FFFFFF' : '#F1F5F9'}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity key={item.label} style={styles.settingItem}>
        {item.icon}
        <View style={styles.settingContent}>
          <Text style={[
            styles.settingLabel,
            item.destructive && styles.destructiveText
          ]}>
            {item.label}
          </Text>
          <Text style={styles.settingDescription}>{item.description}</Text>
        </View>
        <ChevronRight size={16} color="#CBD5E0" />
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={['#F8F5FF', '#E6F3FF', '#FFF0F5']} style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <SettingsIcon size={32} color="#81a8ae" />
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your Tendlie experience</Text>
        </View>

        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map(renderSettingItem)}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Tendlie v1.0.0</Text>
          <Text style={styles.footerSubtext}>Care thoughtfully with AI</Text>
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
    fontFamily: 'Lora_400Regular',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
    paddingHorizontal: 4,
    fontFamily: 'Lora_600SemiBold',
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3748',
    marginBottom: 4,
    fontFamily: 'Lora_500Medium',
  },
  destructiveText: {
    color: '#EF4444',
  },
  settingDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
    fontFamily: 'Lora_400Regular',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#A0AEC0',
    marginBottom: 4,
    fontFamily: 'Lora_400Regular',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#CBD5E0',
    fontFamily: 'Lora_400Regular',
  },
});