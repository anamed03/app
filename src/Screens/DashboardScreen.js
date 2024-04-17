import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const DashboardScreen = ({ navigation }) => {


  useEffect(() => {
    const removeHeader = navigation.addListener('focus', () => {
      navigation.setOptions({
        headerShown: false
      });
    });

    return removeHeader;
  }, []);

  const handleLogout = () => {
    // Aquí puedes implementar la lógica de logout
    navigation.navigate('Login');
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require('../Assents/logoo.png')} style={styles.sidebarImage} />
        <Text style={styles.imageText}>Authomatic Logistic</Text>
        <Text st>¡Bienvenido al futuro!</Text>
      </View>

      <View style={styles.sidebarContent}>
        <CustomButton onPress={() => handleNavigate('Inventario')} icon={<MaterialIcons name="inventory" size={24} color="white" />} text="Inventario" />
        <CustomButton onPress={() => handleNavigate('Graficas')} icon={<Entypo name="circular-graph" size={24} color="white" />} text="Gráfica" />
        <CustomButton onPress={() => handleNavigate('Usuarios')} icon={<FontAwesome name="users" size={24} color="white" />} text="Usuarios" />
        {/* Agrega más botones para otras pantallas */}
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <SimpleLineIcons name="logout" size={24} color="white" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const CustomButton = ({ onPress, icon, text }) => (
  <TouchableOpacity onPress={onPress} style={styles.sidebarButton}>
    {icon}
    <Text style={styles.sidebarButtonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  sidebarContent: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  sidebarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#007bff',
    borderRadius: 10, // Añade esquinas redondeadas
    marginVertical: 6
  },
  sidebarButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 5,
  },
  logoutButton: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 5,
  },
  imageText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  sidebarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default DashboardScreen;
