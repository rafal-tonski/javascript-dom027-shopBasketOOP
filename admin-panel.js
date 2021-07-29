const newProductForm = document.querySelector("form");
const nameOfProduct = document.querySelector("input[type=text]");
const priceOfProduct = document.querySelector("input[type=number]");
const productsList = document.querySelector(".products-list");

// console.log(submitToaddNewProduct);

const saveProductsToLocalStorage = (name, price) => {
  const productsList = JSON.parse(localStorage.getItem("shop-products")) ?? [];
  productsList.push({ name, price });

  localStorage.setItem("shop-products", JSON.stringify(productsList));
};

const addNewProductToShop = (newProduct, newPrice) => {
  const newLi = document.createElement("li");
  const newStrong = document.createElement("strong");
  newStrong.innerText = newProduct;
  const newPriceText = document.createTextNode(` - ${newPrice.toFixed(2)} `);
  const newButton = document.createElement("button");
  newButton.classList.add("btn-buy-product");
  newButton.setAttribute("data-name", newProduct);
  newButton.setAttribute("data-price", String(newPrice));
  newButton.textContent = "Kup!";
  newButton.addEventListener("click", addProductToBasket);

  newLi.appendChild(newStrong);
  newLi.appendChild(newPriceText);
  newLi.appendChild(newButton);
  productsList.appendChild(newLi);
};

const loadProductsFromLocalStorage = () => {
  const productsList = JSON.parse(localStorage.getItem("shop-products")) ?? [];
  for (const { name, price } of productsList) {
    addNewProductToShop(name, price);
  }
};

const handleNewProductForm = (e) => {
  e.preventDefault();

  const name = nameOfProduct.value;
  const price = Number(priceOfProduct.value);

  addNewProductToShop(name, price);
  saveProductsToLocalStorage(name, price);

  nameOfProduct.value = "";
  priceOfProduct.value = "";
};

newProductForm.addEventListener("submit", handleNewProductForm);

loadProductsFromLocalStorage();
