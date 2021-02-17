import { getPostsApi, getPostDetailApi } from "../../api/index";

export const getAllPosts = (newsReq) => {
  return async (dispatch) => {
    dispatch({ type: "POST_LOADING", loading: true });
    const { page } = newsReq;
    if (page) {
      newsReq.page -= 1;
    }
    const res = await getPostsApi(newsReq);
    dispatch({ type: "SAVE_ALLPOSTS", allPosts: res.data });
    dispatch({ type: "POST_LOADING", loading: false });
  };
};

export const getPostDetail = (id) => {
  return async (dispatch) => {
    dispatch({ type: "POST_LOADING", loading: true });
    const res = await getPostDetailApi(id);
    dispatch({ type: "SAVE_POSTDETAIL", postDetail: res.data });
    dispatch({ type: "POST_LOADING", loading: false });
  };
};

export const savePostsPage = (page) => {
  return async (dispatch) => {
    dispatch({ type: "SAVE_POSTS_PAGE", page });
  };
};
