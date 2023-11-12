import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {ArrowCircleLeft, Lovely, Star1, Location, Share, More} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import { ContentList } from '../../../data';

const formatNumber = number => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return number.toString();
};

const KontenDetail = ({route}) => {
  const {blogId} = route.params;
  const [iconStates, setIconStates] = useState({
    liked: {variant: 'Linear', color: 'rgb(0, 0, 0)'},
    bookmarked: {variant: 'Linear', color: 'rgb(0, 0, 0)'},
  });
  const selectedBlog = ContentList.find(blog => blog.id === blogId);
  const navigation = useNavigation();
  const toggleIcon = iconName => {
    setIconStates(prevStates => ({
      ...prevStates,
      [iconName]: {
        variant: prevStates[iconName].variant === 'Linear' ? 'Bold' : 'Linear',
        color:
          prevStates[iconName].variant === 'Linear'
            ? 'rgb(0, 0, 0)'
            : 'rgb(0, 0, 0)',
      },
    }));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowCircleLeft color={'rgb(255, 255, 255)'} variant="Bold" size={28} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
          <Share color={'rgb(255, 255, 255)'} variant="Linear" size={24} />
          <More color={'rgb(255, 255, 255)'} variant="Linear" style={{transform: [{rotate: '90deg'}]}} />
        </View>
      </View>
      <View>
        <Image style={styles.image} source={selectedBlog.image} />
        <View style={styles.badgeContainer}>
          <View style={styles.categoryBadge}>
          <TouchableOpacity onPress={() => toggleIcon('liked')}>
            <Lovely color={iconStates.liked.color} variant={iconStates.liked.variant} size={20} />
          </TouchableOpacity>
          <Text style={styles.info}>
            {formatNumber(selectedBlog.totalLikes)}
          </Text>
        </View>
        <View style={styles.categoryBadge}>
          <TouchableOpacity onPress={() => toggleIcon('bookmarked')}>
            <Star1 color={iconStates.bookmarked.color} variant={iconStates.bookmarked.variant} size={20} />
          </TouchableOpacity>
        </View>
        </View>
      </View>

      <View style={styles.kontenContainer}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 54, }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={styles.category}>{selectedBlog.category}</Text>
            <Text style={styles.date}>{selectedBlog.createdAt}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap:4, paddingTop: 5,}}>
            <Location color={'rgba(0, 0, 0, 0.6)'} variant="Linear" size={16} />
            <Text style={styles.info}>{selectedBlog.location}</Text>
          </View>
          <Text style={styles.title}>{selectedBlog.title}</Text>
          <Text style={styles.content}>{selectedBlog.info}</Text>
        </ScrollView>
      </View>
    </View>
  );
};
export default KontenDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(148, 108, 82, 0.88)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 5,
    height: 50,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(192, 192, 192, 0.22)',
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 12,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems:'center',
    gap:5,
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 3,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  image: {
    height: 250,
    width: 'auto',
    marginBottom: -20,
  },
  kontenContainer: {
    flex: 1,
    backgroundColor: 'rgb(228, 228, 228)',
    borderTopLeftRadius: 15,
    borderTopRightRadius:15,
  },
  info: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  category: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  date: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'rgb(148, 108, 82)',
    marginTop: 16,
  },
  content: {
    color: 'rgb(148, 108, 82)',
    fontFamily: 'Poppins-Medium',
    textAlign: 'justify',
    fontSize: 12,
    marginTop: 5,
  },
});