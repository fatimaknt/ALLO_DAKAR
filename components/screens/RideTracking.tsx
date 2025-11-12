import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../contexts/AppContext';
import { NavigationProp } from '../../lib/navigation';

export default function RideTracking() {
  const navigation = useNavigation<NavigationProp<'RideTracking'>>();
  const { setActiveBooking } = useApp();
  const insets = useSafeAreaInsets();

  const handleCompleteRide = () => {
    setActiveBooking(null);
    navigation.navigate('ClientDashboard' as any);
  };

  const handleCancelRide = () => {
    Alert.alert(
      'Annuler la course ?',
      'Êtes-vous sûr de vouloir annuler cette course ? Des frais d\'annulation peuvent s\'appliquer.',
      [
        { text: 'Non, continuer', style: 'cancel' },
        {
          text: 'Oui, annuler',
          style: 'destructive',
          onPress: () => {
            setActiveBooking(null);
            navigation.navigate('ClientDashboard' as any);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Map Area */}
      <View style={styles.mapContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ClientDashboard' as any)}
          style={[styles.backButton, { top: Math.max(insets.top + 16, 40) }]}
        >
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </TouchableOpacity>

        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapIcon}>
            <Ionicons name="location" size={32} color="#1f2937" />
          </View>
          <Text style={styles.mapText}>Carte Google Maps</Text>
        </View>

        {/* Status Banner */}
        <View style={styles.statusBanner}>
          <View style={styles.statusContent}>
            <View style={styles.statusTextContainer}>
              <Ionicons name="car" size={16} color="#166534" />
              <Text style={styles.statusText}>
                Chauffeur en route ! Arrivée estimée dans <Text style={styles.statusBold}>5 min</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Driver Info Card */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.driverHeader}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverAvatarText}>MN</Text>
            </View>
            <View style={styles.driverInfo}>
              <View style={styles.driverNameRow}>
                <View style={styles.driverDetails}>
                  <Text style={styles.driverName}>Moussa Ndiaye</Text>
                  <Text style={styles.driverCar}>Toyota Corolla • DK-1234-AB</Text>
                </View>
                <View style={styles.rating}>
                  <Ionicons name="star" size={16} color="#facc15" />
                  <Text style={styles.ratingText}>4.8</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.callButton}>
                  <Ionicons name="call" size={20} color="#1f2937" />
                  <Text style={styles.callButtonText}>Appeler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.messageButton}>
                  <Text style={styles.messageButtonText}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Trip Details */}
          <View style={styles.tripDetails}>
            <View style={styles.tripItem}>
              <View style={styles.dotGreen} />
              <View style={styles.tripInfo}>
                <Text style={styles.tripLabel}>Point de départ</Text>
                <Text style={styles.tripText}>Dakar, Plateau</Text>
              </View>
            </View>
            <View style={styles.tripItem}>
              <View style={styles.dotRed} />
              <View style={styles.tripInfo}>
                <Text style={styles.tripLabel}>Destination</Text>
                <Text style={styles.tripText}>Saint-Louis, Centre-ville</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={handleCompleteRide}
            style={styles.completeButton}
          >
            <Text style={styles.completeButtonText}>Terminer la course</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCancelRide}
            style={styles.cancelButton}
          >
            <Ionicons name="close" size={20} color="#dc2626" />
            <Text style={styles.cancelButtonText}>Annuler la course</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  mapContainer: {
    height: '60%',
    backgroundColor: '#dbeafe',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 24,
    left: 24,
    zIndex: 10,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#facc15',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  mapText: {
    fontSize: 16,
    color: '#6b7280',
  },
  statusBanner: {
    position: 'absolute',
    top: 80,
    left: 24,
    right: 24,
  },
  statusContent: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  statusTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#166534',
    textAlign: 'center',
  },
  statusBold: {
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 36,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginTop: -29,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  driverHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  driverAvatar: {
    width: 64,
    height: 64,
    backgroundColor: '#1f2937',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverAvatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  driverInfo: {
    flex: 1,
  },
  driverNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  driverCar: {
    fontSize: 14,
    color: '#6b7280',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fefce8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#facc15',
    borderRadius: 12,
    padding: 12,
  },
  callButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  messageButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  tripDetails: {
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  tripItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  dotGreen: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    marginTop: 6,
  },
  dotRed: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ef4444',
    marginTop: 6,
  },
  tripInfo: {
    flex: 1,
  },
  tripLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  tripText: {
    fontSize: 16,
    color: '#1f2937',
  },
  actionsContainer: {
    marginTop: 24,
    gap: 12,
  },
  completeButton: {
    backgroundColor: '#facc15',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
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
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#dc2626',
  },
});
