const basket = new Basket();
const basketList = document.querySelector("ul.basket-list");
const buyBtns = [...document.querySelectorAll("[data-name]")];
const buyAllBtn = document.querySelector(".buy-all");

const removeItem = (e) => {
  const id = Number(e.target.dataset.id);
  basket.removeProduct(id);
  createBasketUi();
};

const createBasketUi = () => {
  basketList.innerText = "";

  for (const { text, id } of basket.getSummaryOfBasket()) {
    const newLi = document.createElement("li");
    newLi.innerText = text;
    newLi.addEventListener("click", removeItem);
    newLi.dataset.id = id;
    basketList.appendChild(newLi);
    // console.log(basket.getSummaryOfBasket());
  }

  const basketTotalValue = basket.getTotalValue();
  buyAllBtn.innerText = `Złóż zamówienie na kwotę ${basketTotalValue.toFixed(
    2
  )} zł`;
  buyAllBtn.disabled = basketTotalValue === 0;

  // console.log(basketTotalValue);
};

const addProductToBasket = (e) => {
  const name = e.target.dataset.name;
  const price = Number(e.target.dataset.price);

  const newProduct = new Product(name, price);
  basket.add(newProduct);
  createBasketUi();
};

const buyAllProducts = () => {
  alert(`Kupiłeś produkty o wartości  ${basket.getTotalValue().toFixed(2)}`);
  basket.clear();
  createBasketUi();
};

for (const btn of buyBtns) {
  btn.addEventListener("click", addProductToBasket);
}

buyAllBtn.addEventListener("click", buyAllProducts);
createBasketUi();
