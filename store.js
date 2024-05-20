const $ = document;

let allProducts = [
  {
    id: 1,
    title: "Album 1",
    price: 12,
    img: "Images/Album 1.png",
    count: 1,
  },
  { id: 2, title: "Album 2", price: 21, img: "Images/Album 2.png", count: 1 },
  { id: 3, title: "Album 3", price: 33, img: "Images/Album 3.png", count: 1 },
  {
    id: 4,
    title: "Album 4",
    price: 41,
    img: "Images/Album 4.png",
    count: 1,
  },
  { id: 5, title: "Coffee", price: 5, img: "Images/Cofee.png", count: 1 },
  { id: 6, title: "Shirt", price: 36, img: "Images/Shirt.png", count: 1 },
];

let shopBasketArray = [];

let containerSection = $.querySelector(".shop-items");
let mainCartContainer = $.querySelector(".cart-items");
let totalElem = $.querySelector(".cart-total-price");
let purchaseBtn = $.querySelector("#purchase-button");
let totalPriceElem = $.querySelector(".cart-total-price");

allProducts.forEach(function (product) {
  let newSpan = $.createElement("span");
  newSpan.innerHTML = product.title;
  newSpan.classList.add("shop-item-title");

  let imgElem = $.createElement("img");
  imgElem.classList.add("shop-item-image");
  imgElem.setAttribute("src", product.img);

  let divDetails = $.createElement("div");
  divDetails.classList.add("shop-item-details");

  let divShopItem = $.createElement("div");
  divShopItem.classList.add("shop-item");

  let newSpanPrice = $.createElement("span");
  newSpanPrice.innerHTML = "$" + product.price;
  newSpanPrice.classList.add("shop-item-price");

  let addToCartBtn = $.createElement("button");
  addToCartBtn.className = "btn btn-primary shop-item-button";
  addToCartBtn.setAttribute("type", "button");
  addToCartBtn.innerHTML = "ADD TO CART";
  addToCartBtn.addEventListener("click", function () {
    addProductToBasket(product.id);
  });

  divShopItem.append(newSpan, imgElem, divDetails);
  divDetails.append(newSpanPrice, addToCartBtn);
  containerSection.append(divShopItem);
});

function addProductToBasket(productId) {
  let userProduct = allProducts.find(function (product) {
    return product.id === productId;
  });

  var isProductInBasket = shopBasketArray.some(function (product) {
    return product.id === productId;
  });

  if (isProductInBasket) {
    userProduct.count++;
    basketGenerator(shopBasketArray);
    totalPriceCalc(shopBasketArray);
  } else {
    shopBasketArray.push(userProduct);
    basketGenerator(shopBasketArray);
    totalPriceCalc(shopBasketArray);
  }
}

function basketGenerator(basketArray) {
  mainCartContainer.innerHTML = "";

  basketArray.forEach(function (product) {
    let cartImgElem = $.createElement("img");
    cartImgElem.className = "cart-item-image";
    cartImgElem.setAttribute("src", product.img);
    cartImgElem.setAttribute("width", "100");
    cartImgElem.setAttribute("height", "100");

    let cartNewSpan = $.createElement("span");
    cartNewSpan.innerHTML = product.title;
    cartNewSpan.classList.add("cart-item-title");

    let divCart = $.createElement("div");
    divCart.className = "cart-item cart-column";

    let cartSpanPrice = $.createElement("span");
    cartSpanPrice.className = "cart-price cart-column";
    cartSpanPrice.innerHTML = "$" + product.price;

    let divQuantity = $.createElement("div");
    divQuantity.className = "cart-quantity cart-column";

    let cartInput = $.createElement("input");
    cartInput.className = "cart-quantity-input";
    cartInput.setAttribute("type", "number");
    cartInput.setAttribute("value", product.count);
    cartInput.setAttribute("min", "1");
    cartInput.addEventListener("change", function () {
      changeProductNumber(product.id, cartInput.value);
    });

    let removeBtn = $.createElement("button");
    removeBtn.className = "btn btn-danger";
    removeBtn.setAttribute("type", "button");
    removeBtn.innerHTML = "REMOVE";
    removeBtn.addEventListener("click", function () {
      removeProductFromBasket(product.id);
      totalPriceCalc(shopBasketArray);
    });

    let cartRowContainer = $.createElement("div");
    cartRowContainer.classList.add("cart-row");

    divCart.append(cartImgElem, cartNewSpan);
    mainCartContainer.append(cartRowContainer);
    divQuantity.append(cartInput, removeBtn);
    cartRowContainer.append(divCart, cartSpanPrice, divQuantity);
  });
}
function removeProductFromBasket(productId) {
  shopBasketArray = shopBasketArray.filter(function (product) {
    return product.id !== productId;
  });

  basketGenerator(shopBasketArray);
}

purchaseBtn.addEventListener("click", function () {
  shopBasketArray = [];
  basketGenerator(shopBasketArray);
  totalPriceCalc(shopBasketArray);
});

function totalPriceCalc(shopBasketArray) {
  let sum = 0;
  shopBasketArray.forEach(function (product) {
    let rowPrice = product.count * product.price;
    sum += rowPrice;
  });
  totalElem.innerHTML = sum;
}

function changeProductNumber(productId, newCount) {
  shopBasketArray.forEach(function (product) {
    if (product.id === productId) {
      product.count = newCount;
    }
  });
  totalPriceCalc(shopBasketArray);
}
