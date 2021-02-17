export const SaveUserInfo = (state,UserInfo) => {
  if(UserInfo){
    state.UserInfo = UserInfo.admin
    state.UserToken = UserInfo.token
    localStorage.setItem('userInfo',JSON.stringify(UserInfo.admin))
    localStorage.setItem('userToken',UserInfo.token)
  }else if(UserInfo === null) {
    localStorage.setItem('userInfo','')
    localStorage.setItem('userToken','')
    state.UserInfo = ''
    state.UserToken = ''
  }
}

export const SaveJurisdiction = (state,UserJurisdiction) => {

}

