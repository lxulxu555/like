const init = {
  page: 1,
  newsPage: 1,
  postsPage: 1,
};

export default (state = init, action) => {
  switch (action.type) {
    case "SAVE_PRODUCT_PAGE":
      return { ...init, page: action.page };
    case "SAVE_NEWS_PAGE":
      return { ...init, newsPage: action.page };
    case "SAVE_POSTS_PAGE":
      return { ...init, postsPage: action.page };
    default:
      return state;
  }
};
