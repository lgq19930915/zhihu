import React from 'react';
import { Carousel } from "antd-mobile"
import { Link } from "react-router-dom"
import "./Banner.styl"
function Banner(props) {
    const { banner } = props;
    // console.log(banner);

    return (
        <div className="banner">
            <Carousel
                autoplay={true}
                infinite
            >
                {
                    banner.map(val => {
                        return (
                            <Link to={"/detail/" + val.id} key={val.id}>
                                <p className="title">{val.title}</p>
                                <img src={val.image} alt="" />
                            </Link>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Banner;