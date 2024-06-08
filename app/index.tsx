import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const plans = [
  { id: '1', name: 'Viagem para a Praia', category: 'Viagem', cost: '1.000 R$', icon: '🏖️' },
  { id: '2', name: 'Festa de Aniversário', category: 'Pessoal', cost: '500 R$', icon: '🎉' },
  { id: '3', name: 'Investimento em Ações', category: 'Finanças', cost: '1.000 R$', icon: '📈' },
  { id: '4', name: 'Viagem para o Exterior', category: 'Viagem', cost: '3.000 R$', icon: '✈️' },
  { id: '5', name: 'Projeto de Voluntariado', category: 'Social', cost: '0 R$', icon: '🤝' },
  { id: '6', name: 'Compra de Novo Carro', category: 'Veículo', cost: '25.000 R$', icon: '🚗' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, Lucas!</Text>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }} // Substitua com a URL da imagem do perfil
            style={styles.profileImage}
          />
        </View>
      </View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginBottom: 10,
        }}
      />
      <Text style={styles.sectionTitle}>Planos Registrados</Text>
      <FlatList
        data={plans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.planItem}>
            <Text style={styles.planIcon}>{item.icon}</Text>
            <View style={styles.planDetails}>
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{item.name}</Text>
                <Text style={styles.planCost}>{item.cost}</Text>
              </View>
              <Text style={styles.planCategory}>{item.category}</Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={[styles.button, styles.viewButton]}>
        <Text style={[styles.buttonText, styles.viewButtonText]}>Ver todo planejamento</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.addButton]}>
        <Text style={styles.buttonText}>Adicionar plano</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  planItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  planIcon: {
    fontSize: 30,
    marginRight: 10,
  },
  planDetails: {
    flex: 1,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  planCost: {
    fontSize: 16,
    color: '#666',
  },
  planCategory: {
    fontSize: 14,
    color: '#999',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  viewButtonText: {
    color: '#000',
  },
  addButton: {
    marginBottom: 10,
  },
});
