import { create } from "zustand";
import { totalQuantity } from "../utils/functions";


const cartStore = create((set,get)=>({
    cart : JSON.parse(localStorage.getItem("cart")) || {},
    quantity : 0,
    
    
    updateQuantity: (userEmail) => {
        const userCart = get().cart[userEmail] || {};
        const newQuantity =totalQuantity(userCart)
        set({ quantity: newQuantity });
      },

    addToCart: (userEmail, productId)=>{
        const prevCart = get().cart;
        const newCart = { ...prevCart, [userEmail]: { ...prevCart[userEmail] } };

        if(!newCart[userEmail]){
            newCart[userEmail] = {}
        }
        if(!newCart[userEmail][productId]){
            newCart[userEmail][productId] = 1;

        }else{
            newCart[userEmail][productId]++
        }
        localStorage.setItem("cart",JSON.stringify(newCart))
        set({cart: newCart})
        get().updateQuantity(userEmail);
        console.log("Updated cart in Zustand:", newCart);
    },
    increase: (userEmail, productId)=>{
        const prevCart = get().cart;
        const newCart = { ...prevCart, [userEmail]: { ...prevCart[userEmail] } };

        newCart[userEmail][productId]++;
        localStorage.setItem("cart",JSON.stringify(newCart))
        set({cart : newCart})
        get().updateQuantity(userEmail);
        console.log("Updated cart in Zustand(increase):", newCart);
    },
    decrease: (userEmail, productId)=>{
        const prevCart = get().cart;
        const newCart = { ...prevCart, [userEmail]: { ...prevCart[userEmail] } };

        newCart[userEmail][productId]--;
        localStorage.setItem("cart",JSON.stringify(newCart))
        set({cart: newCart})
        get().updateQuantity(userEmail);
        console.log("Updated cart in Zustand(decrease):", newCart);
    },
    deleteFromCart: (userEmail,productId)=>{
        const prevCart = get().cart;
        const newCart = { ...prevCart, [userEmail]: { ...prevCart[userEmail] } };
        
        delete newCart[userEmail][productId]
        localStorage.setItem("cart",JSON.stringify(newCart))
        set({cart: newCart})
        get().updateQuantity(userEmail);
        console.log("Updated cart in Zustand(delete):", newCart);
    },
    clearCart:(userEmail)=>{
        const prevCart = get().cart;
        const newCart = { ...prevCart };

        if (newCart[userEmail]) {
          delete newCart[userEmail];
          localStorage.setItem("cart", JSON.stringify(newCart));
          set({ cart:newCart })
          set({quantity: 0})
        };
    },
    getCartForUser:(userEmail)=>{
        return get().cart[userEmail] || {}
    }

}))

export default cartStore;