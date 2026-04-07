import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

const screenWidth = Dimensions.get('window').width;

interface YieldPredictionProps {
  navigation: NavigationProp<RootStackParamList>;
}

const YieldPrediction: React.FC<YieldPredictionProps> = ({ navigation }) => {
  const [selectedFarmer, setSelectedFarmer] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [selectedSeason, setSelectedSeason] = useState<string>('Dry');
  const [showResults, setShowResults] = useState<boolean>(false);

  const farmers = [
    { label: 'Select Farmer', value: '' },
    { label: 'Silas Thorne', value: 'silas' },
    { label: 'Elena Rodriguez', value: 'elena' },
    { label: 'Marcus Aurelius', value: 'marcus' },
    { label: 'Ji-Soo Kim', value: 'jisoo' },
  ];

  const crops = [
    { label: 'Select Crop', value: '' },
    { label: 'Organic Soy', value: 'soy' },
    { label: 'Wheat', value: 'wheat' },
    { label: 'Corn Stalks', value: 'corn' },
    { label: 'Berries', value: 'berries' },
  ];

  const seasons = ['Dry', 'Rainy', 'Post'];

  const chartData = {
    labels: ['2021', '2022', '2023', '2024F'],
    datasets: [
      {
        data: [2.0, 2.1, 2.3, 2.4],
        strokeWidth: 3,
        color: () => '#22c55e',
      },
    ],
  };

  const handlePredictYield = () => {
    if (selectedFarmer && selectedCrop) {
      setShowResults(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.logo}>🚜 FarmInvest</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.icon}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.icon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Crop Yield{'\n'}Prediction</Text>
          <Text style={styles.subtitle}>AI insights for smarter investments</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Farmer Dropdown */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Farmer</Text>
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
                    color={farmer.value ? '#ffffff' : '#94a3b8'}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Crop Dropdown */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Crop</Text>
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
                    color={crop.value ? '#ffffff' : '#94a3b8'}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Season Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Season</Text>
            <View style={styles.seasonContainer}>
              {seasons.map((season) => (
                <TouchableOpacity
                  key={season}
                  style={[
                    styles.seasonButton,
                    selectedSeason === season && styles.seasonButtonActive,
                  ]}
                  onPress={() => setSelectedSeason(season)}
                >
                  <Text
                    style={[
                      styles.seasonText,
                      selectedSeason === season && styles.seasonTextActive,
                    ]}
                  >
                    {season}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Predict Button */}
          <TouchableOpacity
            style={[
              styles.predictButton,
              (!selectedFarmer || !selectedCrop) && styles.predictButtonDisabled,
            ]}
            onPress={handlePredictYield}
            disabled={!selectedFarmer || !selectedCrop}
          >
            <Text style={styles.predictButtonText}>🧠 Predict Yield</Text>
          </TouchableOpacity>
        </View>

        {/* Results Section */}
        {showResults && (
          <>
            {/* AI Projected Result */}
            <View style={styles.resultSection}>
              <Text style={styles.sectionTitle}>AI PROJECTED RESULT</Text>
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Expected Yield</Text>
                <Text style={styles.resultValue}>2.4<Text style={styles.resultUnit}>tons/acre</Text></Text>
                <Text style={styles.resultSubtext}>📈 12% above regional average</Text>
                
                <View style={styles.confidenceSection}>
                  <Text style={styles.confidenceLabel}>Confidence Range</Text>
                  <Text style={styles.confidenceRange}>2.1t                    2.7t</Text>
                  <View style={styles.confidenceBar}>
                    <View style={styles.confidenceIndicator} />
                  </View>
                  <Text style={styles.confidenceText}>95% statistical probability</Text>
                </View>
              </View>
            </View>

            {/* Historical Chart */}
            <View style={styles.chartSection}>
              <Text style={styles.chartTitle}>Historical vs Predicted</Text>
              <LineChart
                data={chartData}
                width={screenWidth - 40}
                height={200}
                chartConfig={{
                  backgroundColor: '#1e2a3a',
                  backgroundGradientFrom: '#1e2a3a',
                  backgroundGradientTo: '#1e2a3a',
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: '#22c55e',
                    fill: '#22c55e',
                  },
                }}
                bezier
                style={styles.chart}
              />
            </View>

            {/* Yield Drivers */}
            <View style={styles.driversSection}>
              <Text style={styles.sectionTitle}>Yield Drivers</Text>
              <View style={styles.driverItem}>
                <View style={styles.driverIcon}>
                  <Text style={styles.driverIconText}>📈</Text>
                </View>
                <View style={styles.driverContent}>
                  <Text style={styles.driverTitle}>Historical Investment</Text>
                  <Text style={styles.driverSubtitle}>High soil nutrient restoration</Text>
                </View>
                <Text style={styles.driverValue}>+0.4t</Text>
              </View>

              <View style={styles.driverItem}>
                <View style={styles.driverIcon}>
                  <Text style={styles.driverIconText}>🌧️</Text>
                </View>
                <View style={styles.driverContent}>
                  <Text style={styles.driverTitle}>Weather patterns</Text>
                  <Text style={styles.driverSubtitle}>Favorable precipitation</Text>
                </View>
                <Text style={styles.driverValue}>+0.3t</Text>
              </View>

              <View style={styles.driverItem}>
                <View style={styles.driverIcon}>
                  <Text style={styles.driverIconText}>🛡️</Text>
                </View>
                <View style={styles.driverContent}>
                  <Text style={styles.driverTitle}>Pest Management</Text>
                  <Text style={styles.driverSubtitle}>Low regional disease level</Text>
                </View>
                <Text style={styles.driverValueStable}>STABLE</Text>
              </View>
            </View>

            {/* Recommended Actions */}
            <View style={styles.actionsSection}>
              <Text style={styles.sectionTitle}>Recommended Actions</Text>
              
              <TouchableOpacity style={styles.actionCard}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>💰</Text>
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>Increase Allocation</Text>
                  <Text style={styles.actionSubtitle}>
                    Yield outlook suggests a 14% higher ROI than initially projected.
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionCard}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>🛡️</Text>
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>Hedge Risk</Text>
                  <Text style={styles.actionSubtitle}>
                    Lock in weather-derivative insurance while rates are low.
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionCard}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>📊</Text>
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>Detailed Report</Text>
                  <Text style={styles.actionSubtitle}>
                    Download the comprehensive 12-page soil & climate analysis.
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerLeft: {},
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
  },
  titleSection: {
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  formSection: {
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
    fontWeight: '500',
  },
  dropdownContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  picker: {
    height: 50,
    color: '#ffffff',
  },
  seasonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  seasonButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#1e293b',
    alignItems: 'center',
  },
  seasonButtonActive: {
    backgroundColor: '#22c55e',
  },
  seasonText: {
    color: '#94a3b8',
    fontWeight: '500',
  },
  seasonTextActive: {
    color: '#ffffff',
  },
  predictButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  predictButtonDisabled: {
    backgroundColor: '#374151',
  },
  predictButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 16,
  },
  resultSection: {
    marginBottom: 30,
  },
  resultCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
  },
  resultLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  resultUnit: {
    fontSize: 18,
    color: '#94a3b8',
  },
  resultSubtext: {
    fontSize: 14,
    color: '#22c55e',
    marginBottom: 20,
  },
  confidenceSection: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 20,
  },
  confidenceLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  confidenceRange: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
  },
  confidenceBar: {
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    marginBottom: 8,
  },
  confidenceIndicator: {
    height: 4,
    width: '60%',
    backgroundColor: '#22c55e',
    borderRadius: 2,
    marginLeft: '20%',
  },
  confidenceText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  chartSection: {
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  driversSection: {
    marginBottom: 30,
  },
  driverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  driverIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  driverIconText: {
    fontSize: 18,
  },
  driverContent: {
    flex: 1,
  },
  driverTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 4,
  },
  driverSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
  },
  driverValue: {
    fontSize: 16,
    color: '#22c55e',
    fontWeight: 'bold',
  },
  driverValueStable: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: 'bold',
  },
  actionsSection: {
    marginBottom: 30,
  },
  actionCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionIconText: {
    fontSize: 18,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default YieldPrediction;