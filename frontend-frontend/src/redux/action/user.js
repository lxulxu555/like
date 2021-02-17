import {
  reqLookUserReplay,
  reqUpdateUser,
  reqFindReplayByMe,
  loginApi,
  registerApi,
} from "../../api";
import store from "../store";

export const loginOutUser = () => {
  return async (dispatch) => {
    dispatch({
      type: "USER_INFO",
      user: "",
    });
    window.localStorage.removeItem("UserInfo");
    window.location.href = "/login";
  };
};

export const LoginUser = (loginReq) => {
  return async (dispatch) => {
    const res = await loginApi(loginReq);
    const { data } = res;
    const { user } = data;
    user.avatarUrl = !user.avatarUrl
      ? "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F16%2F99%2F42570527ee4ed5b.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615558862&t=9f1efc8bcd396346aa5d70e1bd423af4"
      : user.avatarUrl;
    window.localStorage.setItem("UserInfo", JSON.stringify(data));
    dispatch({
      type: "USER_INFO",
      user: data,
    });
    window.location.href = "/";
  };
};

export const register = async (registerReq) => {
  await registerApi(registerReq);
};

export const UserMessage = (id) => {
  return (dispatch) => {
    (async function () {
      const res = await reqLookUserReplay(id);
      dispatch({
        type: "USER_MESSAGE",
        message: res,
      });
    })();
  };
};

export const updateUser = (user, callback) => {
  return async (dispatch) => {
    const res = await registerApi(user);
    const { data } = res;
    //callback();
    window.localStorage.setItem("UserInfo", JSON.stringify(data));
    dispatch({ type: "USER_INFO", user: data });
  };
};

export const ReplayByMe = () => {
  return (dispatch) => {
    (async () => {
      const id = store.getState().user.id;
      const res = reqFindReplayByMe(id);
      if (res.code === 0) {
        dispatch({
          type: "USER_REPLAY_BY_ME",
          replay: res.data,
        });
      }
    })();
  };
};

export const UploadAvatarImage = (url) => ({
  type: "UPLOAD_AVATAR_IMAGE",
  image: url,
});
