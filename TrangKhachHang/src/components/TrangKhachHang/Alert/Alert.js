import React, { Component } from 'react'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export function handleCLickXoaSPGioHang() {
    store.addNotification({
        title: "Thành công!",
        message: "Bạn đã xóa món ăn khỏi giỏ hàng",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true
        }
    });
}
export function handleCLickTangSLSanPham () {
    store.addNotification({
        title: "Thành công!",
        message: "Bạn đã tăng món ăn giỏ hàng",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true
        }
    });
}

export function handleCLickGiamSLSanPhamKoThanhCong (){
    store.addNotification({
        title: "Không Thành công!",
        message: "Bạn cần xóa, món ăn không thể giảm",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true
        }
    });
}
export function handleCLickTangSLSanPhamKoThanhCong (){
    store.addNotification({
        title: "Không Thành công!",
        message: "Món ăn không thể tăng lên vì quá Số lượng",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true
        }
    });
}
export function handleCLickGiamSLSanPham () {
    store.addNotification({
        title: "Thành công!",
        message: "Bạn đã giảm món ăn từ giỏ hàng",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true
        }
    });
}
export function handleCLickAddSPGioHang() {
    store.addNotification({
        title: "Thành công!",
        message: "Bạn đã thêm sản phẩm vào giỏ hàng",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true
        }
    });
}
export function handleCLickCreateOrder() {
    store.addNotification({
        title: "Thành công!",
        message: "Bạn đã đặt món ăn thành công.",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true
        }
    });
}
export function handleLoginFailed() {
    store.addNotification({
        title: "Đăng nhập không thành công.",
        message: " Vui lòng kiểm tra lại Email và mật khẩu",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 1500,
            onScreen: true
        }
    });
}