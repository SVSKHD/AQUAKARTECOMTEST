// cartReducer.js

// Initial state loaded from local storage or set to an empty array
let initialState = [];
if (typeof window !== "undefined") {
  const storedCart = localStorage.getItem("cart");
  initialState = storedCart ? JSON.parse(storedCart) : [];
}

// Reducer function for cart operations
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Check if the item already exists in the cart
      const itemIndex = state.findIndex(item => item._id === action.payload._id);
      if (itemIndex >= 0) {
        // Item already exists - for simplicity, just returning the current state
        return state;
      } else {
        // Item doesn't exist, add it to the cart
        const newState = [...state, action.payload];
        // Update local storage with the new cart state
        localStorage.setItem("cart", JSON.stringify(newState));
        return newState;
      }

    // Implement additional cases as needed (e.g., REMOVE_FROM_CART, UPDATE_CART_ITEM)

    default:
      return state;
  }
};
