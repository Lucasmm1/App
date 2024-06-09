import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const expenses = [
  { id: '1', nome: 'Despesa 1', custo: '200 R$' },
  { id: '2', nome: 'Despesa 2', custo: '150 R$' },
  { id: '3', nome: 'Despesa 3', custo: '100 R$' },
  { id: '4', nome: 'Despesa 4', custo: '50 R$' },
];

const plan = {
  tasks: [
    { id: '1', nome: 'Item 1', prazo: '30/11/2024', finalizado: true },
    { id: '2', nome: 'Item 2', prazo: '20/12/2024', finalizado: false },
  ]
};

export default function PlanDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Visualização detalhada do plano</Text>

      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginBottom: 10,
        }}
      />

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>Descrição do plano</Text>
        <TouchableOpacity style={styles.btnEditar}>
          <Text style={styles.btnEditarTexto}>Editar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>Despesas Associadas</Text>
        <TouchableOpacity style={styles.btnEditar}>
          <Text style={styles.btnEditarTexto}>Editar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.caixaGasto}>
            <Text style={styles.nomeGasto}>{item.nome}</Text>
            <Text style={styles.custoGasto}>{item.custo}</Text>
          </View>
        )}
      />

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>Lista de itens/tarefas</Text>
        <TouchableOpacity style={styles.btnEditar}>
          <Text style={styles.btnEditarTexto}>Editar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={plan.tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemTarefa}>
            <Ionicons
              name={item.finalizado ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={item.finalizado ? 'green' : 'gray'}
            />
            <View style={styles.detalheTarefa}>
              <Text style={styles.nomeTarefa}>{item.nome}</Text>
              <Text style={styles.prazoTarefa}>Data limite: {item.prazo}</Text>
            </View>
            <TouchableOpacity style={styles.btnEditar}>
              <Text style={styles.btnEditarTexto}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.btnDeletar}>
        <Text style={styles.textoBtnDeletar}>Deletar Plano</Text>
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
    paddingBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  secao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnEditar: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  btnEditarTexto: {
    color: '#000',
  },
  caixaGasto: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nomeGasto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  custoGasto: {
    fontSize: 14,
    color: '#666',
  },
  itemTarefa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  detalheTarefa: {
    flex: 1,
    marginLeft: 10,
  },
  nomeTarefa: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  prazoTarefa: {
    fontSize: 14,
    color: '#666',
  },
  btnDeletar: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBtnDeletar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
