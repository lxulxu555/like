const menuList = [
  {
    title : '用户管理',
    key : '/user',
    icon : 'el-icon-user-solid',
  },
  {
    title : '分类管理',
    key : '/class',
    icon : 'el-icon-crop',
  },
  {
    title : '首页轮播管理',
    key : '/carousel',
    icon : 'el-icon-picture',
  },
  {
    title : '土特产',
    key : '/products',
    icon : 'el-icon-s-goods',
    children : [
      {
        title : '资讯管理',
        key : '/news',
      },
      {
        title : '土特产管理',
        key : '/product',
      }
    ]
  },
  {
    title : '帖子管理',
    key : '/post',
    icon : 'el-icon-notebook-2',
  },
  {
    title : '消息管理',
    key : '/msg',
    icon : 'el-icon-chat-dot-square'
  }
]

export default menuList
