export function getdeliveryoption(deliverOptionId){
   let deliveryoption;
  deliveryOptions.forEach((option)=>{
    if(option.id===deliverOptionId){
      deliveryoption=option;
    }
  });
  return deliveryoption||deliveryOptions[0];
}
export const deliveryOptions=[
  {
   id:"1",
   deliveryDays: 7,
   PriceCents: "0"
  
},{
  id:"2",
   deliveryDays: 3,
   PriceCents: "499"

},{
    id:"3",
   deliveryDays:2,
   PriceCents: "399"
}];