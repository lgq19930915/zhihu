import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import "./Goback.styl"
class Back extends Component {
    goBack() {
        // console.log(this.props)
        this.props.history.go(-1)
    }
    render() {
        return (
            <span className="fanhui" onClick={this.goBack.bind(this)}></span>
        )
    }
}
export default withRouter(Back)
