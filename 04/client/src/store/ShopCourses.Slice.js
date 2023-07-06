import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    itemShop:JSON.parse(localStorage.getItem("CoursesShop")) || []
}

export const shopCourses = createSlice({
  name: 'ShopCourses',
  initialState,
  reducers: {
    addItemShop:(state,action)=>{
      state.itemShop.unshift(action.payload)
    },
    deleteItemShop:(state,action)=>{
      state.itemShop = state.itemShop.filter((item)=> item.id !== action.payload.id)
      console.log('action.payload', action.payload)
      console.log("borrado item del shop")
    }


  }
})



export const { addItemShop , deleteItemShop } = shopCourses.actions

export default shopCourses.reducer