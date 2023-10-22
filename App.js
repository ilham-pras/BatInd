import React, {useState} from 'react';
import {ScrollView, StyleSheet,  Text, TextInput, View, ImageBackground, TouchableOpacity} from 'react-native';
import {Notification, SearchNormal1} from 'iconsax-react-native';
import MenuBar from './src/components/MenuBar';
import { ContentList } from './data';
import { ListPopuler } from './src/components';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const handleSearchPress = (text) => {
    setSearchText(text);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>BatInd</Text>
          <Notification color={'rgb(148, 108, 82)'} variant="Linear" size={28} />
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
      <View style={styles.cardContainer}>
        <ListBlog />
      </View>
      <MenuBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(148, 108, 82)',
  },
  cardContainer: {
    flex: 1,
    backgroundColor: 'rgb(228, 228, 228)',
    borderRadius: 20,
    margin: 6,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 6,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: 'rgb(228, 228, 228)',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  title: {
    fontSize: 30,
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
    elevation: 3,
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


const ListBlog = () => {
  return (
    <ScrollView>
      <View style={category.item}>
        <Text style={category.title}>Batik Populer</Text>
      </View>
      <View style={styles.listBlog}>
        <ListPopuler data={ContentList} />

        <View style={category.item}>
          <Text style={category.title}>Kategori</Text>
          <TouchableOpacity style={category.itemText}>
            <Text style={category.text}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
        <View style={itemVertical.listCard}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4}}>
            <View style={itemVertical.cardItem}>
              <ImageBackground
                style={itemVertical.cardImage}
                resizeMode="cover"
                imageStyle={{borderRadius: 15}}
                source={require('./src/assets/img/parang1.jpg')}>
                <View style={itemVertical.cardContent}>
                  <TouchableOpacity style={itemVertical.cardInfo}>
                    <Text style={itemVertical.cardTitle}>Batik Parang</Text>
                    <Text style={itemVertical.cardText}>Memiliki 10 Jenis Motif</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
            <View style={itemVertical.cardItem}>
              <ImageBackground
                style={itemVertical.cardImage}
                resizeMode="cover"
                imageStyle={{borderRadius: 15}}
                source={require('./src/assets/img/lasem.jpg')}>
                <View style={itemVertical.cardContent}>
                  <TouchableOpacity style={itemVertical.cardInfo}>
                    <Text style={itemVertical.cardTitle}>Batik Lasem</Text>
                    <Text style={itemVertical.cardText}>Memiliki 10 Jenis Motif</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4}}>
            <View style={itemVertical.cardItem}>
              <ImageBackground
                style={itemVertical.cardImage}
                resizeMode="cover"
                imageStyle={{borderRadius: 15}}
                source={require('./src/assets/img/sogan.jpg')}>
                <View style={itemVertical.cardContent}>
                  <TouchableOpacity style={itemVertical.cardInfo}>
                    <Text style={itemVertical.cardTitle}>Batik Sogan</Text>
                    <Text style={itemVertical.cardText}>Memiliki 10 Jenis Motif</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
            <View style={itemVertical.cardItem}>
              <ImageBackground
                style={itemVertical.cardImage}
                resizeMode="cover"
                imageStyle={{borderRadius: 15}}
                source={require('./src/assets/img/megamendung.jpg')}>
                <View style={itemVertical.cardContent}>
                  <TouchableOpacity style={itemVertical.cardInfo}>
                    <Text style={itemVertical.cardTitle}>Batik Megamendung</Text>
                    <Text style={itemVertical.cardText}>Memiliki 5 Jenis Motif</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24}}>
            <View style={itemVertical.cardItem}>
              <ImageBackground
                style={itemVertical.cardImage}
                resizeMode="cover"
                imageStyle={{borderRadius: 15}}
                source={require('./src/assets/img/tujuh-rupa.jpg')}>
                <View style={itemVertical.cardContent}>
                  <TouchableOpacity style={itemVertical.cardInfo}>
                    <Text style={itemVertical.cardTitle}>Batik Tujuh Rupa</Text>
                    <Text style={itemVertical.cardText}>Memiliki 7 Jenis Motif</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
            <View style={itemVertical.cardItem}>
              <ImageBackground
                style={itemVertical.cardImage}
                resizeMode="cover"
                imageStyle={{borderRadius: 15}}
                source={require('./src/assets/img/kawung.jpg')}>
                <View style={itemVertical.cardContent}>
                  <TouchableOpacity style={itemVertical.cardInfo}>
                    <Text style={itemVertical.cardTitle}>Batik Kawung</Text>
                    <Text style={itemVertical.cardText}>Memiliki 5 Jenis Motif</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};


const category = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginTop: 8,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'rgb(148, 108, 82)',
    marginTop: 6,
  },
  itemText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: 'rgb(0, 0, 200)',
    marginTop: 8,
  },
});

const itemVertical = StyleSheet.create({
  listCard: {
    flex: 1,
    paddingHorizontal: 12,
    gap: 15,
  },
  cardItem: {
    width: 155,
    borderRadius: 15,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 140,
    borderRadius: 10,
    height: '30%',
    backgroundColor: 'rgba(148, 108, 82, 0.92)',
  },
  cardInfo: {
    justifyContent: 'flex-end',
    height: '100%',
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12.5,
    color: 'rgb(255, 255, 255)',
    paddingBottom: 4,
  },
  cardText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: 'rgb(255, 255, 255)',
  },
});
