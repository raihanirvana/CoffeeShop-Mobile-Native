import {combineReducers} from '@reduxjs/toolkit';

import userSlice from './users';
import cartSlice from './cart';

const reducers = combineReducers({
  user: userSlice,
  cart: cartSlice,
});

export default reducers;
