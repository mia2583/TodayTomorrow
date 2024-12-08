import {createSlice} from '@reduxjs/toolkit';

// 관리 상태(State) 정의
const initialState = {
  name: '',
  email: '',
};

// authUserSlice에서 관리하는 reducer 메서드를 관리
const UserAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    // 사용자 정보를 상태에 저장/초기화 함수들
    setUserAuth: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUserAuth: state => {
      state.name = '';
      state.email = '';
    },
  },
});

export const {setUserAuth, clearUserAuth} = UserAuthSlice.actions;
export default UserAuthSlice.reducer;
