import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Eye, EyeSlash} from 'iconsax-react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoginDisabled, setLoginDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    let errorMessage = '';
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const userToken = await auth().currentUser.getIdToken();
      const expirationInMilliseconds = 30 * 24 * 60 * 60 * 1000; //hari * jam * menit * detik * milidetik
      const expirationTime = new Date().getTime() + expirationInMilliseconds;
      const dataToStore = {
        userToken,
        expirationTime,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(dataToStore));
      setLoading(false);
      navigation.navigate('MainApp');
    } catch (error) {
      setLoading(false);
      console.log('Login Error:', error.message);
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email tidak valid.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Password salah.';
      } else if (error.code === 'auth/invalid-login') {
        errorMessage = 'Email atau password salah, silahkan periksa kembali.';
      } else {
        errorMessage = 'Terjadi kesalahan saat login.';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const updateLoginButtonStatus = () => {
    if (email.trim() && password.trim()) {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  };
  useEffect(() => {
    updateLoginButtonStatus();
  }, [email, password]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={image.logoWelcome}>
          <Image
            style={image.pic}
            source={require('../../assets/img/logo-welcome.png')}
          />
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.header}>Log in</Text>
          <ScrollView>
            <View style={styles.form}>
              <View>
                <Text style={textinput.label}>Email</Text>
                <View style={textinput.container}>
                  <TextInput
                    placeholder="Enter your email address"
                    placeholderTextColor={'rgba(109, 125, 154, 0.6)'}
                    value={email}
                    onChangeText={text => {
                      setEmail(text);
                      updateLoginButtonStatus();
                    }}
                    inputMode="email"
                    keyboardType="email-address"
                    style={textinput.text}
                  />
                </View>
              </View>
              <View>
                <Text style={textinput.label}>Password</Text>
                <View
                  style={[
                    textinput.container,
                    {
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 10,
                    },
                  ]}>
                  <TextInput
                    placeholder="Enter password"
                    placeholderTextColor={'rgba(109, 125, 154, 0.6)'}
                    value={password}
                    onChangeText={text => {
                      setPassword(text);
                      updateLoginButtonStatus();
                    }}
                    secureTextEntry={!passwordVisible}
                    style={[textinput.text, {flex: 1}]}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    {passwordVisible ? (
                      <Eye
                        variant="Linear"
                        color={'rgba(109, 125, 154, 0.6)'}
                        size={20}
                      />
                    ) : (
                      <EyeSlash
                        variant="Linear"
                        color={'rgba(109, 125, 154, 0.6)'}
                        size={20}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{gap: 10}}>
              <TouchableHighlight
                style={[
                  button.container,
                  {
                    backgroundColor: isLoginDisabled
                      ? 'rgba(148, 108, 82, 0.5)'
                      : 'rgb(148, 108, 82)',
                  },
                ]}
                underlayColor={'rgba(148, 108, 82, 0.9)'}
                onPress={handleLogin}
                disabled={isLoginDisabled}>
                {loading ? (
                  <ActivityIndicator color={'rgb(255, 255, 255)'} />
                ) : (
                  <Text style={button.label}>LOG IN</Text>
                )}
              </TouchableHighlight>
              <View style={{flexDirection: 'row', gap: 5, alignSelf: 'center'}}>
                <Text style={[button.label, {color: 'rgb(0, 0, 0)'}]}>
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={[button.label, {color: 'rgb(53, 88, 225)'}]}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(148, 108, 82)',
  },
  cardContainer: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    paddingHorizontal: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-ExtraBold',
    color: 'rgb(0, 0, 0)',
    paddingVertical: 10,
  },
  form: {
    flex: 1,
    gap: 10,
    marginBottom: 210,
  },
});
const image = StyleSheet.create({
  logoWelcome: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  pic: {
    width: 180,
    height: 130,
  },
});
const textinput = StyleSheet.create({
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'rgba(109, 125, 154, 0.6)',
    marginBottom: 5,
  },
  container: {
    backgroundColor: 'rgba(238, 238, 238, 0.5)',
    justifyContent: 'center',
    height: 52,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  text: {
    paddingVertical: 0,
    color: 'rgb(0, 0, 0)',
    fontFamily: 'Poppins-Regular',
  },
});
const button = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  label: {
    color: 'rgb(255, 255, 255)',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
});
