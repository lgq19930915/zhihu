// 收藏的状态
const initCollection = {
    collection: []
}
// 收藏的action
export const collectionAction = (detail) => {
    return {
        type: "collect",
        detail: detail
    }
}
// 取消收藏的action
export const cancelAction = (id) => {
    return {
        type: "cancel",
        id: id
    }
}
// 收藏和取消收藏的reducer
const collectionReducer = (state = initCollection, action) => {
    switch (action.type) {
        //收藏
        case "collect":
            return {
                ...state,
                collection: [...state.collection, action.detail]
            }
        case "cancel":
            const { collection } = state;
            var index = collection.findIndex(item => item.id === action.id);
            collection.splice(index, 1)
            return {
                ...state,
                collection: [...collection]
            }
        default:
            return state
    }
}
export default collectionReducer;
// 导出数据
export const getCollection = state => state.collection.collection