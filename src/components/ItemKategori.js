import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const Kategori = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {data.map((item) => (
          <TouchableOpacity style={styles.cardItem} key={item.id}>
            <Image style={styles.pic} source={item.image} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardText}>{item.info}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default Kategori;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(148, 108, 82)',
  },
  pic: {
    width: 110,
    height: 180,
    borderRadius: 10,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 6,
    marginVertical: 12,
  },
  cardItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(248, 248, 248, 0.88)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    elevation: 3,
  },
  cardContent: {
    marginLeft: 8,
    marginRight: 108,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'rgb(148, 108, 82)',
  },
  cardText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'rgb(148, 108, 82)',
    textAlign: 'justify',
  },
});