import React from 'react';
import {ScrollView, StyleSheet,  Text, TextInput, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {Notification, Receipt21, ArrowCircleRight2, Home2, User, Category2, SearchNormal1, Star1} from 'iconsax-react-native';
import { fontType, colors } from './src/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>BatInd</Text>
          <Notification color={colors.brown()} variant="Linear" size={28} />
        </View>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <SearchNormal1 color={colors.white()} variant="Linear" size={22} />
          </View>
          <View style={styles.searchText}>
            <TextInput placeholder="Cari Batik..."/>
          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <ListBlog />
      </View>
      <View style={navbar.container}>
        <TouchableOpacity style={navbar.item}>
          <Home2 color={colors.brown()} variant="Bold" size={20} />
          <Text style={navbar.text}>Beranda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navbar.item}>
          <Category2 color={colors.brown()} variant="Linear" size={20} />
          <Text style={navbar.text}>Kategori</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navbar.item}>
          <Star1 color={colors.brown()} variant="Linear" size={20} />
          <Text style={navbar.text}>Favorit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navbar.item}>
          <User color={colors.brown()} variant="Linear" size={20} />
          <Text style={navbar.text}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brown(),
  },
  cardContainer: {
    flex: 1,
    backgroundColor: colors.lightGrey(),
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
    backgroundColor: colors.lightGrey(),
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
  },
  title: {
    fontSize: 32,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.brown(),
  },
  searchBar: {
    flexDirection: 'row',
    height:40,
    marginVertical: 10,
    marginHorizontal: 24,
    borderRadius: 50,
    backgroundColor: colors.white(),
    elevation: 3,
  },
  searchIcon: {
    paddingHorizontal:20,
    borderRadius: 50,
    backgroundColor: colors.brown(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchText: {
    flex: 1,
    paddingLeft:4,
    paddingRight:12,
  },
});
const navbar = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 5,
    marginHorizontal: 5,
    borderRadius:15,
    backgroundColor: colors.white(),
    elevation:3,
  },
  item: {
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.brown(),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 12,
    color: colors.brown(),
    paddingTop:2,
  },
})


const ListBlog = () => {
  return (
    <ScrollView>
      <View style={category.item}>
        <Text style={category.title}>Batik Populer</Text>
      </View>
      <View style={styles.listBlog}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{gap: 15}}>
          <View style={{...itemHorizontal.cardItem, marginLeft: 12}}>
            <View style={cover.cardImage}>
              <ImageBackground
                style={itemHorizontal.cardImage}
                resizeMode="cover"
                imageStyle={{borderRadius: 15}}
                source={require('./src/assets/img/parang-barong.jpg')}>
                <View style={itemHorizontal.cardContent}>
                  <View style={itemHorizontal.cardInfo}>
                    <Text style={itemHorizontal.cardTitle}>Batik Parang Motif Barong</Text>
                    <Text style={itemHorizontal.cardText}>
                      Motif ini memiliki makna pengendalian diri dalam dinamika usaha yang terus-menerus,
                      kebijaksanaan dalam gerak, dan kehati-hatian dalam bertindak.
                    </Text>
                  </View>
                  <View style={itemHorizontal.cardPost}>
                    <Text style={itemHorizontal.cardText}>Aug 18, 2023</Text> 
                  </View>
                </View>
              </ImageBackground>
              <View style={cover.cardInfo}>
                <Text style={cover.cardText}>Selengkapnya</Text>
                <View style={cover.cardIcon}>
                  <ArrowCircleRight2 color={colors.white()} variant="Linear" size={28} />
                </View>
              </View>
            </View>
          </View>
          <View style={itemHorizontal.cardItem}>
            <View style={cover.cardImage}>
              <ImageBackground
                style={itemHorizontal.cardImage}
                resizeMode="cover"
                imageStyle={{borderRadius: 15}}
                source={require('./src/assets/img/cuwiri.jpg')}>
                <View style={itemHorizontal.cardContent}>
                  <View style={itemHorizontal.cardInfo}>
                    <Text style={itemHorizontal.cardTitle}>Batik Cuwiri</Text>
                    <Text style={itemHorizontal.cardText}>
                      Batik cuwiri memiliki arti kecil-kecil, yang diharapkan pemakainya terlihat pantas dan dihormati oleh masyarakat.
                      Batik ini biasa digunakan pada saat acara mitoni, sebuah tradisi memperingati tujuh bulan usia bayi.
                    </Text>
                  </View>
                  <View style={itemHorizontal.cardPost}>
                    <Text style={itemHorizontal.cardText}>May 10, 2023</Text> 
                  </View>
                </View>
              </ImageBackground>
              <View style={cover.cardInfo}>
                <Text style={cover.cardText}>Selengkapnya</Text>
                <View style={cover.cardIcon}>
                  <ArrowCircleRight2 color={colors.white()} variant="Linear" size={28} />
                </View>
              </View>
            </View>
          </View>
          <View style={{...itemHorizontal.cardItem, marginRight: 12}}>
            <View style={cover.cardImage}>
              <ImageBackground
                style={itemHorizontal.cardImage}
                resizeMode="cover"
                imageStyle={{borderRadius: 15}}
                source={require('./src/assets/img/sekar-jagad.jpg')}>
                <View style={itemHorizontal.cardContent}>
                  <View style={itemHorizontal.cardInfo}>
                    <Text style={itemHorizontal.cardTitle}>Batik Sekar Jagad</Text>
                    <Text style={itemHorizontal.cardText}>
                      Motif ini mengandung makna aneka rupa keindahan yang terjalin menjadi satu atau melingkupi keseluruhan keindahan.
                      Ada pula yang beranggapan bahwa motif ini melambangkan keragaman di seluruh dunia.
                    </Text>
                  </View>
                  <View style={itemHorizontal.cardPost}>
                    <Text style={itemHorizontal.cardText}>Sep 26, 2023</Text>
                  </View>
                </View>
              </ImageBackground>
              <View style={cover.cardInfo}>
                <Text style={cover.cardText}>Selengkapnya</Text>
                <View style={cover.cardIcon}>
                  <ArrowCircleRight2 color={colors.white()} variant="Linear" size={28} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={category.item}>
          <Text style={category.title}>Kategori</Text>
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
                  <View style={itemVertical.cardInfo}>
                    <Text style={itemVertical.cardTitle}>Batik Parang</Text>
                    <Text style={itemVertical.cardText}>Memiliki 10 Jenis Motif</Text>
                  </View>
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
                  <View style={itemVertical.cardInfo}>
                    <Text style={itemVertical.cardTitle}>Batik Lasem</Text>
                    <Text style={itemVertical.cardText}>Memiliki 10 Jenis Motif</Text>
                  </View>
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
                  <View style={itemVertical.cardInfo}>
                    <Text style={itemVertical.cardTitle}>Batik Sogan</Text>
                    <Text style={itemVertical.cardText}>Memiliki 10 Jenis Motif</Text>
                  </View>
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
                  <View style={itemVertical.cardInfo}>
                    <Text style={itemVertical.cardTitle}>Batik Megamendung</Text>
                    <Text style={itemVertical.cardText}>Memiliki 5 Jenis Motif</Text>
                  </View>
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
                  <View style={itemVertical.cardInfo}>
                    <Text style={itemVertical.cardTitle}>Batik Tujuh Rupa</Text>
                    <Text style={itemVertical.cardText}>Memiliki 7 Jenis Motif</Text>
                  </View>
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
                  <View style={itemVertical.cardInfo}>
                    <Text style={itemVertical.cardTitle}>Batik Kawung</Text>
                    <Text style={itemVertical.cardText}>Memiliki 5 Jenis Motif</Text>
                  </View>
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
    marginHorizontal: 12,
    marginVertical: 8,
  },
  title: {
    fontFamily:fontType['Pjs-Bold'],
    fontSize: 20,
    color: colors.brown(),
    marginTop: 8,
  },
});
const cover = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: 230,
    borderRadius: 15,
    backgroundColor: colors.brown(),
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent:'flex-end',
    alignItems: 'center ',
    paddingHorizontal: 12,
    paddingTop: 38,
  },
  cardText: {
    paddingHorizontal: 12,
    paddingBottom: 3,
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 20,
    color: colors.white(),
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  cardIcon: {
    paddingHorizontal: 12,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
const itemHorizontal = StyleSheet.create({
  cardItem: {
    width: 280,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 5,
  },
  cardContent: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  cardInfo: {
    flex:1,
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
    color: colors.white(),
    textShadowColor: colors.black(),
    textShadowRadius: 2,
    paddingBottom: 8,
  },
  cardText: {
    flex: 1,
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 10,
    color: colors.white(),
    textShadowColor: colors.black(),
    textShadowRadius: 2,
  },
  cardPost: {
    flex:1,
    alignItems: 'flex-end',
    padding: 12,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  cardIcon: {
    alignItems: 'flex-start',
  },
});
const itemVertical = StyleSheet.create({
  listCard: {
    flex:1,
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
    padding: 10,
    marginTop: 140,
    borderRadius: 10,
    height: '30%',
    backgroundColor: colors.brown(0.92),
  },
  cardInfo: {
    justifyContent: 'flex-end',
    height: '100%',
    gap: 4,
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 13,
    color: colors.white(),
  },
  cardText: {
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 11,
    color: colors.white(),
  },
});