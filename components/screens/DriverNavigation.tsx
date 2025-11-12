import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../contexts/AppContext';
import { NavigationProp } from '../../lib/navigation';

export default function DriverNavigation() {
  const navigation = useNavigation<NavigationProp<'DriverNavigation'>>();
  const { activeRide, setActiveRide } = useApp();
  const insets = useSafeAreaInsets();

  const handleStartRide = () => {
    if (activeRide) {
      setActiveRide({
        ...activeRide,
        status: 'in_progress'
      });
    }
  };

  const handleCancelRide = () => {
    Alert.alert(
      'Annuler la course ?',
      'Êtes-vous sûr de vouloir annuler cette course ? Le client sera notifié de l\'annulation.',
      [
        { text: 'Non, continuer', style: 'cancel' },
        {
          text: 'Oui, annuler',
          style: 'destructive',
          onPress: () => {
            setActiveRide(null);
            navigation.navigate('DriverDashboard' as any);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Map Area */}
      <View style={styles.mapContainer}>
        {/* Top Info Banner - Header */}
        <View style={[styles.infoBanner, { paddingTop: Math.max(insets.top + 16, 32) }]}>
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <TouchableOpacity
                onPress={() => navigation.navigate('DriverDashboard' as any)}
                style={styles.backButtonInCard}
              >
                <Ionicons name="chevron-back" size={20} color="#1f2937" />
              </TouchableOpacity>
              <View style={styles.infoContent}>
                <View style={styles.infoLeft}>
                  <Text style={styles.infoLabel}>Destination</Text>
                  <Text style={styles.infoDestination}>Saint-Louis, Centre-ville</Text>
                  <Text style={styles.infoClient}>Client: Amadou Diallo</Text>
                </View>
                <View style={styles.infoRight}>
                  <Text style={styles.infoPrice}>15 000 F</Text>
                  <Text style={styles.infoSeats}>2 places</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <Ionicons name="navigate" size={64} color="#facc15" />
          <Text style={styles.mapText}>Navigation Google Maps</Text>
          <Text style={styles.mapSubtext}>Dakar → Saint-Louis</Text>
        </View>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomContainer}>
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            onPress={handleStartRide}
            style={styles.startButton}
          >
            <Ionicons name="navigate" size={20} color="#ffffff" />
            <Text style={styles.startButtonText}>Démarrer la course</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call" size={20} color="#1f2937" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleCancelRide}
          style={styles.cancelButton}
        >
          <Ionicons name="close" size={20} color="#dc2626" />
          <Text style={styles.cancelButtonText}>Annuler la course</Text>
        </TouchableOpacity>

        {/* Trip Details */}
        <View style={styles.tripDetailsCard}>
          <Text style={styles.tripDetailsTitle}>Détails du trajet</Text>
          <View style={styles.tripDetailsList}>
            <View style={styles.tripDetailRow}>
              <Text style={styles.tripDetailLabel}>Distance</Text>
              <Text style={styles.tripDetailValue}>264 km</Text>
            </View>
            <View style={styles.tripDetailRow}>
              <Text style={styles.tripDetailLabel}>Durée estimée</Text>
              <Text style={styles.tripDetailValue}>3h 45min</Text>
            </View>
            <View style={styles.tripDetailRow}>
              <Text style={styles.tripDetailLabel}>Paiement</Text>
              <Text style={styles.tripDetailValue}>Wave</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#dbeafe',
    position: 'relative',
  },
  backButtonInCard: {
    padding: 8,
    marginRight: 12,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  mapText: {
    fontSize: 16,
    color: '#6b7280',
  },
  mapSubtext: {
    fontSize: 14,
    color: '#9ca3af',
  },
  infoBanner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoLeft: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  infoDestination: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  infoClient: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoRight: {
    alignItems: 'flex-end',
  },
  infoPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#facc15',
    marginBottom: 4,
  },
  infoSeats: {
    fontSize: 14,
    color: '#6b7280',
  },
  bottomContainer: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  startButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#22c55e',
    borderRadius: 12,
    padding: 16,
    height: 56,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  callButton: {
    width: 56,
    height: 56,
    backgroundColor: '#facc15',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#dc2626',
  },
  tripDetailsCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
  },
  tripDetailsTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  tripDetailsList: {
    gap: 8,
  },
  tripDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripDetailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  tripDetailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
});
