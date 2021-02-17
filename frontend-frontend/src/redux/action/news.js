import { getNewsApi } from "../../api/index";

export const getAllNews = (newsReq) => {
  return async (dispatch) => {
    dispatch({ type: "NEWS_LOADING", loading: true });
    const { page } = newsReq;
    if (page) {
      newsReq.page -= 1;
    }
    const res = await getNewsApi(newsReq);
    dispatch({ type: "SAVE_ALLNEWS", allNews: res.data });
    dispatch({ type: "NEWS_LOADING", loading: false });
  };
};


export const saveNewsPage = (page) => {
  return async (dispatch) => {
    dispatch({ type: "SAVE_NEWS_PAGE", page });
  };
};
