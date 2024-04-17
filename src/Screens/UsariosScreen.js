import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



const UsuariosScreen = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({
    email: '',
    username: '',
    password: ''
  });
  
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    axios.get('http://10.84.180.191:3000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener users:', error);
      });
  }, []);

  const handleDeleteUser = (userid) => {
    axios.delete(`http://10.84.180.191:3000/api/users/${userid}`)
      .then(response => {
        // Actualizar la lista de usuarios después de eliminar
        setUsers(users.filter(usuario => usuario.id !== userid));
      })
      .catch(error => {
        console.error('Error al eliminar usuario:', error);
      });
  };
  

  const handleEditUser = (userid) => {
    setEditUserId(userid);
    const selectedUser = users.find(usuario => usuario.id === userid);
    setEditedUser({
      email: selectedUser.email,
      username: selectedUser.username,
      password: selectedUser.password
    });
    setShowEditModal(true);
  };

  const handleInputChange = (name, value) => {
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitEdit = () => {
    axios.put(`http://10.84.180.191:3000/api/users/${editUserId}`, editedUser)
      .then(response => {
        // Actualizar la lista de usuarios después de editar
        setUsers(users.map(usuario => usuario.id === editUserId ? {...usuario, ...editedUser} : usuario));
        setShowEditModal(false);
      })
      .catch(error => {
        console.error('Error al enviar cambios del usuario:', error);
      });
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.headerCell}>ID Usuario</Text>
          <Text style={styles.headerCell}>Email</Text>
          <Text style={styles.headerCell}>Username</Text>
          <Text style={styles.headerCell}>Contraseña</Text>
          <Text style={styles.headerCell}>Acciones</Text>
        </View>
        {users.map(usuario => (
          <View key={usuario.id} style={styles.row}>
            <Text style={styles.cell}>{usuario.id}</Text>
            <Text style={styles.cell}>{usuario.email}</Text>
            <Text style={styles.cell}>{usuario.username}</Text>
            <Text style={styles.cell}>{usuario.password}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => handleEditUser(usuario.id)}>
              <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteUser(usuario.id)}>
              <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <Modal visible={showEditModal} transparent={true} animationType="fade">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Editar Usuario</Text>
            <TextInput
              style={styles.input}
              value={editedUser.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              value={editedUser.username}
              onChangeText={(value) => handleInputChange('username', value)}
              placeholder="Username"
            />
            <TextInput
              style={styles.input}
              value={editedUser.password}
              onChangeText={(value) => handleInputChange('password', value)}
              placeholder="Password"
            />
            <TouchableOpacity onPress={handleSubmitEdit}>
              <Text style={styles.button}><AntDesign name="save" size={24} color="black" />Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancelEdit}>
              <Text style={styles.button}><MaterialIcons name="cancel" size={24} color="black" />Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#e8ecf4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
    alignItems: 'center',
  },
  button: {
    color: 'blue',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
});

export default UsuariosScreen;
