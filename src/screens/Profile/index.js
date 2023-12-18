import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  ArrowCircleLeft,
  InfoCircle,
  LogoutCurve,
  Setting2,
  MessageQuestion,
  AddSquare,
} from 'iconsax-react-native';
import {ItemList} from '../../components';
import {ProfileData} from '../../../data';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const user = auth().currentUser;
    const fetchBlogData = () => {
      try {
        if (user) {
          const userId = user.uid;
          const blogCollection = firestore().collection('blog');
          const query = blogCollection.where('authorId', '==', userId);
          const unsubscribeBlog = query.onSnapshot(querySnapshot => {
            const blogs = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            setBlogData(blogs);
            setLoading(false);
          });

          return () => {
            unsubscribeBlog();
          };
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    const fetchProfileData = () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userId = user.uid;
          const userRef = firestore().collection('users').doc(userId);

          const unsubscribeProfile = userRef.onSnapshot(doc => {
            if (doc.exists) {
              const userData = doc.data();
              setProfileData(userData);
              fetchBlogData();
            } else {
              console.error('Dokumen pengguna tidak ditemukan.');
            }
          });

          return () => {
            unsubscribeProfile();
          };
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchBlogData();
    fetchProfileData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      firestore()
        .collection('blog')
        .onSnapshot(querySnapshot => {
          const blogs = [];
          querySnapshot.forEach(documentSnapshot => {
            blogs.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setBlogData(blogs);
        });
      setRefreshing(false);
    }, 1500);
  }, []);
  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.cardContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 20}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={profile.cardProfile}>
            <Image style={profile.pic} source={{uri: profileData?.photoUrl}} />
            <View style={{paddingLeft: 20}}>
              <Text style={profile.text}>{profileData?.fullName}</Text>
              <Text style={profile.info}>{profileData?.email}</Text>
            </View>
          </View>
          <TouchableOpacity style={profile.editProfile}>
            <Text style={profile.textEdit}>Edit Profile</Text>
          </TouchableOpacity>
          <View style={styles.cardItem}>
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() => navigation.navigate('AddBlog')}>
              <View style={{paddingRight: 16}}>
                <AddSquare
                  color={'rgb(148, 108, 82)'}
                  variant="Linear"
                  size={24}
                />
              </View>
              <Text style={profile.text}>Postingan Baru</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardContent}>
              <View style={{paddingRight: 16}}>
                <MessageQuestion
                  color={'rgb(148, 108, 82)'}
                  variant="Linear"
                  size={24}
                />
              </View>
              <Text style={profile.text}>Help & FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardContent}>
              <View style={{paddingRight: 16}}>
                <InfoCircle
                  color={'rgb(148, 108, 82)'}
                  variant="Linear"
                  size={24}
                />
              </View>
              <Text style={profile.text}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardContent}>
              <View style={{paddingRight: 16}}>
                <Setting2
                  color={'rgb(148, 108, 82)'}
                  variant="Linear"
                  size={24}
                />
              </View>
              <Text style={profile.text}>Pengaturan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardContent} onPress={handleLogout}>
              <View style={{paddingRight: 16}}>
                <LogoutCurve
                  color={'rgb(148, 108, 82)'}
                  variant="Linear"
                  size={24}
                />
              </View>
              <Text style={profile.text}>Log Out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.labelBg}>
            <Text style={styles.labelText}>Postinganku</Text>
          </View>
          <View style={{paddingVertical: 10, gap: 10}}>
            {loading ? (
              <ActivityIndicator size={'large'} color={'rgb(148, 108, 82)'} />
            ) : (
              blogData.map((item, index) => (
                <ItemList item={item} key={index} />
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(148, 108, 82)',
  },
  cardContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 20,
    marginHorizontal: 6,
    marginBottom: 6,
    marginTop: 10,
  },
  header: {
    backgroundColor: 'rgb(255, 255, 255)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 22,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-ExtraBold',
    color: 'rgb(148, 108, 82)',
  },
  cardItem: {
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
  myBlog: {
    paddingHorizontal: 22,
    paddingBottom: 16,
  },
  labelBg: {
    justifyContent: 'center',
    width: 155,
    paddingHorizontal: 22,
    paddingVertical: 4,
    backgroundColor: 'rgb(148, 108, 82)',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'rgb(255, 255, 255)',
  },
});

const profile = StyleSheet.create({
  pic: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: 'rgb(148, 108, 82)',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'rgb(148, 108, 82)',
  },
  cardProfile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 12,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: 'rgb(148, 108, 82)',
  },
  info: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'rgb(148, 108, 82)',
  },
  editProfile: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(148, 108, 82)',
    paddingVertical: 4,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  textEdit: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'rgb(255, 255, 255)',
  },
});
