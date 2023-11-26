import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {ArrowCircleLeft} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

const AddBlogForm = () => {
  const dataCategory = [
    {id: 1, name: 'Parang'},
    {id: 2, name: 'Lasem'},
    {id: 3, name: 'Sogan'},
    {id: 4, name: 'Megamendung'},
    {id: 5, name: 'Tujuh Rupa'},
    {id: 6, name: 'Kawung'},
    {id: 7, name: 'Cuwiri'},
    {id: 8, name: 'Sekar Jagad'},
  ];
  const [blogData, setblogData] = useState({
    title: '',
    info: '',
    location: '',
    category: {},
    totalLikes: 0,
  });
  const handleChange = (key, value) => {
    setblogData({
      ...blogData,
      [key]: value,
    });
  };
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowCircleLeft
            color={'rgb(148, 108, 82)'}
            variant="Linear"
            size={24}
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.title}>Postingan Baru</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}>
        <Text style={styles.text}>Judul</Text>
        <View style={textInput.cardItem}>
          <TextInput
            placeholder="Judul"
            value={blogData.title}
            onChangeText={text => handleChange('title', text)}
            placeholderTextColor={'rgba(128, 128, 128, 0.5)'}
            multiline
            style={textInput.title}
          />
        </View>
        <Text style={styles.text}>Deskripsi</Text>
        <View style={[textInput.cardItem, {minHeight: 250}]}>
          <TextInput
            placeholder="Deskripsi Batik"
            value={blogData.info}
            onChangeText={text => handleChange('info', text)}
            placeholderTextColor={'rgba(128, 128, 128, 0.5)'}
            multiline
            style={textInput.info}
          />
        </View>
        <Text style={styles.text}>Lokasi</Text>
        <View style={[textInput.cardItem]}>
          <TextInput
            placeholder="Lokasi"
            value={blogData.location}
            onChangeText={text => handleChange('location', text)}
            placeholderTextColor={'rgba(128, 128, 128, 0.5)'}
            multiline
            style={textInput.info}
          />
        </View>
        <Text style={styles.text}>Gambar</Text>
        <View style={[textInput.cardItem]}>
          <TextInput
            placeholder="Image"
            value={image}
            onChangeText={text => setImage(text)}
            placeholderTextColor={'rgba(128, 128, 128, 0.5)'}
            style={textInput.info}
          />
        </View>
        <Text style={styles.text}>Kategori</Text>
        <View style={[textInput.cardItem]}>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const bgColor =
                item.id === blogData.category.id
                  ? 'rgb(148, 108, 82)'
                  : 'rgba(128, 128, 128, 0.12)';
              const color =
                item.id === blogData.category.id
                  ? 'rgb(255, 255, 255)'
                  : 'rgb(128, 128, 128)';
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleChange('category', {id: item.id, name: item.name})
                  }
                  style={[category.item, {backgroundColor: bgColor}]}>
                  <Text style={[category.name, {color: color}]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddBlogForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(228, 228, 228, 0.8)',
  },
  header: {
    backgroundColor: 'rgb(255, 255, 255)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 4,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: 'rgb(148, 108, 82)',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: 'rgb(148, 108, 82)',
  },
  bottomBar: {
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: 'rgb(148, 108, 82)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: 'rgb(255, 255, 255)',
  },
});
const textInput = StyleSheet.create({
  cardItem: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'rgb(0, 0, 0)',
    padding: 0,
  },
  info: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: 'rgb(0, 0, 0)',
    padding: 0,
  },
});
const category = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(128, 128, 128, 0.5)',
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
});
