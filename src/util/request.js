import axios from "axios"
axios.interceptors.response.use(res => {
    console.log("请求路径" + res.config.url);
    console.log(res);
    return res;

})
// 首页数据
export const getIndex = () => {
    return axios({
        url: "/api/4/stories/latest"
    })

}
// 过往信息
export const getBefore = (date) => {
    return axios({
        url: "/api/4/stories/before/" + date
    })

}
// 文章长评论
export const getLongComment = (id) => {
    return axios({
        url: "/api/4/story" + id + "/long-comments"
    })

}
