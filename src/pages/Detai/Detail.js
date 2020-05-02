import React, { Component, } from 'react'
// 导入connect方法 批量导入方法
import { connect } from "react-redux"
// 引入自己的样式
import "./Detail.styl"
// 返回组件
import Goback from "../../components/Goback/Goback"
// 引入link
import { Link } from "react-router-dom"
// 导入仓库
import { getDetail, requestDetailAction } from "../../store/detail"
// 导入收藏与取消收藏
// export const getCollection = state => state.collection.collection
import { collectionAction, cancelAction, getCollection } from "../../store/collection"
class Detail extends Component {
    constructor() {
        super()
        //定义ref方便绑定innerHTML

        this.state = {
            isShoucang: false
        }
        this.content = React.createRef();
    }
    // 一进页面就加载数据
    componentDidMount() {
        // 取出来路由里传的ID
        let id = this.props.match.params.id
        // 发请求
        this.props.requestDetail(id);
    }
    render() {
        const { detail, collect, cancel, collection } = this.props;
        // 如果富文本回来了就把他给ref
        if (detail.body && this.content.current) {
            this.content.current.innerHTML = detail.body
        }
        return (
            <div className="detail">
                <div className="top_nav">
                    <Goback></Goback>
                    <span className="fenxiang"></span>
                    {/* <span className={isShoucang ? "shoucang" : "qxshoucang"}></span> */}

                    {collection.some(item => item.id === detail.id) ? <span className="qxshoucang" onClick={() => cancel(detail)}></span> : <span className="shoucang" onClick={() => collect(detail)}></span>}
                    {/* {console.log(collection)
                    } */}
                    <span onClick={() => this.props.history.push('/discuss/?id=' + detail.id)} className="pinglun"><i>38</i></span>
                    <span className="dianzan"></span>
                </div>
                <div>
                    {detail.css ? <link rel="stylesheet" href={detail.css[0]} /> : null}
                    <h1 className="detail_title">{detail.title}</h1>
                    <img className="detail_img" src={detail.image} alt="" />
                    <div ref={this.content}> </div>
                </div>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        detail: getDetail(state),
        collection: getCollection(state),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestDetail: (id) => dispatch(requestDetailAction(id)),
        collect: (detail) => dispatch(collectionAction(detail)),
        cancel: (id) => dispatch(cancelAction(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
