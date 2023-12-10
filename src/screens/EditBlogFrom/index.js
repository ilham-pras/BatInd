import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {ArrowCircleLeft, AddSquare, Add} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const EditBlogForm = ({route}) => {
  const {blogId} = route.params;
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
  const [blogData, setBlogData] = useState({
    title: '',
    info: '',
    location: '',
    category: {},
    totalLikes: 0,
  });
  const handleChange = (key, value) => {
    setBlogData({
      ...blogData,
      [key]: value,
    });
  };
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('blog')
      .doc(blogId)
      .onSnapshot(documentSnapshot => {
        const blogData = documentSnapshot.data();
        if (blogData) {
          console.log('Blog data: ', blogData);
          setBlogData({
            title: blogData.title,
            info: blogData.info,
            location: blogData.location,
            category: {
              id: blogData.category.id,
              name: blogData.category.name,
            },
          });
          setOldImage(blogData.image);
          setImage(blogData.image);
          setLoading(false);
        } else {
          console.log(`Blog with ID ${blogId} not found.`);
        }
      });
    setLoading(false);
    return () => subscriber();
  }, [blogId]);

  const handleImagePick = async () => {
    ImagePicker.openPicker({
      width: 1920,
      height: 1080,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdate = async () => {
    setLoading(true);
    let filename = image.substring(image.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const reference = storage().ref(`blogimages/${filename}`);
    try {
      if (image !== oldImage && oldImage) {
        const oldImageRef = storage().refFromURL(oldImage);
        await oldImageRef.delete();
      }
      if (image !== oldImage) {
        await reference.putFile(image);
      }
      const url =
        image !== oldImage ? await reference.getDownloadURL() : oldImage;
      await firestore().collection('blog').doc(blogId).update({
        title: blogData.title,
        info: blogData.info,
        location: blogData.location,
        image: url,
        category: blogData.category,
      });
      setLoading(false);
      console.log('Blog Updated!');
      navigation.navigate('KontenDetail', {blogId});
    } catch (error) {
      console.log(error);
    }
  };

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
          <Text style={styles.title}>Edit Postingan</Text>
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
        {image ? (
          <View style={{position: 'relative'}}>
            <Image
              style={{width: '100%', height: 130, borderRadius: 5}}
              source={{uri: image}}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: 'rgb(148, 108, 82)',
                borderRadius: 25,
              }}
              onPress={() => setImage(null)}>
              <Add
                size={20}
                variant="Linear"
                color={'rgb(255, 255, 255)'}
                style={{transform: [{rotate: '45deg'}]}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleImagePick}>
            <View
              style={[
                textInput.cardItem,
                {
                  gap: 10,
                  paddingVertical: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <AddSquare
                color={'rgba(128, 128, 128, 0.5)'}
                variant="Linear"
                size={42}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: 'rgba(128, 128, 128, 0.5)',
                }}>
                Upload Thumbnail
              </Text>
            </View>
          </TouchableOpacity>
        )}
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
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonLabel}>Update</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={'rgb(148, 108, 82)'} />
        </View>
      )}
    </View>
  );
};

export default EditBlogForm;

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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
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
