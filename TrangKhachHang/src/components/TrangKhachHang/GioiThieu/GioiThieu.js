import React, { Component, Fragment } from 'react'

export default class GioiThieu extends Component {
    render() {
        return (
            <Fragment>
                <div>
                    <div className="slider-area slider-height">
                        <div className="slider-active">
                            <div className="single-slider">
                                <div className="slider-cap-wrapper">
                                    <div className="hero-caption">
                                        <h1 data-animation="fadeInUp" data-delay=".2s">Chào mừng đến với nhà hàng của chúng tôi.</h1>
                                        <p data-animation="fadeInUp" data-delay=".6s">Ăn uống và thưởng thức những hương vị tuyệt vời nhất</p>
                                        <div className="slider-btns">
                                            <a data-animation="fadeInLeft" data-delay="1.0s" href="#menu" className="btn hero-btn mr-15">Đi đến Menu</a>
                                        </div>
                                    </div>
                                    <div className="hero-img position-relative">
                                        <img src="assets/img/hero/h1_hero1.jpg" alt="" data-animation="fadeInRight" data-transition-duration="5s" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="our-services section-padding position-relative">
                        <div className="container">
                            <div className="row justify-content-sm-center">
                                <div className="col-xl-7 col-lg-8 col-md-11">
                                    <div className="section-tittle text-center mb-70">
                                        <h3>Đặt món dễ dàng và chỉ mất vài phút.</h3>
                                        <p>Chúng tôi luôn mong muốn khách hàng có những trải nghiệm tuyệt vời nhất.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className=" col-lg-4 col-md-6 col-sm-6">
                                    <div className="single-services text-center mb-30">
                                        <div className="services-icon">
                                            <img src="assets/img/icon/services1.svg" alt="" />
                                        </div>
                                        <div className="services-cap">
                                            <h5><a href="#menu">Ẩm thực Sài Gòn</a></h5>
                                            <p>
                                                Bạn có thể rời TP Hồ Chí Minh, nhưng bạn sẽ không bao giờ quên đồ ăn.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" col-lg-4 col-md-6 col-sm-6">
                                    <div className="single-services text-center mb-30">
                                        <div className="services-icon">
                                            <img src="assets/img/icon/services2.svg" alt="" />
                                        </div>
                                        <div className="services-cap">
                                            <h5><a href="#menu">Thức ăn nhanh</a></h5>
                                            <p>Chúng tôi cung cấp các loại thức ăn nhanh ngon và chất lượng.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" col-lg-4 col-md-6 col-sm-6">
                                    <div className="single-services text-center mb-30">
                                        <div className="services-icon">
                                            <img src="assets/img/icon/services3.svg" alt="" />
                                        </div>
                                        <div className="services-cap">
                                            <h5><a href="#menu">Thức uống</a></h5>
                                            <p>Quý khách sẽ hài lòng với những loại đồ uống tuyệt vời nhất.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }
}
