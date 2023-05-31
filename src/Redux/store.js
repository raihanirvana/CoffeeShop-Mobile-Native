import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  PERSIST,
  FLUSH,
  REHYDRATE,
  PAUSE,
  REGISTER,
  PURGE,
} from 'redux-persist';

import reducer from './slices';

const persistConfig = {
  key: 'wallet',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, FLUSH],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
