import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function calculateDeliveryDate(deliveryOption) {
  const newDeliveryDays = skipWeekends(deliveryOption.deliveryDays);
  const today = dayjs();
  const deliveryDate = today.add(newDeliveryDays, "day");
  return deliveryDate.format("dddd, MMMM D");
}

export function skipWeekends(deliveryDays) {
  let daysToAdd = 0;      // total calendar days to add
  let addedDays = 0;      // actual delivery days counted

  while (addedDays < deliveryDays) {
    daysToAdd++;
    const nextDay = dayjs().add(daysToAdd, "day");
    const weekday = nextDay.format("dddd");

    if (weekday !== "Saturday" && weekday !== "Sunday") {
      addedDays++;
    }
  }

  return daysToAdd;
}

export function getdeliveryoption(deliveryOptionId) {
  return (
    deliveryOptions.find((option) => option.id === String(deliveryOptionId)) ||
    deliveryOptions[0]
  );
}

export const deliveryOptions = [
  { id: "1", deliveryDays: 7, priceCents: "0" },
  { id: "2", deliveryDays: 3, priceCents: "299" },
  { id: "3", deliveryDays: 2, priceCents: "499" },
];
