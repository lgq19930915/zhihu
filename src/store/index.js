import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
// 引入各个页面的数据模块

import home from "./home"
import detail from "./detail"
import collection from "./collection"
import discuss from "./discuss"
const reducer = combineReducers({
    // key 模块名  value 该模块对应的reducer
    home: home,
    detail: detail,
    collection: collection,
    discuss: discuss
})
// 创建一个仓库导出它
const store = createStore(reducer, applyMiddleware(thunk))
export default store;