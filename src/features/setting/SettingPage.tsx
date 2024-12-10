import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../modules/redux/Store';
import {clearUserAuth} from '../../../modules/redux/slice/UserAuthSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function MainPage({navigation}: any) {
  const userInfo = useSelector((state: RootState) => state.userAuth);
  const dispatch = useDispatch();

  const Logout = async () => {
    try {
      await GoogleSignin.signOut(); // 구글 로그아웃
      dispatch(clearUserAuth()); // userAuth 상태 초기화
      navigation.replace('Login'); // 로그인 페이지로 이동
    } catch (error) {
      console.error('Logout Error: ', error);
    }
  };

  return (
    <View>
      <Text>Welcome, {userInfo.name || 'Guest'}!</Text>
      <Text>email: {userInfo.email}</Text>
      <Button title="Logout" onPress={Logout} />
    </View>
  );
}
