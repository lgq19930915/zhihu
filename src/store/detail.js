// 引入ajax请求
// 详情的状态
import { requestDetail } from "../util/request"
const initDetail = {
    detail: []
}
// action
const changeDetailAction = (detail) => {
    // console.log(detail);

    return {
        type: "changeDetail",
        detail: detail
    }
}
// 请求详情数据
export const requestDetailAction = (id) => {
    return (dispatch, getState) => {
        const { detail } = getState().detail
        if (!!detail.id && id === detail.id) {
            return;
        }
        if (detail.id && id !== detail.id) {
            dispatch(changeDetailAction({}))
        }
        requestDetail(id).then(res => {
            dispatch(changeDetailAction(res.data))
        })
    }
}
//reducer
const detailReducer = (state = initDetail, action) => {
    // console.log(action.detail);

    switch (action.type) {
        case "changeDetail":
            return {
                ...state,
                detail: action.detail
            }
        default:
            return state
    }
}
export default detailReducer
// 导出状态给组件
export const getDetail = state => state.detail.detail