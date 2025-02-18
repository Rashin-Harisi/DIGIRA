import React from 'react'
import ProductCardInHomePage from './ProductCardInHomePage';

const products = [
  {
    _id: "67979e8cb38783c7a6092394",
    stars: ["678d07aeb4d06a4bd426bbc2"],
    name: ["Kid bag", "Kid bag"],
    company: ["Rara comapny"],
    images: [
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
    ],
    colors: ["red,blue,black"],
    details: ["It is waterproof"],
    createdAt: "2025-01-27T14:56:12.339Z",
    sellerId: "6790c3b59bb2829f2cf386f4",
    price: "20",
    discount: "0",
    status: "waiting",
    __v: 0,
  },
  {
    _id: "67979e8cb38783c7a6092395",
    stars: [],
    name: ["Kid bag", "Kid bag"],
    company: ["Rara comapny"],
    images: [
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
    ],
    colors: ["red,blue,black"],
    details: ["It is waterproof"],
    createdAt: "2025-01-27T14:56:12.339Z",
    sellerId: "6790c3b59bb2829f2cf386f4",
    price: "20",
    discount: "10",
    status: "waiting",
    __v: 0,
  },
  {
    _id: "67979e8cb38783c7a6092396",
    stars: [],
    name: ["Kid bag", "Kid bag"],
    company: ["Rara comapny"],
    images: [
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
    ],
    colors: ["red,blue,black"],
    details: ["It is waterproof"],
    createdAt: "2025-01-27T14:56:12.339Z",
    sellerId: "6790c3b59bb2829f2cf386f4",
    price: "20",
    discount: "10",
    status: "waiting",
    __v: 0,
  },
  {
    _id: "6797a194b38783c7a6092408",
    stars: [],
    name: ["Mobile ", "Mobile "],
    company: ["Mumbai"],
    images: [
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",

    ],
    colors: ["red,blue,black"],
    details: ["It is cheep one that you can find."],
    createdAt: "2025-01-27T15:09:08.199Z",
    sellerId: "6790c3b59bb2829f2cf386f4",
    price: "400",
    discount: "5",
    status: "waiting",
    __v: 0,
  },
  {
    _id: "6797a194b38783c7a6092407",
    stars: ["678d07aeb4d06a4bd426bbc2"],
    name: ["Mobile ", "Mobile "],
    company: ["Mumbai"],
    images: [
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      
    ],
    colors: ["red,blue,black"],
    details: ["It is cheep one that you can find."],
    createdAt: "2025-01-27T15:09:08.199Z",
    sellerId: "6790c3b59bb2829f2cf386f4",
    price: "400",
    discount: "0",
    status: "waiting",
    __v: 0,
  },
  {
    _id: "6797a194b38783c7a6092406",
    stars: [],
    name: ["Mobile ", "Mobile "],
    company: ["Mumbai"],
    images: [
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
    ],
    colors: ["red,blue,black"],
    details: ["It is cheep one that you can find."],
    createdAt: "2025-01-27T15:09:08.199Z",
    sellerId: "6790c3b59bb2829f2cf386f4",
    price: "400",
    discount: "5",
    status: "waiting",
    __v: 0,
  },
  {
    _id: "6797a194b38783c7a6092405",
    stars: ["678d07aeb4d06a4bd426bbc2"],
    name: ["Mobile ", "Mobile "],
    company: ["Mumbai"],
    images: [
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
    ],
    colors: ["red,blue,black"],
    details: ["It is cheep one that you can find."],
    createdAt: "2025-01-27T15:09:08.199Z",
    sellerId: "6790c3b59bb2829f2cf386f4",
    price: "400",
    discount: "5",
    status: "waiting",
    __v: 0,
  },
];
const ProductsPage = () => {
  //const products = useProducts(); 
  return (
    <div>
        {products?.length !== 0 ? (
          <div className="flex gap-5 flex-wrap justify-around">
            {products.map((product,index) => (
              <ProductCardInHomePage  key={index} product={product} />
            ))}
          </div>
        ) : (
          "Loading..."
        )}
    </div>
  )
}

export default ProductsPage