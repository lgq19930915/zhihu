import axios from "axios"
axios.interceptors.response.use(res => {
    console.log("请求路径" + res.config.url);
    console.log(res);
    return res;

})
// 首页数据
export const requestIndex = () => {
    return axios({
        url: "/api/4/stories/latest"
    })

}
// 过往信息
export const requestBefore = (date) => {
    return axios({
        url: "/api/4/stories/before/" + date
    })

}
// 详情数据
export const requestDetail = (id) => {
    return axios({
        url: "/api/4/story/" + id
    })

}
// 文章长评论
export const requestLongComment = (id) => {
    return axios({
        url: "/api/4/story/" + id + "/long-comments"
    })
}
// 文章短评论
export const requestShortComment = (id) => {
    return axios({
        url: "/api/4/story/" + id + "/short-comments"
    })
}
