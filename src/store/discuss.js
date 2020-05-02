// 引入ajax请求
// 详情的状态
import { requestLongComment, requestShortComment } from "../util/request"
const initDiscusss = {
    long: [],
    short: []
}
// action
const changeLongAction = (long) => {
    return {
        type: "changeLong",
        long: long
    }
}
const changeShortAction = (short) => {
    // console.log(short);

    return {
        type: "changeShort",
        short: short
    }
}
// 请求长评论数据
export const requestLongAction = (id) => {
    return (dispatch, getState) => {
        requestLongComment(id).then(res => {
            // console.log(res)
            dispatch(changeLongAction(res.data.comments))
        })
    }
}
// 请求短评论
export const requestShortAction = (id) => {
    return (dispatch, getState) => {

        requestShortComment(id).then(res => {
            // console.log(res)
            dispatch(changeShortAction(res.data.comments))
        })
    }
}
//reducer
const discussReducer = (state = initDiscusss, action) => {
    // console.log(action.long);

    switch (action.type) {
        case "changeLong":
            return {
                ...state,
                long: action.long
            }
        case "changeShort":
            return {
                ...state,
                short: action.short
            }
        default:
            return state
    }
}
export default discussReducer
// 导出状态给组件
export const getLong = state => state.discuss.long
export const getShort = state => state.discuss.short
