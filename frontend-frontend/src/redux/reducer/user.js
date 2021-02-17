//const init = JSON.parse(localStorage.getItem('User')) === null ? {id : ''} : JSON.parse(localStorage.getItem('User'))
const init = JSON.parse(localStorage.getItem("UserInfo"));


export default (state = init, action) => {
  switch (action.type) {
    case "USER_INFO":
      return action.user;
    default:
      return state;
  }
};
