import React from 'react'
import ProductCardInHomePage from './ProductCardInHomePage';
import useProducts from "../hooks/useProducts"


const ProductsPage = ({user}) => {
  
  const {products} = useProducts();
  //console.log(products)
  return (
    <div>
        {products?.length !== 0 && user ? (
          <div className="flex flex-wrap justify-around gap-5">
            {products && products?.map((product,index) => (
              <ProductCardInHomePage  key={index} product={product} user={user} />
            ))}
          </div>
        ) : (
          "Loading..."
        )}
    </div>
  )
}

export default ProductsPage