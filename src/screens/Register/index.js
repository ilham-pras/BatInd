import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {Eye, EyeSlash} from 'iconsax-react-native';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isSignupDisabled, setSignupDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [paddingVertical, setPaddingVertical] = useState(60);
  const navigation = useNavigation();

  const handleRegister = async () => {
    let errorMessage = '';

    if (password !== confirmPassword) {
      errorMessage = 'Password dan konfirmasi password tidak cocok.';
    } else if (password.length < 8) {
      errorMessage = 'Panjang kata sandi harus minimal 8 karakter.';
    } else {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
      if (!passwordRegex.test(password)) {
        errorMessage = 'Password harus mengandung kombinasi huruf dan angka.';
      }
    }

    if (errorMessage) {
      Alert.alert('Error', errorMessage);
      return;
    }

    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .set({
          fullName,
          email,
          photoUrl: `https://i.pinimg.com/564x/48/33/76/483376371b3e03301a5d9a6c15013342.jpg`,
          createdAt: new Date(),
        })
        .then(() => {
          console.log('User added!');
        });
      setLoading(false);
      navigation.navigate('Login');
    } catch (error) {
      setLoading(false);
      console.log('Registration Error:', error);
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email sudah terdaftar!';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email tidak valid';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password lemah';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const updateSignupButtonStatus = () => {
    if (
      fullName.trim() &&
      email.trim() &&
      password.trim() &&
      confirmPassword.trim()
    ) {
      setSignupDisabled(false);
    } else {
      setSignupDisabled(true);
    }
  };

  useEffect(() => {
    updateSignupButtonStatus();
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setPaddingVertical(0);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setPaddingVertical(60);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [fullName, email, password, confirmPassword]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={image.logoWelcome}>
            <Image
              style={image.pic}
              source={require('../../assets/img/logo-welcome.png')}
            />
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.header}>Register</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.form}>
                <View>
                  <Text style={textinput.label}>Full Name</Text>
                  <View style={textinput.container}>
                    <TextInput
                      placeholder="Enter full name"
                      placeholderTextColor={'rgba(109, 125, 154, 0.6)'}
                      value={fullName}
                      onChangeText={text => {
                        setFullName(text);
                        updateSignupButtonStatus();
                      }}
                      style={textinput.text}
                    />
                  </View>
                </View>
                <View>
                  <Text style={textinput.label}>Email</Text>
                  <View style={textinput.container}>
                    <TextInput
                      placeholder="Enter your email address"
                      placeholderTextColor={'rgba(109, 125, 154, 0.6)'}
                      value={email}
                      onChangeText={text => {
                        setEmail(text);
                        updateSignupButtonStatus();
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
                        updateSignupButtonStatus();
                      }}
                      secureTextEntry={!passwordVisible}
                      style={[textinput.text, {flex: 1}]}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                      {passwordVisible ? (
                        <EyeSlash
                          variant="Linear"
                          color={'rgba(109, 125, 154, 0.6)'}
                          size={20}
                        />
                      ) : (
                        <Eye
                          variant="Linear"
                          color={'rgba(109, 125, 154, 0.6)'}
                          size={20}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text style={textinput.label}>Confirm Password</Text>
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
                      placeholder="Re-type password"
                      placeholderTextColor={'rgba(109, 125, 154, 0.6)'}
                      value={confirmPassword}
                      onChangeText={text => {
                        setConfirmPassword(text);
                        updateSignupButtonStatus();
                      }}
                      secureTextEntry={!confirmPasswordVisible}
                      style={[textinput.text, {flex: 1}]}
                    />
                    <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                      {confirmPasswordVisible ? (
                        <EyeSlash
                          variant="Linear"
                          color={'rgba(109, 125, 154, 0.6)'}
                          size={20}
                        />
                      ) : (
                        <Eye
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
                      backgroundColor: isSignupDisabled
                        ? 'rgba(148, 108, 82, 0.5)'
                        : 'rgb(148, 108, 82)',
                    },
                  ]}
                  underlayColor={'rgba(148, 108, 82, 0.9)'}
                  onPress={handleRegister}
                  disabled={isSignupDisabled}>
                  {loading ? (
                    <ActivityIndicator color={'rgb(255, 255, 255)'} />
                  ) : (
                    <Text style={button.label}>REGISTER</Text>
                  )}
                </TouchableHighlight>
                <View
                  style={{flexDirection: 'row', gap: 5, alignSelf: 'center'}}>
                  <Text style={[button.label, {color: 'rgb(0, 0, 0)'}]}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={[button.label, {color: 'rgb(53, 88, 225)'}]}>
                      Log in
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;

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
    marginBottom: 20,
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
    backgroundColor: 'rgba(238, 238, 238, 0.6)',
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
