import { productsApi } from "../utils/data/api";
import DiscountService from "./DiscountService";

class ProductServiceClass {
  getProducts() {
    try {
      // Get products with current discount applied
      const discountedProducts = DiscountService.getDiscountedProducts();

      return {
        success: true,
        data: discountedProducts.productList,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to get products",
      };
    }
  }
}

const ProductService = new ProductServiceClass();
export default ProductService;
