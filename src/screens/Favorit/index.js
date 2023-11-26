import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Add, ArrowCircleLeft} from 'iconsax-react-native';
import {ContentList} from '../../../data';
import {ItemFavorit} from '../../components';

const Favorit = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Favorit</Text>
          <TouchableOpacity
            style={{position: 'absolute', bottom: 20, right: 20}}>
            <Add color={'rgb(148, 108, 82)'} variant="Linear" size={28} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 6, gap: 10, paddingVertical: 10}}>
          {ContentList.map((item, index) => (
            <ItemFavorit item={item} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default Favorit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(148, 108, 82)',
  },
  headerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    paddingBottom: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 12,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-ExtraBold',
    color: 'rgb(148, 108, 82)',
  },
});
