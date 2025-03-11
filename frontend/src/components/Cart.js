import React from 'react'
import cartStore from '../store/cartStore'
import useUser from '../hooks/useUser'

const Cart = () => {
  const getCart = cartStore((state)=>state.getCartForUser)
  const clearCart = cartStore((state)=>state.clearCart)
  const user = useUser()
  const userEmail = user?.email
  const cart = getCart(userEmail);
  //console.log(cart)
  return (
    <div>Cart</div>
  )
}

export default Cart