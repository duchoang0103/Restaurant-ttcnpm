import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default class Header extends Component {
    submit = (e) => {
        e.preventDefault();
        confirmAlert({
            title: 'Xác nhận đăng xuất',
            message: 'Bạn có chắc chắn đăng xuất tài khoản.',
            buttons: [
                {
                    label: 'Chắc chắn',
                    onClick: () => alert('Click Yes')
                },
                {
                    label: 'Không',
                    onClick: () => alert('Click No')
                }
            ]
        });
    };


    render() {
        return (
            <header>
                <div className="header-area header-transparent">
                    <div className="main-header header-sticky">
                        <div className="container-fluid">
                            <div className="menu-wrapper d-flex align-items-center justify-content-between">
                                <div className="left-content d-flex align-items-center">
                                    <div className="logo">
                                        <a href="#"><img src="assets/img/logo/logo.png" alt="" /></a>
                                    </div>
                                    <div className="main-menu d-none d-lg-block">
                                        <nav>
                                            <ul id="navigation">
                                                <li><a href="/">Trang chủ</a></li>
                                                <li><a href="/GioHang">Giỏ hàng</a></li>
                                                <li><a href="/DonHang">Đơn hàng</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <ul>
                                        <li className="button-header">
                                            <a href="#" className="btn header-btn2"> <i className="fas fa-phone-alt" />(+84) 0123456789</a>
                                            {/* <a href="/logout" class="header-btn ml-30" onClick={(e)=> this.submit(e)}>Đăng xuất</a> */}
                                            <a href="/logout" class="header-btn ml-30" onClick={(e) => {
                                                if (!window.confirm('Bạn chắc chắn Đăng xuất?')) e.preventDefault();
                                            }}>Đăng xuất</a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
