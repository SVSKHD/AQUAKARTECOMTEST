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
        payload: productData,
      });
      AquaToast("SuccessFully Added to Cart", "success");
      setCartAdd(true);
    } else {
      // Product is already in the cart, remove it
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: productData?._id,
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
      setFavAdd(true); // Update the state to reflect the addition
    } else {
      dispatch({
        type: "REMOVE_FROM_FAV",
        payload: productData?._id,
      });
      AquaToast("Successfully removed from Favorites", "info");
      setFavAdd(false); // Update the state to reflect the removal
    }
  };

  const cartTotal = () => {
    return cartCount.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
  };

  return {
    addProductToCart,
    addProductToFav,
    cartTotal,
  };
};

export default ProductFunctions;
