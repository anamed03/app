import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';

function GraficaProductos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://10.84.180.191:3000/api/productos')
      .then(response => {
        const productos = response.data;
        let countCategoria1 = 0;
        let countCategoria2 = 0;

        productos.forEach(producto => {
          if (producto.Categoria === 1 && countCategoria1 < 10) {
            countCategoria1++;
          } else if (producto.Categoria === 2 && countCategoria2 < 10) {
            countCategoria2++;
          }
        });

        const totalProductos = countCategoria1 + countCategoria2;
        const categoria1Porcentaje = (countCategoria1 / totalProductos) * 100;
        const categoria2Porcentaje = (countCategoria2 / totalProductos) * 100;

        setData([
          { name: 'Cate. 1', population: categoria1Porcentaje, color: '#FF6347', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Cate. 2', population: categoria2Porcentaje, color: '#4682B4', legendFontColor: '#7F7F7F', legendFontSize: 15 }
        ]);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráfica de productos</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={data}
          width={350}
          height={350}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="55"
          absolute
          style={{ borderRadius: 16 }}
          hasLegend={true}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          La categorías que manejamos se clasifican por números:
        </Text>
        <Text style={styles.text}>
          Categoría 1 es igual a limpieza del hogar, que tiene que ver con detergentes, cloro, etc.
        </Text>
        <Text style={styles.text}>
          Categoría 2 es igual a Comida, que tiene que ver con comida enlatada, salsas, etc.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e8ecf4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  textBox: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  text: {
    marginBottom: 10,
  },
});

export default GraficaProductos;
