import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const categories = ['Viagem', 'Financeira', 'Saúde', 'Desenvolvimento'];

export default function AdicionePlano() {
  const router = useRouter();
  const [despesas, setDespesas] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [nomePlano, setNomePlano] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');

  const adicionarDespesa = () => {
    setDespesas([...despesas, { id: Date.now().toString(), nome: '', custo: '' }]);
  };

  const removerDespesa = (id) => {
    setDespesas(despesas.filter(despesa => despesa.id !== id));
  };

  const adicionarTarefa = () => {
    setTarefas([...tarefas, { id: Date.now().toString(), nome: '', prazo: '' }]);
  };

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Adicionar plano</Text>
      <Text style={styles.label}>Nome do plano</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o nome do plano"
        value={nomePlano}
        onChangeText={setNomePlano}
      />
      <Text style={styles.sectionTitle}>Categoria do plano</Text>
      <ScrollView horizontal style={styles.categoryScrollView}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, categoria === cat && styles.selectedCategory]}
            onPress={() => setCategoria(cat)}
          >
            <Text style={styles.categoryButtonText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.label}>Descrição do plano</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira a descrição do plano"
        value={descricao}
        onChangeText={setDescricao}
      />
      <Text style={styles.sectionTitle}>Despesas associadas</Text>
      {despesas.map((despesa, index) => (
        <View key={despesa.id} style={styles.despesaContainer}>
          <TextInput
            style={[styles.input, styles.despesaInput]}
            placeholder="Insira a despesa"
            value={despesa.nome}
            onChangeText={(text) => {
              const newDespesas = [...despesas];
              newDespesas[index].nome = text;
              setDespesas(newDespesas);
            }}
          />
          <TextInput
            style={[styles.input, styles.despesaInput]}
            placeholder="Insira o valor"
            value={despesa.custo}
            onChangeText={(text) => {
              const newDespesas = [...despesas];
              newDespesas[index].custo = text;
              setDespesas(newDespesas);
            }}
          />
          <TouchableOpacity onPress={() => removerDespesa(despesa.id)}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={adicionarDespesa}>
        <Text style={styles.addButtonText}>Adicionar mais despesas</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Lista de itens/tarefas</Text>
      {tarefas.map((tarefa, index) => (
        <View key={tarefa.id} style={styles.tarefaContainer}>
          <TextInput
            style={[styles.input, styles.tarefaInput]}
            placeholder="Nome da tarefa"
            value={tarefa.nome}
            onChangeText={(text) => {
              const newTarefas = [...tarefas];
              newTarefas[index].nome = text;
              setTarefas(newTarefas);
            }}
          />
          <TextInput
            style={[styles.input, styles.tarefaInput]}
            placeholder="Prazo"
            value={tarefa.prazo}
            onChangeText={(text) => {
              const newTarefas = [...tarefas];
              newTarefas[index].prazo = text;
              setTarefas(newTarefas);
            }}
          />
          <TouchableOpacity onPress={() => removerTarefa(tarefa.id)}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={adicionarTarefa}>
        <Text style={styles.addButtonText}>Adicionar mais item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  categoryScrollView: {
    marginBottom: 10,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#ddd',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#333',
  },
  despesaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  despesaInput: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
  },
  tarefaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tarefaInput: {
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
