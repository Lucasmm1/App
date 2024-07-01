import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { usePlanDatabase } from '../database/usePlanDatabase';

export default function PlanDetails() {
  const { id } = useLocalSearchParams();
  const { getPlanById, getAllExpenses, getAllTasks, deletePlanById, updatePlanDescription } = usePlanDatabase();
  const [plan, setPlan] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchPlanDetails() {
      try {
        const planData = await getPlanById(Number(id));
        const expensesData = await getAllExpenses(Number(id));
        const tasksData = await getAllTasks(Number(id));

        setPlan(planData);
        setExpenses(expensesData);
        setTasks(tasksData);
        setNewDescription(planData.descricao);

        console.log(tasks);
        console.log(plan);
      } catch (error) {
        console.error('Erro ao buscar detalhes do plano:', error);
      }
    }

    fetchPlanDetails();
  }, [id]);

  const handleDeletePlan = async () => {
    try {
      await deletePlanById(Number(id));
      Alert.alert("Plano deletado com sucesso!");
      router.push('/');
    } catch (error) {
      console.error('Erro ao deletar plano:', error);
      Alert.alert("Erro ao deletar plano.");
    }
  };

  const handleSaveDescription = async () => {
    try {
      await updatePlanDescription(Number(id), newDescription);
      setPlan({ ...plan, descricao: newDescription });
      setIsEditingDescription(false);
      Alert.alert("Descrição atualizada com sucesso!");
    } catch (error) {
      console.error('Erro ao atualizar descrição:', error);
      Alert.alert("Erro ao atualizar descrição.");
    }
  };

  if (!plan) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Carregando...</Text>
      </View>
    );
  }

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
        <TouchableOpacity
          style={styles.btnEditar}
          onPress={() => setIsEditingDescription(true)}
        >
          <Text style={styles.btnEditarTexto}>Editar</Text>
        </TouchableOpacity>
      </View>

      {isEditingDescription ? (
        <View>
          <TextInput
            style={styles.descricaoInput}
            value={newDescription}
            onChangeText={setNewDescription}
          />
          <TouchableOpacity
            style={styles.btnSalvar}
            onPress={handleSaveDescription}
          >
            <Text style={styles.btnSalvarTexto}>Salvar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.descricao}>{plan.descricao}</Text>
      )}

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>Despesas Associadas</Text>
        <TouchableOpacity style={styles.btnEditar}>
          <Text style={styles.btnEditarTexto}>Editar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.caixaGasto}>
            <Text style={styles.nomeGasto}>{item.name}</Text>
            <Text style={styles.custoGasto}>{item.cost} R$</Text>
          </View>
        )}
      />

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>Lista de itens/tarefas</Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemTarefa}>
            <Ionicons
              name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={item.completed ? 'green' : 'gray'}
            />
            <View style={styles.detalheTarefa}>
              <Text style={styles.nomeTarefa}>{item.name}</Text>
              <Text style={styles.prazoTarefa}>Data limite: {item.deadline}</Text>
            </View>
            <TouchableOpacity style={styles.btnEditar}>
              <Text style={styles.btnEditarTexto}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.btnDeletar} onPress={handleDeletePlan}>
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
  descricao: {
    fontSize: 16,
    marginBottom: 20,
  },
  descricaoInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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
  btnSalvar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnSalvarTexto: {
    color: '#fff',
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
