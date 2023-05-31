import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {login} from '../../utils/axios/https/allAxios';

const storeLogin = createAsyncThunk(
  'users/post',
  async ({email, pass}, {rejectWithValue, fulfillWithValue}) => {
    try {
      const response = await login(email, pass);
      return fulfillWithValue(response.data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: {},
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    err: null,
  },
  reducers: {
    updateUserData: (state, action) => {
      state.data.userData = {
        ...action.payload,
      };
    },
    logout: () => {
      return {
        data: {},
        isLoading: false,
        isRejected: false,
        isFulfilled: false,
        err: null,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(storeLogin.pending, prevState => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      })
      .addCase(storeLogin.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(storeLogin.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});

export const usersAction = {
  ...userSlice.actions,
  storeLogin,
};
export default userSlice.reducer;
