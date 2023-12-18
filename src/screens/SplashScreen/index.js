import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    checkToken();
  }, []);
  const checkToken = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');

      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        const {userToken, expirationTime} = userData;

        if (userToken && expirationTime) {
          const currentTime = new Date().getTime();

          if (currentTime <= expirationTime) {
            setTimeout(() => {
              navigation.replace('MainApp');
            }, 1500);
          } else {
            setTimeout(() => {
              navigation.replace('Login');
            }, 1500);
          }
        } else {
          setTimeout(() => {
            navigation.replace('Login');
          }, 1500);
        }
      } else {
        setTimeout(() => {
          navigation.replace('Login');
        }, 1500);
      }
    } catch (error) {
      console.error('Error retrieving token data:', error);
      setTimeout(() => {
        navigation.replace('Login');
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../assets/img/logo-splash.png')} />
        <Text style={styles.text}>Versi 1.0</Text>
      </View>
    </View>
  );
};

//   const startAnimation = useRef(new Animated.Value(0)).current;
//   useEffect(() => {
//     const animation = Animated.sequence([
//       Animated.timing(startAnimation, {
//         toValue: -Dimensions.get('window').height + 0,
//         useNativeDriver: true,
//         duration: 1500, // Menambahkan durasi animasi
//       }),
//     ]);

//     const timeout = setTimeout(() => {
//       animation.start(() => {
//         clearTimeout(timeout); // Hapus timeout jika animasi selesai
//         navigation.navigate('MainApp');
//       });
//     }, 2000); // Tambahkan timeout untuk menahan splash screen selama 2000 milidetik

//     // Membersihkan efek animasi pada komponen unmount
//     return () => {
//       clearTimeout(timeout);
//       animation.stop();
//     };
//   }, [startAnimation, navigation]);

//   return (
//     <Animated.View
//       style={[styles.container, {transform: [{translateY: startAnimation}]}]}>
//       <View style={styles.logo}>
//         <Image source={require('../../assets/img/logo-splash.png')} />
//         <Text style={styles.text}>Versi 1.0</Text>
//       </View>
//     </Animated.View>
//   );
// };

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(148, 108, 82)',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 180,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'rgb(255, 255, 255)',
    paddingTop: 280,
  },
});
