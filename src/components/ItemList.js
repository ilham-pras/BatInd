import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Clock, Star1, Location} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '../utils/formatDate';

const ItemList = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => navigation.navigate('KontenDetail', {blogId: item.id})}>
      <Image style={styles.cardImage} source={{uri: item?.image}} />
      <View style={styles.favorit}>
        <Star1 color={'rgb(0, 0, 0)'} variant="Linear" size={20} />
      </View>
      <View style={styles.cardContent}>
        <View
          style={{
            gap: 5,
            flex: 1,
          }}>
          <View style={styles.cardCategory}>
            <Text style={styles.categoryText}>{item.category?.name}</Text>
          </View>
          <Text style={styles.cardTitle}>{item?.title}</Text>
          <View style={styles.cardInfo}>
            <Location size={10} variant="Bold" color={'rgb(172, 172, 172)'} />
            <Text style={styles.cardText}>{item?.location}</Text>
          </View>
        </View>
        <View style={[styles.cardInfo, {justifyContent: 'flex-end'}]}>
          <Clock size={10} variant="Linear" color={'rgb(172, 172, 172)'} />
          <Text style={[styles.cardText, {fontSize: 10}]}>
            {formatDate(item?.createdAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: 'row',
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 12,
    borderRadius: 10,
    elevation: 5,
  },
  favorit: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(228, 228, 228,0.7)',
    padding: 6,
    borderRadius: 8,
  },
  cardCategory: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    backgroundColor: 'rgb(148, 108, 82)',
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: 'rgb(255, 255, 255)',
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: 'rgb(0, 0, 0)',
  },
  cardText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'rgb(172, 172, 172)',
  },
  cardImage: {
    width: 120,
    height: 120,
    margin: 10,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  cardContent: {
    flex: 1,
    gap: 10,
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingVertical: 10,
  },
});
