import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, Animated, Dimensions, } from 'react-native';

export default function SplashScreen({ navigation }) {
  const startAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.timing(
        startAnimation,
        {
          toValue: -Dimensions.get('window').height + (0),
          useNativeDriver: true,
          duration: 1500, // Menambahkan durasi animasi
        }
      )
    ]);

    const timeout = setTimeout(() => {
      animation.start(() => {
        clearTimeout(timeout); // Hapus timeout jika animasi selesai
        navigation.replace('MainApp');
      });
    }, 2000); // Tambahkan timeout untuk menahan splash screen selama 2000 milidetik

    // Membersihkan efek animasi pada komponen unmount
    return () => {
      clearTimeout(timeout);
      animation.stop();
    };
  }, [startAnimation, navigation]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: startAnimation }] }]}>
      <View style={styles.logo}>
        <Image source={require('../../assets/img/logo-splash.png')} />
        <Text style={styles.text}>Versi 1.0</Text>
      </View>
    </Animated.View>
  );
}

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