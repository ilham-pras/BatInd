import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  ArrowCircleLeft,
  InfoCircle,
  LogoutCurve,
  Setting2,
  MessageQuestion,
  AddSquare,
} from 'iconsax-react-native';
import {ProfileData} from '../../../data';
import MenuBar from '../../components/MenuBar';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={profile.cardProfile}>
          <Image style={profile.pic} source={ProfileData.profilePict} />
          <View>
            <Text style={profile.text}>{ProfileData.name}</Text>
            <Text style={profile.info}>{ProfileData.email}</Text>
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
          <TouchableOpacity style={styles.cardContent}>
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
    justifyContent: 'space-between',
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
