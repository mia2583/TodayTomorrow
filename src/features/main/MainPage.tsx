import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../modules/redux/Store';
import {clearUserAuth} from '../../../modules/redux/slice/UserAuthSlice';

export default function MainPage({navigation}: any) {
  const userInfo = useSelector((state: RootState) => state.userAuth);
  const dispatch = useDispatch();

  const Logout = () => {
    dispatch(clearUserAuth()); // userAuth 상태 초기화
    navigation.replace('Login'); // 로그인 페이지로 이동
  };

  return (
    <View>
      <Text>Welcome, {userInfo.name || 'Guest'}!</Text>
      <Text>email: {userInfo.email}</Text>
      <Button title="Logout" onPress={Logout} />
    </View>
  );
}
