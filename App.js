import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import DashboardScreen from './src/Screens/DashboardScreen';
import UsuariosScreen from './src/Screens/UsariosScreen';
import GraficaProductos from './src/Screens/GraficasScreen';
import InventarioScreen from './src/Screens/InventarioScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name='Usuarios' component={UsuariosScreen} />
        <Stack.Screen name='Graficas' component={GraficaProductos} />
        <Stack.Screen name='Inventario' component={InventarioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
