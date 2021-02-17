import http from '../api/http'


export const Login = ({commit}, UserInfo) => {
  commit('SaveUserInfo', UserInfo)
}

export const SaveJurisdiction = ({commit},User) => {
  const id = User.id
  http.get('user/findRoleById',{id},'get').then(res => {
    res.data.roleList.map(item => {
      item.permissionList.map(item => {
        if(item.url === 'role:perm'){
          console.log('没有角色和权限管理路由')
        }else if(item.url === 'user:role'){
          console.log('没有管理员路由')
        }
      })
    })
  })
//  commit('SaveJurisdiction',UserJurisdiction)
}

