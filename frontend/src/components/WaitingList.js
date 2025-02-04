import React from 'react'
import ProductCardInAdminPage from './ProductCardInAdminPage';
import useProducts from '../hooks/useProducts';

const WaitingList = () => {
  const products= useProducts();
  const waiting_list_products = products?.filter((product)=>product.status === "waiting")
      
      
  return (
    <div>
        {waiting_list_products?.length !== 0 ? (<div className='w-[90%] mx-auto mt-5 flex flex-col gap-5'>
           {waiting_list_products?.map ((product,index)=> <ProductCardInAdminPage key={index} product={product}/>)}
        </div>): "Loading..."}
    </div>
  )
}

export default WaitingList