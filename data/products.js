import { formatCurrency } from "../../Scripts/utils/money.js";

export const products = [];

export function getproduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return formatCurrency(this.priceCents);
  }

  extraInfo() {
    return ``;
  }
}

class Clothing extends Product {
  sizeChartLink;
  type = "clothing";

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfo() {
    return `<a href="${this.sizeChartLink}" target="_blank">Size Chart</a>`;
  }
}
export function loadProductsfetch(){
  const promise = fetch("https://supersimplebackend.dev/products").
  then((response)=>{
    return response.json().
    then((productsData)=>{
       const loadedProducts = productsData.map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });

    // ✅ Update exported products array
    products.length = 0;
    products.push(...loadedProducts);

    console.log("Products loaded:", products);

    })
   })
   return promise;
}
/*
loadProductsfetch().then(()=>{
  console.log("Products loaded via fetch:", products);
});
*/
export function loadProducts(callback) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    const loadedProducts = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });

    // ✅ Update exported products array
    products.length = 0;
    products.push(...loadedProducts);

    console.log("Products loaded:", products);

    callback();
  });

  xhr.open("GET", "https://supersimplebackend.dev/products");
  xhr.send();
}
