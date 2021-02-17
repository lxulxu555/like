import http from './http'

//获取所有用户
export const getAllUser = (data) => {
  data.page -= 1
  return http.get('/api/admin', data).then(res => {
    return res.data.data
  })
}
//获取所有分类
export const getClassApi = () => {
  return http.get('/api/classify').then(res => {
    return res.data.data
  })
}
//添加分类
export const addClassApi = (data) => {
  return http.post('/api/classify/save',data).then(res => {
    return res.data
  })
}
//更新分类
export const updateClassApi = (data) => {
  return http.put('/api/classify/update',data).then(res => {
    return res.data
  })
}
//添加用户
export const addUser = (data) => {
  return http.post('/api/admin/add',data).then(res => {
    return res.data
  })
}
//删除图片
export const deleteImage = (url) => {
  return http.delete('/api/upload/deleteImage',{url}).then(res => {
    return res.data
  })
}

//更新土特产
export const updateProduct = (data) => {
  return http.put('/api/goods/update',data).then(res => {
    return res.data
  })
}
//添加土特产
export const addProduct = (data) => {
  return http.post('/api/goods/add',data).then(res => {
    return res.data
  })
}

//获取轮播图
export const getCarousel = () => {
  return http.get('/api/carousel').then(res => {
    return res.data.data
  })
}

//更新轮播图
export const updateCarousel = (data) => {
  return http.put('/api/carousel/update',data).then(res => {
    return res.data
  })
}

//添加轮播图
export const addCarouselApi = (data) => {
  return http.post('/api/carousel/save',data).then(res => {
    return res.data
  })
}

//获取土特产资讯
export const getSpecialtyNewsApi = (data) => {
  data.page -= 1
  return http.get('/api/matter',data).then(res => {
    return res.data.data
  })
}

//添加或者更新土特产资讯
export const updateAddSpecialtyNewsApi = (data)=>{
  return http.post('/api/matter',data).then(res => {
    return res.data
  })
}

//获取帖子
export const getPostApi = (data) => {
  data.page -= 1
  return http.get('/api/post/findByClassifyOrMatter',data).then(res => {
    return res.data.data
  })
}


//get删除接口
export const getDelete = (id) => {
  return http.get(url, id).then(res => {
    return res.data.data
  })
}

//更新用户信息
export const UpdateUser = (data) => {
  return http.put('/api/admin', data).then(res => {
    return res.data
  })
}

//获取所有土特产
export const getAllProductApi = () => {
  return http.get('/api/goods/findByPage').then(res => {
    return res.data.data
  })
}

//获取所有消息
export const getAllMsgApi = (data) => {
  data.page -= 1
  return http.get('/api/comment/findMessagePage',data).then(res => {
    return res.data.data
  })
}