import React, {useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { ArrowCircleRight2, Star1 } from 'iconsax-react-native';

const BatikPopuler = ({item, variant, onPress}) => {
  return (
    <View style={itemHorizontal.cardItem}>
      <View style={cover.cardImage}>
        <ImageBackground
        style={itemHorizontal.cardImage}
        resizeMode="cover"
        imageStyle={{borderRadius: 15}}
        source={item.image}>
          <View style={itemHorizontal.cardContent}>
            <View style={itemHorizontal.cardInfo}>
              <Text style={itemHorizontal.cardTitle}>{item.title}</Text>
              <Text style={itemHorizontal.cardText}>{item.info}</Text>
            </View>
            <View style={itemHorizontal.cardIcon}>
              <TouchableOpacity onPress={onPress}>
                <Star1 color={'rgb(255, 255, 0)'} variant={variant} size={20} />
              </TouchableOpacity>
            </View>
            <View style={itemHorizontal.cardPost}>
              <Text style={itemHorizontal.cardText}>{item.createdAt}</Text>
            </View>
          </View>
        </ImageBackground>
        <TouchableOpacity style={cover.cardInfo}>
          <Text style={cover.cardText}>Selengkapnya</Text>
          <View style={cover.cardIcon}>
            <ArrowCircleRight2 color={'rgb(255, 255, 255)'} variant="Linear" size={28} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ListPopuler = ({ data }) => {
  const [bookmark, setBookmark] = useState([]);
  const toggleBookmark = itemId => {
    if (bookmark.includes(itemId)) {
      setBookmark(bookmark.filter(id => id !== itemId));
    } else {
      setBookmark([...bookmark, itemId]);
    }
  };
  const renderItem = ({item}) => {
    variant = bookmark.includes(item.id) ? 'Bold' : 'Linear';
    return (
      <BatikPopuler
        item={item}
        variant={variant}
        onPress={() => toggleBookmark(item.id)}
      />
    );
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{width: 15}} />}
      contentContainerStyle={{paddingHorizontal: 12}}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};
export default ListPopuler;


const cover = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: 225,
    borderRadius: 15,
    backgroundColor: 'rgb(148, 108, 82)',
    elevation: 5,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center ',
    paddingHorizontal: 12,
    paddingTop: 36,
  },
  cardText: {
    paddingHorizontal: 12,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'rgb(255, 255, 255)',
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'rgb(255, 255, 255)',
    textShadowColor: 'rgb(0, 0, 0)',
    textShadowRadius: 2,
  },
  cardText: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: 'rgb(255, 255, 255)',
    textShadowColor: 'rgb(0, 0, 0)',
    textShadowRadius: 2,
  },
  cardPost: {
    flex: 1,
    alignItems: 'flex-end',
    padding: 12,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  cardIcon: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    padding: 5,
    marginBottom: 125,
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 0.5,
    borderRadius: 5,
  },
});