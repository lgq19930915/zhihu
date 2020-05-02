// 引入ajax请求
// 首页的状态
import { requestIndex, requestBefore } from "../util/request"
const initIndex = {
    top_stories: [],
    stories: [],
    // 储存的是过往数据数组 [{date, stories},{}]
    before: [],
}
// action
const changeTop_storiesAction = (top_stories) => {
    return {
        type: "changeTop_stories",
        top_stories: top_stories
    }
}
const changeStoriesAction = (stories) => {
    return {
        type: "changeStories",
        stories: stories
    }
}
const changeBeforeAction = (before) => {
    return {
        type: "changeBefore",
        before: before
    }
}
// 请求数据今日
export const requestIndexAction = () => {
    return (dispatch, getState) => {

        const { stories, top_stories } = getState().home;
        if (stories.length > 0) {
            return;
        };
        if (top_stories.length > 0) {
            return;
        }

        requestIndex().then(res => {
            dispatch(changeTop_storiesAction(res.data.top_stories));
            dispatch(changeStoriesAction(res.data.stories))
        })
    }
}
// 请求过往数据
export const requestBeforeAction = (date) => {
    return (dispatch, getState) => {
        requestBefore(date).then(res => {
            dispatch(changeBeforeAction(res.data));
        })
    }
}
//reducer 
const indexReducer = (state = initIndex, action) => {
    // console.log(action.top_stories);
    // console.log(action.stories);
    switch (action.type) {
        case "changeTop_stories":
            return {
                ...state,
                top_stories: action.top_stories,
            }
        case "changeStories":
            return {
                ...state,
                stories: action.stories
            }
        case "changeBefore":
            return {
                ...state,
                // 切记这是添加一条数据，不是替换，替换就会覆盖
                before: [...state.before, action.before]
            }
        default:
            return state
    };
}
export default indexReducer
// 导出状态给组件
export const getStories = state => state.home.stories
export const getTop_Stories = state => state.home.top_stories
export const getBefore = state => state.home.before