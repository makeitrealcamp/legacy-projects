import { configureStore } from '@reduxjs/toolkit'
import UserInfoSlice from './UserInfo.Slice';
import ShopCoursesSlice from './ShopCourses.Slice';

export const store = configureStore({
  reducer: {
    UserInfo:UserInfoSlice,
    ShopCourses:ShopCoursesSlice
  },
})