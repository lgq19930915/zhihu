import React, { Component } from 'react'
// 返回组件
// import Goback from "../../components/Goback/Goback"
// 引入自己的样式
import "./Collection.styl"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
// 引入仓库
import { getCollection } from "../../store/collection"
class Collection extends Component {
    render() {
        const { collection } = this.props
        return (
            <div className="collection">
                <div className="top_nav">
                    {/* <Goback></Goback> */}
                    <Link className="index" to={"/index"}></Link>
                    <span className="collection_num"> <b>{collection.length}</b> 条收藏</span>
                </div>
                <div className="con">
                    {collection.map((item, index) => {
                        return (
                            <Link to={"/detail/" + item.id} className="con_inner" key={item.id}>
                                <div className="inner_title">{item.title}</div>
                                <div className="inner_img"> <img className="img" src={item.image} alt="" /></div>
                            </Link>
                        )

                    })}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        collection: getCollection(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Collection)
