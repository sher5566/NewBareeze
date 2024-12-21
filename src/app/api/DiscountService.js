class DiscountServiceClass {
  constructor() {
    this.STORAGE_KEY = "PRODUCT_DISCOUNT";
  }

  // Get current global discount
  getCurrentDiscount() {
    if (typeof window === "undefined") return "0";
    return localStorage.getItem(this.STORAGE_KEY) || "0";
  }

  // Set global discount
  setGlobalDiscount(discountPercentage) {
    if (typeof window === "undefined") return false;
    try {
      localStorage.setItem(this.STORAGE_KEY, discountPercentage);
      return true;
    } catch (error) {
      console.error("Error setting discount:", error);
      return false;
    }
  }

  // Apply discount to products
  applyDiscountToProducts(products) {
    const discount = this.getCurrentDiscount();
    const updatedProducts = {
      ...products,
      productList: {
        ...products.productList,
        Products: products.productList.Products.map((product) => ({
          ...product,
          Discount: `${discount}%`,
        })),
      },
    };
    return updatedProducts;
  }

  // Get updated product data with current discount
  getDiscountedProducts() {
    const { productsApi } = require("../utils/data/api");
    return this.applyDiscountToProducts(productsApi);
  }
}

const DiscountService = new DiscountServiceClass();
export default DiscountService;
