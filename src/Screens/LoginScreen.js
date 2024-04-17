import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const clearFields = () => {
    setUserName('');
    setPassword('');
  };

  useEffect(() => {
    const removeHeader = navigation.addListener('focus', () => {
      navigation.setOptions({
        headerShown: false
      });
    });

    return removeHeader;
  }, []);

  const loginUser = () => {
    // Verificar si los campos están vacíos
    if (userName.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Por favor, ingrese nombre de usuario y contraseña.');
      return;
    }

    Axios.post('http://10.84.180.191:3000/login', {
      LoginUserName: userName,
      LoginPassword: password
    }).then(response => {
      if (response.data.message) {
        Alert.alert('Error', response.data.message);
        clearFields(); // Limpiar campos en caso de error de inicio de sesión
      } else {
        // Handle successful login
        navigation.navigate('Dashboard'); // Redirige al usuario al dashboard
        clearFields(); // Limpiar campos después del inicio de sesión exitoso
      }
    }).catch(error => {
      // Handle login error
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.');
      clearFields(); // Limpiar campos en caso de error de inicio de sesión
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={require('../Assents/logoo.png')}
          />
          <Text style={styles.title}>
            <Text style={{ color: '#075eec' }}>Authomatic Logistic</Text>
          </Text>
          <Text style={styles.subtitle}>¡Bienvenidoo!</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.inputControl}
              placeholder="Ingresa tu Username"
              value={userName}
              onChangeText={text => setUserName(text)}
              placeholderTextColor="#6b7280"
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.inputControl}
              placeholder="Ingresa tu contraseña"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholderTextColor="#6b7280"
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={loginUser}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Iniciar Sesión</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.formFooter}>
            ¿Aun no tienes cuenta?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Registrarte</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  form: {},
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333333',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
});
