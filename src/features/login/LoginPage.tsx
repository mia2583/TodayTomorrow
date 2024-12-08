import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {setUserAuth} from '../../../modules/redux/slice/UserAuthSlice';
import {GOOGLE_WEB_CLIENT_ID} from '@env';

function LoginPage({navigation}: any) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  // Google Sign-In 초기화
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID, // Google Cloud Console에서 발급받은 Web Client ID
      offlineAccess: true, // 서버 측 인증 활성화
    });
  }, []);

  const SignIn = async () => {
    try {
      // Google Play Services 확인
      await GoogleSignin.hasPlayServices();
      // 사용자 로그인 및 정보 저장
      const userInfo = await GoogleSignin.signIn();
      dispatch(
        setUserAuth({
          name: userInfo.data?.user.name,
          email: userInfo.data?.user.email,
        }),
      );
      setErrorMessage(''); // 에러 메시지 초기화
      if (userInfo.data?.user.name && userInfo.data?.user.email) {
        navigation.replace('Main'); // 페이지 이동
      }
    } catch (error: unknown) {
      // 에러 핸들링
      if (error instanceof Error) {
        if ((error as any).code === statusCodes.SIGN_IN_CANCELLED) {
          setErrorMessage('로그인이 취소되었습니다.');
        } else if ((error as any).code === statusCodes.IN_PROGRESS) {
          setErrorMessage('로그인 중입니다.');
        } else if (
          (error as any).code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
        ) {
          setErrorMessage('Google Play Services를 사용할 수 없습니다.');
        } else {
          setErrorMessage(`오류 발생: ${error.message}`);
        }
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={SignIn}
      />
      <Text style={styles.text}>로그인 필요</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
  },
  error: {
    marginTop: 8,
    color: 'red',
    fontSize: 14,
  },
});

export default LoginPage;
