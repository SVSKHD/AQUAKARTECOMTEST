import { useSelector, useDispatch } from "react-redux";
import AquaToast from "@/reusables/js/toast";

const ProductFunctions = () => {
  const dispatch = useDispatch();
  const { cartCount, favCount } = useSelector((state) => ({ ...state }));
  const addProductToCart = (productData, setCartAdd) => {
    const isProductInCart = cartCount.some(
      (item) => item._id === productData?._id,
    );

    if (!isProductInCart) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {...productData,quantity:1},
      });
      AquaToast("SuccessFully Added to Cart", "success");
      setCartAdd(true);
    } else {
      // Product is already in the cart, remove it
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: productData?._id 
      });
      AquaToast("Successfully removed from cart", "info");
      setCartAdd(false);
    }
  };

  const addProductToFav = (productData, setFavAdd) => {
    const isProductInFav = favCount.some(
      (item) => item._id === productData?._id,
    );

    if (!isProductInFav) {
      dispatch({
        type: "ADD_TO_FAV",
        payload: productData,
      });
      AquaToast("Successfully added to Favorites", "success");
    } else {
      dispatch({
        type: "REMOVE_FROM_FAV",
        payload: productData?._id,
      });
      AquaToast("Successfully removed from Favorites", "info");
    }
  };

  const cartTotal = (cart) => {
    return cart?.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const quantityChange = (productId, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, quantity },
    });
  };

  const QuantityAdd = (product) => {
    const productmatch = cartCount.find((item) => item._id === product._id);
    if (productmatch) {
      const newQuantity =
        productmatch.quantity < 5 ? productmatch.quantity + 1 : 5;
      if (newQuantity === 5) {
        AquaToast("You can only add up to 5", "info");
      }
      quantityChange(product._id, newQuantity); // Use productmatch.quantity for clarity
    } else {
      // Ensure the product object structure matches what addProductToCart expects
      addProductToCart({ ...product, quantity: 1 });
    }
  };

  const QuantitySub = (product) => {
    const productmatch = cartCount.find((item) => item._id === product._id);
    if (productmatch && productmatch.quantity > 1) {
      // Check if quantity is greater than 1
      const newQuantity = Math.max(productmatch.quantity - 1, 1);
      quantityChange(product._id, newQuantity);
    } else if (productmatch) {
      // Consider if you want to remove the item from the cart if its quantity goes to 1
      AquaToast("Cannot reduce quantity below 1", "info");
    } else {
      AquaToast("Product is not in the cart", "info");
    }
  };

  return {
    addProductToCart,
    addProductToFav,
    cartTotal,
    quantityChange,
    QuantityAdd,
    QuantitySub,
  };
};

export default ProductFunctions;
