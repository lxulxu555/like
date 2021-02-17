const init = {
  allPosts: [],
  postDetail: {},
  loading: true,
};

export default (state = init, action) => {
  switch (action.type) {
    case "SAVE_ALLPOSTS":
      return { ...state, allPosts: action.allPosts };
    case "SAVE_POSTDETAIL":
      return { ...state, postDetail: action.postDetail };
    case "POST_LOADING":
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};
