const init = {
  allProduct: [],
  loading: false,
};

export default (state = init, action) => {
  switch (action.type) {
    case "PRODUCT_ALL":
      return { ...state, allProduct: action.allProduct };
    case "PRODUCT_LOADING":
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};
