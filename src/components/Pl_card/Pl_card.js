import React, { Component } from 'react';
import "./Pl_card.styl"
import time from "../../util/time"
function Pl_card(props) {
    // console.log(props.info);
    const { info } = props
    return (
        < div >
            <div className="info">
                <div className="info_left">
                    <img src={info.avatar} alt="" />
                </div>
                <div className="info_center">
                    <h3>{info.author}</h3>
                    <p>{info.content}</p>
                    <p className="center_p2">{time(info.time)}</p>
                </div>
                <div className="info_right">
                    <p><span>点赞</span><em>{info.likes}</em></p>
                </div>
            </div>
        </div >

    )
}

export default Pl_card;