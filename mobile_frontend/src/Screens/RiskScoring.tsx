import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

// Use a simpler circular progress component for now
const CircularProgress: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }}>
    {children}
  </View>
);

interface RiskScoringProps {
  navigation: NavigationProp<RootStackParamList>;
}

const RiskScoring: React.FC<RiskScoringProps> = ({ navigation }) => {
  const [selectedFarmer, setSelectedFarmer] = useState<string>('ramesh');
  const [selectedCrop, setSelectedCrop] = useState<string>('wheat');
  const [region, setRegion] = useState<string>('Punjab, NW District');
  const [amount, setAmount] = useState<string>('50,000');
  const [showResults, setShowResults] = useState<boolean>(false);

  const farmers = [
    { label: 'Ramesh K. Sharma', value: 'ramesh' },
    { label: 'Silas Thorne', value: 'silas' },
    { label: 'Elena Rodriguez', value: 'elena' },
    { label: 'Marcus Aurelius', value: 'marcus' },
    { label: 'Ji-Soo Kim', value: 'jisoo' },
  ];

  const crops = [
    { label: 'Organic Wheat', value: 'wheat' },
    { label: 'Organic Soy', value: 'soy' },
    { label: 'Corn Stalks', value: 'corn' },
    { label: 'Berries', value: 'berries' },
  ];

  const handleCalculateRisk = () => {
    setShowResults(true);
  };

  const riskFactors = [
    { label: 'Farmer history', level: 'CRITICAL', progress: 0.9, color: '#ef4444' },
    { label: 'Crop volatility', level: 'STABLE', progress: 0.3, color: '#22c55e' },
    { label: 'Regional climate risk', level: 'MODERATE', progress: 0.6, color: '#64748b' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🚜 FarmInvest</Text>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Investment Risk Scoring</Text>
          <Text style={styles.subtitle}>AI-driven risk insights</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formCard}>
          {/* Farmer Dropdown */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>FARMER</Text>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedFarmer}
                onValueChange={setSelectedFarmer}
                style={styles.picker}
                dropdownIconColor="#94a3b8"
              >
                {farmers.map((farmer) => (
                  <Picker.Item
                    key={farmer.value}
                    label={farmer.label}
                    value={farmer.value}
                    color="#ffffff"
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Crop Dropdown */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>CROP</Text>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedCrop}
                onValueChange={setSelectedCrop}
                style={styles.picker}
                dropdownIconColor="#94a3b8"
              >
                {crops.map((crop) => (
                  <Picker.Item
                    key={crop.value}
                    label={crop.label}
                    value={crop.value}
                    color="#ffffff"
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Region Field */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>REGION</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={region}
                onChangeText={setRegion}
                placeholderTextColor="#94a3b8"
              />
              <View style={styles.locationIcon}>
                <Text style={styles.locationIconText}>📍</Text>
              </View>
            </View>
          </View>

          {/* Amount Field */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>AMOUNT</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholderTextColor="#94a3b8"
              />
              <Text style={styles.currencyLabel}>INR</Text>
            </View>
          </View>

          {/* Calculate Button */}
          <TouchableOpacity style={styles.calculateButton} onPress={handleCalculateRisk}>
            <Text style={styles.calculateIcon}>🧮</Text>
            <Text style={styles.calculateButtonText}>Calculate Risk Score</Text>
          </TouchableOpacity>
        </View>

        {/* Results Section - Initially shown */}
        <View style={styles.resultsCard}>
          {/* Risk Score Circle */}
          <View style={styles.riskScoreSection}>
            <CircularProgress>
              <View style={styles.scoreContent}>
                <Text style={styles.scoreNumber}>72</Text>
                <Text style={styles.scoreText}>OUT OF 100</Text>
              </View>
            </CircularProgress>
            
            <View style={styles.riskBadge}>
              <Text style={styles.riskBadgeText}>🔶 HIGH RISK</Text>
            </View>
            
            <Text style={styles.riskQuote}>"High risk due to limited history."</Text>
          </View>

          {/* Risk Factors */}
          <View style={styles.riskFactorsSection}>
            {riskFactors.map((factor, index) => (
              <View style={styles.riskFactorItem}>
                <Text style={styles.riskFactorLabel}>{factor.label}</Text>
                <Text style={[styles.riskFactorLevel, { color: factor.color }]}>
                  {factor.level}
                </Text>
                <View style={styles.riskFactorBar}>
                  <View 
                    style={[
                      styles.riskFactorProgress, 
                      { width: `${factor.progress * 100}%`, backgroundColor: factor.color }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Recommendation */}
          <View style={styles.recommendationSection}>
            <Text style={styles.recommendationTitle}>RECOMMENDATION</Text>
            <TouchableOpacity style={styles.recommendationCard}>
              <View style={styles.recommendationIcon}>
                <Text style={styles.recommendationIconText}>✅</Text>
              </View>
              <Text style={styles.recommendationText}>
                Recommended max investment: Rs 15,000
              </Text>
              <Text style={styles.recommendationArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Info Cards */}
        <View style={styles.bottomCards}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📈</Text>
            <Text style={styles.infoLabel}>Projected Yield</Text>
            <Text style={styles.infoValue}>14.2%</Text>
          </View>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📅</Text>
            <Text style={styles.infoLabel}>Cycle Duration</Text>
            <Text style={styles.infoValue}>180 Days</Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 40,
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  titleSection: {
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  formCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 8,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  dropdownContainer: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  picker: {
    height: 50,
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
  locationIcon: {
    marginLeft: 8,
  },
  locationIconText: {
    fontSize: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  currencySymbol: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
  currencyLabel: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  calculateButton: {
    flexDirection: 'row',
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  calculateIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  calculateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  riskScoreSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  scoreContent: {
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 36,
  },
  scoreText: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 4,
    letterSpacing: 1,
  },
  riskBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  riskBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  riskQuote: {
    fontSize: 14,
    color: '#94a3b8',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  riskFactorsSection: {
    marginBottom: 30,
  },
  riskFactorItem: {
    marginBottom: 20,
  },
  riskFactorLabel: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 4,
    fontWeight: '500',
  },
  riskFactorLevel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  riskFactorBar: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
  },
  riskFactorProgress: {
    height: 6,
    borderRadius: 3,
  },
  recommendationSection: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 20,
  },
  recommendationTitle: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 12,
  },
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 12,
  },
  recommendationIcon: {
    marginRight: 12,
  },
  recommendationIconText: {
    fontSize: 16,
  },
  recommendationText: {
    flex: 1,
    color: '#22c55e',
    fontSize: 14,
    fontWeight: '600',
  },
  recommendationArrow: {
    color: '#94a3b8',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomCards: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default RiskScoring;