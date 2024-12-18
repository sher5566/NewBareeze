import { productsApi } from "../utils/data/api";

class ProductServiceClass {
  /**
   * Get all products from the dummy data
   * @returns {Object} Contains success status and products data
   */
  getProducts() {
    try {
      return {
        success: true,
        data: productsApi.productList,
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
