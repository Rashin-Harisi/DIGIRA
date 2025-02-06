export function calculatePrice (price,discount){
    return price - ((price*discount)/100)
}


export const getRandomProducts = (productArray, count) => {
    return [...productArray]
      .sort(() => Math.random() - 0.5) 
      .slice(0, count); 
  };