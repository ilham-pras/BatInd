import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity} from 'react-native';
import {ArrowCircleLeft, SearchNormal1} from 'iconsax-react-native';
import { KategoriList } from '../../../data';
import { ItemKategori } from '../../components';

const KategoriScreen = () => {
  const [searchText, setSearchText] = useState('');
  const handleSearchPress = (text) => {
    setSearchText(text);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Kategori</Text>
        </View>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <SearchNormal1 color={'rgb(255, 255, 255)'} variant="Linear" size={22} />
          </View>
          <View style={styles.searchText}>
            <TextInput value={searchText} onChangeText={handleSearchPress} placeholder="Cari Batik..."/>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        <ItemKategori data={KategoriList} />
      </ScrollView>
    </View>
  );
};
export default KategoriScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(148, 108, 82)',
  },
  scrollContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    paddingBottom: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-ExtraBold',
    color: 'rgb(148, 108, 82)',
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    marginBottom: 8,
    marginHorizontal: 24,
    borderRadius: 50,
    backgroundColor: 'rgb(255, 255, 255)',
    elevation: 4,
  },
  searchIcon: {
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: 'rgb(148, 108, 82)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchText: {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 12,
  },
});