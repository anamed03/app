import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import Axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const removeHeader = navigation.addListener('focus', () => {
      navigation.setOptions({
        headerShown: false
      });
    });

    return removeHeader;
  }, []);

  const registerUser = () => {
    Axios.post('http://10.84.180.191:3000/register', {
      Email: email,
      UserName: userName,
      Password: password
    }).then(() => {
      // Redirige al usuario al inicio de sesión después de un registro exitoso
      navigation.navigate('Login');
      setEmail('');
      setUserName('');
      setPassword('');
    }).catch(error => {
      console.error(error);
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
            Sign up for <Text style={{ color: '#075eec' }}>Authomatic Logistic</Text>
          </Text>
          <Text style={styles.subtitle}>Crea una cuenta</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email </Text>
            <TextInput
              style={styles.inputControl}
              placeholder="Enter your email"
              value={email}
              onChangeText={text => setEmail(text)}
              placeholderTextColor="#6b7280"
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.inputControl}
              placeholder="Enter your username"
              value={userName}
              onChangeText={text => setUserName(text)}
              placeholderTextColor="#6b7280"
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <TextInput
              style={styles.inputControl}
              placeholder="Enter your password"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholderTextColor="#6b7280"
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={registerUser}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.formFooter}>
            ¿Ya tienes una cuenta?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Inicia Sesión</Text>
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
    backgroundColor: '#001F3F',
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
