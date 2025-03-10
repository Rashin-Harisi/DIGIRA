import React, { useEffect, useState } from 'react'
import ProductCardInAdminPage from './ProductCardInAdminPage';
import useProducts from '../hooks/useProducts';

const WaitingList = () => {
  const {products}= useProducts();
  const waiting_list_products = products?.filter((product)=>product.status === "waiting")
  const [sellers,setSellers] = useState(null)
  
  const sellerInfo = (id)=>{
    return sellers && sellers.filter((seller)=>seller._id === id)
  }

  useEffect(()=>{
    const sellerInfo = async()=>{
      const response = await fetch("http://localhost:5001/getSellers");
      const data = await response.json();
      if(data.success){
        setSellers(data.data)
      }
   }
   sellerInfo()
  },[])
      
  return (
    <div>
        {waiting_list_products?.length !== 0 ? (<div className='w-[90%] mx-auto mt-5 flex flex-col gap-5'>
           {waiting_list_products?.map ((product,index)=> <ProductCardInAdminPage key={index} product={product} seller={sellerInfo(product.sellerId)}/>)}
        </div>): "Waiting list is empty"}
    </div>
  )
}

export default WaitingList