import {
  reqFindIdProduct,
  reqSaveComment,
  reqReplayComment,
  reqLikeComment,
  reqAddProduct,
  reqUpdateProduct,
  reqDeleteProduct,
  getClassApi,
  getProductApi,
  getCarouselApi,
  getProductDetailApi,
} from "../../api";
import { message } from "antd";
import store from "../store";

export const GetAllClass = () => {
  return async (dispatch) => {
    const res = await getClassApi();
    dispatch({
      type: "SAVE_ALLCLASS",
      allClass: res.data,
    });
  };
};

export const GetAllProduct = (productReq) => {
  return async (dispatch) => {
    dispatch({ type: "PRODUCT_LOADING", loading: true });
    productReq.page -= 1;
    const res = await getProductApi(productReq);
    dispatch({ type: "PRODUCT_ALL", allProduct: res.data });
    dispatch({ type: "PRODUCT_LOADING", loading: false });
  };
};

export const getAllCarousel = async () => {
  const res = await getCarouselApi();
  return res.data;
};

export const GetProductDetail = (id) => {
  return async (dispatch) => {
    const res = await getProductDetailApi(id);
    dispatch({ type: "PRODUCT_DETAIL", productDetail: res.data });
    dispatch({ type: "PRODUCT_DETAIL_LOADING", loading: false });
  };
};

export const cleanProductDetail = () => {
  return async (dispatch) => {
    dispatch({ type: "PRODUCT_DETAIL", productDetail: { images: "" } });
    dispatch({ type: "PRODUCT_DETAIL_LOADING", loading: true });
  };
};

export const SendComment = async (content, postId) => {
  const res = await reqSaveComment(content, postId);
  const { msg } = res;
  message.success(msg);
};

export const ReplyComment = async (reply, callback) => {
  const res = await reqReplayComment(reply);
  const { msg } = res;
  message.success(msg);
  callback();
};

export const LikeComment = async (type, state) => {
  await reqLikeComment(type, state);
};

export const PutNewProduct = (values) => {
  return async (dispatch) => {
    await reqAddProduct(values);
    dispatch({ type: "SAVE_PRODUCT_IMAGE", imageList :[]});
    message.success("添加成功");
  };
};

export const SaveProductPage = (page) => {
  return async (dispatch) => {
    dispatch({
      type: "SAVE_PRODUCT_PAGE",
      page,
    });
  };
};

export const UpdateProductInfo = (condition, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await reqUpdateProduct(condition);
      if (res.code === 0) {
        message.success("更新成功");
        callback();
      } else {
        message.error(res.msg);
      }
    })();
  };
};

export const DeleteProduct = (id, callback) => {
  return (dispatch) => {
    (async () => {
      const res = await reqDeleteProduct(id);
      if (res.code === 0) {
        message.success("删除成功");
        callback();
      } else {
        message.error(res.msg);
      }
    })();
  };
};

export const SaveScroll = (scroll) => ({ type: "SAVE_PRODUCT_SCROLL", scroll });

export const SaveProductImage = (imageList) => ({
  type: "SAVE_PRODUCT_IMAGE",
  imageList,
});
