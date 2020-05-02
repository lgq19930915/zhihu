import React, { Component } from 'react';
import { Drawer } from "antd-mobile"
import { Link } from "react-router-dom"
import headPhoto from "../../assets/image/头像.jpg"
// 自己的样式
import "./Index.styl"
// 导入connect方法 批量导入方法
import { connect } from "react-redux"
// 导入仓库 
import { getStories, getTop_Stories, getBefore, requestIndexAction, requestBeforeAction } from "../../store/home"
// 引入轮播图组件
import Banner from "../../components/Banner/Banner"
class Index extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
        }
        this.n = 0
        //判断是否可以发请求，作为发起请求的一个开关
        this.isRequest = true;
    }
    // 触发抽屉的方法
    onOpenChange() {
        this.setState({
            open: !this.state.open
        })
    }

    // 页面一进去就加载数据
    componentDidMount() {
        // 发请求
        this.props.requestIndex();
        // 页面滚动事件
        window.onscroll = () => {

            // 修改顶部数据
            var titles = document.querySelectorAll(".before_time")
            const index_title = document.querySelector(".index_title")
            var titles_arr = []
            for (var i = 0; i < titles.length; i++) {
                titles_arr.push(titles[i].getBoundingClientRect().top)
            }
            var index = 0;
            for (var i = 0; i < titles_arr.length; i++) {
                if (titles_arr[i] < index_title.clientHeight + 100) {
                    index = i
                } else {
                    break;
                }
            }


            // console.log(titles[0]);

            index_title.innerHTML = index === 0 ? "首页" : titles[index].innerHTML
            // console.log(titles_arr);

            // console.log("页面滚动了");
            //获取窗口的高度
            var wh = document.documentElement.clientHeight;
            //获取文档的高度
            var dh = document.documentElement.offsetHeight;
            //获取上卷的距离  是不是加多了 
            var st = document.documentElement.scrollTop || document.body.scrollTop;
            if (st + wh + 30 >= dh && this.isRequest) {
                // 加载n++
                this.n++;
                var paramsTime = this.getTime(this.n);
                this.showTime = paramsTime.show
                // console.log(paramsTime);
                //开关关掉
                this.isRequest = false;
                console.log("到底了");
                this.props.requestBefore(paramsTime.params,)
            }
        }
    }
    componentWillUnmount() {
        window.onscroll = null;
    }
    // 获取时间
    getTime(n) {
        // n-1前的时间对象
        var paramsDate = new Date(new Date().getTime() - (n - 1) * 24 * 60 * 60 * 1000)
        var paramsDateYear = paramsDate.getFullYear();
        var paramsDateMonth = (paramsDate.getMonth() + 1 + "").padStart(2, "0");
        var paramsDateDate = (paramsDate.getDate() + "").padStart(2, "0");
        var params = paramsDateYear + paramsDateMonth + paramsDateDate;//参数
        // n天前的时间对象
        var showDate = new Date(new Date().getTime() - n * 24 * 60 * 60 * 1000);
        var showDateMonth = (showDate.getMonth() + 1 + "").padStart(2, "0");
        var showDateDate = (showDate.getDate() + "").padStart(2, "0");
        var day = showDate.getDay();//0-6
        var arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var week = arr[day];
        var show = showDateMonth + "月" + showDateDate + "日" + week;
        return {
            params,
            show
        }
    }

    // 抽屉个人中心的去首页
    ToIndex() {
        this.setState({
            open: false
        })
    }
    render() {
        const { Stories, top_Stories, Before } = this.props

        // console.log(Before);
        // 如果Before数据的长度和加载次数一致  就说明加载回来了
        if (Before.length === this.n) {
            this.isRequest = true;
        }
        const sidebar = (
            <div className="sidebar">
                <p className="headPhoto"><img src={headPhoto} alt="" /> <span>蜡笔小新</span></p>
                <div className="center">
                    <Link to={"/collection"} className="c_left">
                        <span className="xingxing"></span>我的收藏</Link>
                    <div className="c_right">
                        <span className="lixiandownlond"></span> 离线下载</div>
                </div>
                <div className="btm"> <span className="fangzi"></span> <span onClick={() => this.ToIndex()} className="index">首页</span> </div>
            </div >
        )
        return (
            <div className="box">
                {/* 顶部 */}
                <Drawer
                    // 能否拖拽 默认否
                    enableDragHandle={false}
                    sidebar={sidebar}
                    open={this.state.open}
                    // 用bind一定要绑定this
                    onOpenChange={this.onOpenChange.bind(this)}
                >
                    <div className="top">
                        <div className="top_left">
                            <span onClick={this.onOpenChange.bind(this)} className="xuanxiang"></span>
                            <h1 className="index_title">首页</h1>
                        </div>

                        <div className="top_right">
                            <span className="lingdang"></span>
                            <span className="sandian"></span>
                        </div>
                    </div>
                    <div className="slideshow">
                        {/* {console.log(Stories)
                        } */}
                        {top_Stories ? <Banner banner={top_Stories}></Banner> : null}
                    </div>
                    {/* 今日新闻 */}
                    <div className="con">
                        <p className="before_time">今日新闻</p>

                        {
                            Stories.map(item => {
                                return (
                                    <Link to={"/detail/" + item.id} className="content" key={item.id}>
                                        <div className="title">{item.title}</div>
                                        <div className="c-img"><img src={item.images} alt="" /></div>
                                    </Link >
                                )
                            })
                        }
                    </div>


                    {/*  过往信息 */}
                    <div className="before">
                        {
                            // 渲染数据
                            Before.map(value => {
                                return (
                                    <div className="before" key={value.date}>
                                        {/* 处理下时间就好了 */}
                                        <div className="before_time">{value.date.substring(4, 6) + "月" + value.date.substring(6, 8) + "日"}</div>
                                        {/* <div className="before_time">{this.showTime}</div> */}
                                        {
                                            value.stories.map((item, index) => {
                                                return (
                                                    <Link to={"/detail/" + item.id} className="before_con" key={index}>
                                                        <div className="before_title">{item.title}</div>
                                                        <div className="before_img"><img src={item.images} alt="" /></div>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }


                    </div>
                </Drawer>
            </div >
        );
    }
}
//善后工作

const mapStateToProps = (state) => {
    return {
        Stories: getStories(state),
        top_Stories: getTop_Stories(state),
        Before: getBefore(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestIndex: () => dispatch(requestIndexAction()),
        requestBefore: (date) => dispatch(requestBeforeAction(date)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
