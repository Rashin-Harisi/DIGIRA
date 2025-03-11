import { create } from "zustand";


const cartStore = create((set,get)=>({
    cart : JSON.parse(localStorage.getItem("cart")) || {},

    addToCart: (userEmail, productId)=>{
        const {cart} = get();
        if(!cart[userEmail]){
            cart[userEmail] = {}
        }
        if(!cart[userEmail][productId]){
            cart[userEmail][productId] = 1
        }else{
            cart[userEmail][productId] ++
        }
        localStorage.setItem("cart",JSON.stringify(cart))
        set({cart})
    },
    increase: (userEmail, productId)=>{
        const {cart} = get();
        cart[userEmail][productId] ++;
        localStorage.setItem("cart",JSON.stringify(cart))
        set({cart})
    },
    decrease: (userEmail, productId)=>{
        const {cart} = get();
        cart[userEmail][productId] --;
        localStorage.setItem("cart",JSON.stringify(cart))
        set({cart})
    },
    deleteFromCart: (userEmail,productId)=>{
        const {cart} = get();
        delete cart[userEmail][productId]
        localStorage.setItem("cart",JSON.stringify(cart))
        set({cart})
    },
    clearCart:(userEmail)=>{
        const { cart } = get();
        if (cart[userEmail]) {
          delete cart[userEmail];
          localStorage.setItem("cart", JSON.stringify(cart));
          set({ cart })
        };
    },
    getCartForUser:(userEmail)=>{
        return get().cart[userEmail] || {}
    }

}))

export default cartStore;