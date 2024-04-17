import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const InventarioScreen = () => {
  const [productos, setProductos] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    QR: '',
    Nombre: '',
    Categoria: '',
    Cantidad: '' // Agregamos el campo de cantidad
  });
 
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  
  useEffect(() => {
    axios.get('http://10.84.180.191:3000/api/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, []);

  const handleDeleteProduct = (productId) => {
    axios.delete(`http://10.84.180.191:3000/api/productos/${productId}`)
      .then(response => {
        setProductos(productos.filter(producto => producto.IdProducto !== productId));
      })
      .catch(error => {
        console.error('Error al eliminar producto:', error);
      });
  };

  const handleEditProduct = (productId) => {
    setEditProductId(productId);
    const selectedProduct = productos.find(producto => producto.IdProducto === productId);
    setEditedProduct({
      QR: selectedProduct.QR,
      Nombre: selectedProduct.Nombre,
      Categoria: selectedProduct.Categoria,
      Cantidad: selectedProduct.Cantidad // Incluimos la cantidad en el objeto editedProduct
    });
    setIsEditFormOpen(true);
  };

  const handleSubmitEdit = () => {
    axios.put(`http://10.84.180.191:3000/api/productos/${editProductId}`, editedProduct)
      .then(response => {
        setProductos(productos.map(producto => producto.IdProducto === editProductId ? { ...producto, ...editedProduct } : producto));
        setIsEditFormOpen(false);
      })
      .catch(error => {
        console.error('Error al enviar cambios del producto:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Productos</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.headerCell}>ID Producto</Text>
            <Text style={styles.headerCell}>QR</Text>
            <Text style={styles.headerCell}>Nombre</Text>
            <Text style={styles.headerCell}>Categoría</Text>
            <Text style={styles.headerCell}>Cantidad</Text>
            <Text style={styles.headerCell}>Acciones</Text>
          </View>
          {productos.map(producto => (
            <View key={producto.IdProducto} style={styles.row}>
              <Text style={styles.cell}>{producto.IdProducto}</Text>
              <Text style={styles.cell}>{producto.QR}</Text>
              <Text style={styles.cell}>{producto.Nombre}</Text>
              <Text style={styles.cell}>{producto.Categoria}</Text>
              <Text style={styles.cell}>{producto.Cantidad}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleEditProduct(producto.IdProducto)}>
                  <AntDesign name="edit" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteProduct(producto.IdProducto)}>
                  <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <Modal visible={isEditFormOpen} transparent={true} animationType="fade">
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Editar Producto</Text>
              <TextInput
                style={styles.input}
                value={editedProduct.QR}
                onChangeText={(value) => setEditedProduct({ ...editedProduct, QR: value })}
                placeholder="QR"
              />
              <TextInput
                style={styles.input}
                value={editedProduct.Nombre}
                onChangeText={(value) => setEditedProduct({ ...editedProduct, Nombre: value })}
                placeholder="Nombre"
              />
              <TextInput
                style={styles.input}
                value={editedProduct.Categoria}
                onChangeText={(value) => setEditedProduct({ ...editedProduct, Categoria: value })}
                placeholder="Categoría"
              />
              <TextInput
                style={styles.input}
                value={editedProduct.Cantidad}
                onChangeText={(value) => setEditedProduct({ ...editedProduct, Cantidad: value })}
                placeholder="Cantidad"
              />
              <TouchableOpacity onPress={handleSubmitEdit}>
                <Text style={styles.button}><AntDesign name="save" size={24} color="black" /> Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsEditFormOpen(false)}>
                <Text style={styles.button}><MaterialIcons name="cancel" size={24} color="black" /> Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 1,
  },
  table: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    color: 'blue',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
});

export default InventarioScreen;
