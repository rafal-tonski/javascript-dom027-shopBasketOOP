class Basket {
  constructor() {
    this.items = this.loadBasketFromLocalStorage() || [];
  }

  add(item) {
    this.items.push(item);
    this.saveBasketInLocalStorage();
  }

  clear() {
    this.items = [];
    this.saveBasketInLocalStorage();
  }

  getTotalValue() {
    return this.items.reduce((prev, item) => prev + item.price, 0);
  }

  getSummaryOfBasket() {
    return this.items.map((item, i) => {
      return {
        id: i + 1,
        text: `${i + 1}) ${item.name} - ${item.price.toFixed(2)} zł`,
      };
    });
  }

  removeProduct(no) {
    this.items.splice(no - 1, 1);
    this.saveBasketInLocalStorage();
  }

  saveBasketInLocalStorage() {
    localStorage.setItem("current-basket", JSON.stringify(this.items));
  }

  loadBasketFromLocalStorage() {
    return JSON.parse(localStorage.getItem("current-basket"));
  }
}

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  setNewPrice(newPrice) {
    this.price = newPrice;
  }
}
