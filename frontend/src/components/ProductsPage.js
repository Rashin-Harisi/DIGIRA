import React from 'react'
import ProductCardInHomePage from './ProductCardInHomePage';
import useProducts from "../hooks/useProducts"


const ProductsPage = ({user}) => {
  //console.log(user)
  const products = useProducts();
  return (
    <div>
        {products?.length !== 0 && user ? (
          <div className="flex gap-5 flex-wrap justify-around">
            {products && products.map((product,index) => (
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