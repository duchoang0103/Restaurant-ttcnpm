import React, { Component, Fragment } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <Fragment>
                <footer>
                    <div className="footer-wrapper">
                        <div className="footer-area footer-padding">
                            <div className="container">
                                <div className="row justify-content-between">
                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8">
                                        <div className="single-footer-caption mb-50">
                                            <div className="single-footer-caption mb-30">
                                                <div className="footer-logo mb-35">
                                                    <a href="#"><img src="assets/img/logo/logo2_footer.png" alt="" /></a>
                                                </div>
                                                <div className="footer-tittle">
                                                    <div className="footer-pera">
                                                        <p>Nhà hàng chúng tôi hân hạnh phục vụ quý khách.</p>
                                                    </div>
                                                    <div className="footer-social">
                                                        <a href="#"><i className="fab fa-twitter-square" /></a>
                                                        <a href="#"><i className="fab fa-facebook-square" /></a>
                                                        <a href="#"><i className="fab fa-linkedin" /></a>
                                                        <a href="#"><i className="fab fa-pinterest-square" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-8">
                                        <div className="single-footer-caption mb-50">
                                            <div className="footer-tittle mb-20">
                                                <h4>Thông tin liên hệ</h4>
                                                <p>268 Đường Lý Thường Kiệt</p>
                                            </div>
                                            <ul className="mb-20">
                                                <li className="number"><a href="#">(+84) 123456789</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                <div id="back-top">
                    <a title="Go to Top" href="#"> <i className="fas fa-level-up-alt" /></a>
                </div>
            </Fragment>
        )
    }
}
