import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export function calculateDeliveryDate(deliveryOption){
   const today=dayjs();
    const deliverydate=today.add(deliveryOption.deliveryDays,'days');
    return deliverydate.format('dddd,MMMM D');
  }


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
   PriceCents: "299"

},{
   id:"3",
   deliveryDays:2,
   PriceCents: "499"
}];