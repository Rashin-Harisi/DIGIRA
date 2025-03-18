import React from 'react'

const OrderCard = ({order}) => {
    const {deliveryInfo,items,status,totalPrice} = order
  return (
    <div className='pl-5 leading-loose border rounded-xl'>
        <p className='p_orderCard'>Date of Delivery : <span className='span_orderCard'>{deliveryInfo.date} </span></p>
        <p className='p_orderCard'>Time of Delivery : <span className='span_orderCard'>{deliveryInfo.time}</span> </p>
        <p className='p_orderCard'>Recepian Name:<span className='span_orderCard'> {deliveryInfo.name}</span></p>
        <p className='p_orderCard'>Recepaian Phone Number : <span className='span_orderCard'>{deliveryInfo.phone}</span></p>
        <p className='p_orderCard'>Address of delivery: <span className='span_orderCard'>{deliveryInfo.address}</span></p>
        <div>
            <p className='p_orderCard'>Items : </p>
            <ul className='pl-10'>
                {items.map((item,index)=>(
                    <li key={index} className='list-disc'><span className='span_orderCard'>{item.name} - {item.quantity}</span></li>
                ))}
            </ul>
        </div>
        <p className='p_orderCard'>Total Price : <span className='span_orderCard'>{totalPrice} <span> € </span></span></p>
        <p className='p_orderCard'>State of Payment : <span className='span_orderCard'>{status}</span></p>
    </div>
  )
}

export default OrderCard