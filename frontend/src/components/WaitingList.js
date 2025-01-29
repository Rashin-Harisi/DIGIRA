import React from 'react'
import ProductCardInAdminPage from './ProductCardInAdminPage';

const WaitingList = () => {
    const products =[
        {
          "_id": "67979e8cb38783c7a6092394",
          "stars": [],
          "name": [
            "Kid bag",
            "Kid bag"
          ],
          "company": [
            "Rara comapny"
          ],
          "images": [
            "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
             "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
              "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
              "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg"
            
          ],
          "colors": [
            "red,blue,black"
          ],
          "details": [
            "It is waterproof"
          ],
          "createdAt": "2025-01-27T14:56:12.339Z",
          "sellerId": "6790c3b59bb2829f2cf386f4",
          "price": "20",
          "discount": "10",
          "storage_quantity": "5",
          "status": "waiting",
          "__v": 0
        },
        {
          "_id": "6797a194b38783c7a6092408",
          "stars": [],
          "name": [
            "Mobile ",
            "Mobile "
          ],
          "company": [
            "Mumbai"
          ],
          "images": [
            "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
            "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg"
          ],
          "colors": [
            "red,blue,black"
          ],
          "details": [
            "It is cheep one that you can find."
          ],
          "createdAt": "2025-01-27T15:09:08.199Z",
          "sellerId": "6790c3b59bb2829f2cf386f4",
          "price": "400",
          "discount": "5",
          "storage_quantity": "5",
          "status": "waiting",
          "__v": 0
        }
      ]
      
      /*
    const [products, setProducts] = useState([])
    console.log(products)
    useEffect(()=>{
        const getProducts = async()=>{
            const response = await fetch("http://localhost:5000/getProducts")
            const data = await response.json()
            if(data.success){
                setProducts(data.data)
            }else{
                console.log("Something went wrong in getting all products")
            }
        }
        getProducts()
    },[])
    */
  return (
    <div>
        {products.length !== 0 ? (<div className='w-[90%] mx-auto mt-5 flex flex-col gap-5'>
           {products.map ((product,index)=> <ProductCardInAdminPage key={index} product={product}/>)}
        </div>): "Loading..."}
    </div>
  )
}

export default WaitingList