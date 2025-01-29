import React from 'react'

const SellerList = () => {
    const sellers = [{
        "_id": {
          "$oid": "6790c3b59bb2829f2cf386f4"
        },
        "role": "BUSINESS_MAN",
        "isVerified": true,
        "createdAt": {
          "$date": "2025-01-22T10:08:53.117Z"
        },
        "receive_payments": [],
        "name": "Rara Co.",
        "username": "rara",
        "email": "rara.myapps@gmail.com",
        "phone": 123456789,
        "business_number": 1254,
        "address": "Wien",
        "password": "$2b$12$8bHcMAjqLaEcExYosWC3euWNFLX7N/Pi.QfnNKl.NI51xbF7wYG1G"
      }]
  return (
    <div>{sellers.map((seller)=><li>{seller.name}</li>)}</div>
  )
}

export default SellerList