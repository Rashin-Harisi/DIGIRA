export function calculatePrice (price,discount){
    return price - ((price*discount)/100)
}


export const getRandomProducts = (productArray, count) => {
    return [...productArray]
      .sort(() => Math.random() - 0.5) 
      .slice(0, count); 
  };


export const totalQuantity = (cart)=>{
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

}