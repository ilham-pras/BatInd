import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Home2, User, Category2, Star1} from 'iconsax-react-native';

const MenuBar = () => {
  return (
    <View style={navbar.container}>
      <TouchableOpacity style={navbar.item}>
        <Home2 color='rgb(148, 108, 82)' variant="Linear" size={20} />
        <Text style={navbar.text}>Beranda</Text>
      </TouchableOpacity>
      <TouchableOpacity style={navbar.item}>
        <Category2 color='rgb(148, 108, 82)' variant="Linear" size={20} />
        <Text style={navbar.text}>Kategori</Text>
      </TouchableOpacity>
      <TouchableOpacity style={navbar.item}>
        <Star1 color='rgb(148, 108, 82)' variant="Linear" size={20} />
        <Text style={navbar.text}>Favorit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={navbar.item}>
        <User color='rgb(148, 108, 82)' variant="Linear" size={20} />
        <Text style={navbar.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};
export default MenuBar;

const navbar = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 6,
    marginBottom: 5,
    marginHorizontal: 5,
    borderRadius: 15,
    backgroundColor: 'rgb(255, 255, 255)',
    elevation: 3,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: 'rgb(148, 108, 82)',
    paddingTop: 2,
  },
});