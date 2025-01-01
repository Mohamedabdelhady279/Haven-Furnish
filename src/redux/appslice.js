import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    
    Products:[],
    favorites: [], // قائمة المفضلة
    userinfo:null,
    subtotal: 0, // المجموع الكلي
    discount: 0, // حقل الخصم


}


export const appslice=createSlice({
    name:'E-commerce',
    initialState,
    reducers:{
        addtocart:(state,action) => {
            const item=state.Products.find((item)=>item.id===action.payload.id)
            if(item){
                item.quantity+=action.payload.quantity
            }else{
                state.Products.push(action.payload)
            }
            state.subtotal = state.Products.reduce((total, product) => total + product.price * product.quantity, 0);
            state.discount = state.subtotal * 0.05; // حساب الخصم 10%

        },

        removefromcart:(state,action)=>{
            state.Products=state.Products.filter((item)=>item.id!==action.payload)
            state.subtotal = state.Products.reduce((total, product) => total + product.price * product.quantity, 0);
            state.discount = state.subtotal * 0.05; // حساب الخصم 10%

        },


        increment:(state,action)=>{
      const item=state.Products.find((item)=>item.id===action.payload)
      item.quantity++
      state.subtotal = state.Products.reduce((total, product) => total + product.price * product.quantity, 0);
      state.discount = state.subtotal *0.05; // حساب الخصم 10%

         
        },

        decrement:(state,action)=>{
            const item=state.Products.find((item)=>item.id===action.payload)
            if(item.quantity===1){
                item.quantity=1

            }else{
                item.quantity--
            }
            state.subtotal = state.Products.reduce((total, product) => total + product.price * product.quantity, 0);
            state.discount = state.subtotal * 0.05; // حساب الخصم 10%

        },

      


        favorites: (state, action) => {
            const existingItem = state.favorites.find((item) => item.id === action.payload.id);
            if (!existingItem) {
              state.favorites.push(action.payload);
            }
          },
          removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter((item) => item.id !== action.payload);
          },
        

        updateProducts: (state, action) => {
            state.Products = action.payload; // تحديث المنتجات بقائمة جديدة
            state.subtotal = state.Products.reduce((total, product) => total + product.price * product.quantity, 0);

        },

          setProducts: (state, action) => {
            state.Products = action.payload; // تعيين المنتجات المخزنة من localStorage إلى الـ Redux state
            state.subtotal = state.Products.reduce((total, product) => total + product.price * product.quantity, 0);
  
        },

          
          setuser:(state,action)=>{
            state.userinfo=action.payload
        },

        logout:(state) =>{ 
            state.userinfo=null
        },

    }
})
export const{addtocart,removefromcart,increment,decrement,favorites, removeFavorite,setuser,logout,updateProducts,setProducts}=appslice.actions;
export default appslice.reducer;
