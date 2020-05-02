import React, { Component } from 'react'
import Goback from "../../components/Goback/Goback"
// 取问号传参的方法
import querystring from "querystring"
// 导入connect方法 批量导入方法
import { connect } from "react-redux"
import { requestShortAction, requestLongAction, getLong, getShort } from "../../store/discuss"
// 引入样式
import "./Discuss.styl"
// 引入沙发
import sofa from "../../assets/image/沙发.jpg"
// 引入卡片
import Pl_card from "../../components/Pl_card/Pl_card"

class Discuss extends Component {
    constructor() {
        super()
        this.state = {
            isShowLong: true,
            isShowShort: true
        }
    }
    componentDidMount() {
        console.log(this.props.location.search);
        // console.log(typeof (this.props.location.search));
        var json = querystring.parse(this.props.location.search.slice(1))
        console.log(json.id);
        this.props.requestLong(json.id)
        this.props.requestShort(json.id)
    }
    closeLong() {
        this.state.isShowLong = !this.state.isShowLong
        this.setState({
            isShowLong: this.state.isShowLong
        })
    }
    closeShort() {
        this.state.isShowShort = !this.state.isShowShort
        this.setState({
            isShowShort: this.state.isShowShort
        })
    }
    render() {
        const { getLong, getShort } = this.props
        // console.log(getLong.length + getShort.length);
        const { isShowLong, isShowShort } = this.state
        return (
            < div >
                <div className="top_nav">
                    <Goback></Goback>
                    <span>{getLong.length + getShort.length}条评论</span>
                    <span className="bianji"></span>
                </div>
                <div className="con">

                    <div className="long">
                        <p><span>{getLong.length}条长评论</span><span className={isShowLong ? "zhankai" : "shouqi"} onClick={this.closeLong.bind(this)}></span></p>
                        <div>
                            {/* 这里遍历长评论的 */}
                            {getLong.length == 0 ? <img className="sofa" src={sofa} alt="" /> : isShowLong ? null : getLong.map(item => {
                                return (
                                    <div key={item.id}>
                                        <Pl_card info={item}></Pl_card>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="short">
                        <p><span>{getShort.length}条短评论</span><span className={isShowShort ? "zhankai" : "shouqi"} onClick={this.closeShort.bind(this)}></span></p>
                        {getShort.length == 0 ? <img className="sofa" src={sofa} alt="" /> : <div>
                            {/* 这里遍历短评论的 */}
                            {
                                isShowShort ? null : getShort.map(item => {
                                    return <div key={item.id}>
                                        <Pl_card info={item}></Pl_card>
                                    </div>
                                })
                            }
                        </div>}
                    </div>
                </div>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state);

    return {
        getShort: getShort(state),
        getLong: getLong(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestLong: (id) => { dispatch(requestLongAction(id)) },
        requestShort: (id) => { dispatch(requestShortAction(id)) }
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Discuss)