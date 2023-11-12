import React from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import {Star1, Clock, Location} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

const truncateTextByWords = (text, maxWords) => {
  if (text) {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + ' ...';
    }
    return text;
  }
  return '';
}

const ItemFavorit = ({item, onPress, variant}) => {
  const navigation = useNavigation();
  return (
      <TouchableOpacity style={styles.cardItem} onPress={()=>navigation.navigate('KontenDetail', {blogId: item.id})}>
        <ImageBackground
        style={styles.cardImage}
        resizeMode="cover"
        imageStyle={{borderRadius: 15}}
        source={item.image}>
          <View style={styles.cardContent}>
            <View style={styles.cardCategory}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryLabel}>{item.category}</Text>
              </View>
            </View>
            <View>
              <View style={styles.cardIcon}>
                <TouchableOpacity onPress={onPress}>
                  <Star1 color={'rgb(255, 255, 0)'} variant={variant} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={{gap: 20, paddingHorizontal: 15, paddingVertical: 10}}>
          <View style={{gap: 10}}>
            <Text style={styles.blogTitle}>{item.title}</Text>
            <Text style={styles.blogContent}>{truncateTextByWords(item.info, 10)} </Text>
          </View>
          <View style={styles.cardInfo}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap:5}}>
              <Clock variant="Linear" color={'rgba(0, 0, 0, 0.6)'} size={12} />
              <Text style={styles.cardText}>{item.createdAt}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap:5}}>
              <Location variant="Linear" color={'rgba(0, 0, 0, 0.6)'} size={12} />
              <Text style={styles.cardText}>{item.location}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
  );
};
export default ItemFavorit;

const styles = StyleSheet.create({
  cardItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 15,
  },
  cardImage: {
    width: '100%',
    height: 145,
    borderRadius: 15,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: 'rgb(255, 255, 255)',
  },
  cardText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'rgb(148, 108, 82)',
  },
  cardIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.33)',
    padding: 5,
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  cardCategory: {
    justifyContent: 'flex-end',
    height: '100%',
    gap: 10,
    maxWidth: '60%',
  },
  categoryBadge: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  categoryLabel: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    color: 'rgb(0, 0, 0)',
  },
  blogTitle:{
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'rgb(148, 108, 82)',
  },
  blogContent:{
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    color: 'rgb(148, 108, 82)',
  }
});