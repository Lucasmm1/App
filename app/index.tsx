import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { usePlanDatabase, PlanDatabase } from '../database/usePlanDatabase';
import imgUsr from '../assets/images/imgUsr.png';

export default function HomeScreen() {
  const router = useRouter();
  const { getAll } = usePlanDatabase();
  const [plans, setPlans] = useState<PlanDatabase[]>([]);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const plansFromDB = await getAll();
        setPlans(plansFromDB);
      } catch (error) {
        console.error('Erro ao buscar planos:', error);
      }
    }

    fetchPlans();
  }, []);

  function alerta(){
    Alert.alert("Em desenvolvimento...")
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.boasVindas}>Olá, Lucas!</Text>
        <View style={styles.imgUserContainer}>
          <Image source={imgUsr} style={styles.imgUser} />
        </View>
      </View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginBottom: 10,
        }}
      />
      <Text style={styles.tituloSecao}>Planos Registrados</Text>
      <FlatList
        data={plans}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/detalhe_plano?id=${item.id}`)}>
            <View style={styles.itemPlano}>
              <Text style={styles.iconePlano}>{item.icone}</Text>
              <View style={styles.detalhesPlano}>
                <View style={styles.cabecalhoPlano}>
                  <Text style={styles.nomePlano}>{item.nome}</Text>
                  <Text style={styles.custoPlano}>{item.custo} R$</Text>
                </View>
                <Text style={styles.categoriaPlano}>{item.categoria}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View>
            <TouchableOpacity style={[styles.btn, styles.btnVerPlanejamento]} onPress={alerta}>
              <Text style={[styles.btnTexto, styles.btnVerPlanejamentoTexto]}>Analise de gastos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnAdicionar]} onPress={() => router.push('/adicionar_plano')}>
              <Text style={styles.btnTexto}>Adicionar plano</Text>
            </TouchableOpacity>
          </View>
        }
      />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  boasVindas: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imgUserContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    overflow: 'hidden',
  },
  imgUser: {
    width: '100%',
    height: '100%',
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemPlano: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  iconePlano: {
    fontSize: 30,
    marginRight: 10,
  },
  detalhesPlano: {
    flex: 1,
  },
  cabecalhoPlano: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nomePlano: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  custoPlano: {
    fontSize: 16,
    color: '#666',
  },
  categoriaPlano: {
    fontSize: 14,
    color: '#999',
  },
  btn: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  btnTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnVerPlanejamento: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  btnVerPlanejamentoTexto: {
    color: '#000',
  },
  btnAdicionar: {
    marginBottom: 20,
  },
});
