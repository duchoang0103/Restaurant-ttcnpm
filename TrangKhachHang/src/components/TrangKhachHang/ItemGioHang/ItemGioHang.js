import React, { Component } from 'react'
import {handleCLickXoaSPGioHang} from '../Alert/Alert';
import {handleCLickTangSLSanPham} from '../Alert/Alert';
import {handleCLickGiamSLSanPham} from '../Alert/Alert';
import {handleCLickGiamSLSanPhamKoThanhCong} from '../Alert/Alert';
import {URLserver} from '../constant';
import './ItemGioHang.css'

export default class ItemGioHang extends Component {

    state ={
        itemId: 1,
        
    }
    showStatus =(status) =>{
        if(status === 1) return <p class="text-primary">Đang thực hiện</p>;
        if(status === 2) return <p class="text-success">Đã hoàn tất</p>;
        if(status === -1) return <p class="text-danger">Đã hủy</p>;

    }
    tangSL = () => {
        console.log('tangSL');
        console.log(this.props.data._id);
        console.log(this.props.token);

        const formData = new FormData();
        formData.append('productId', this.props.data._id);

        let method = 'POST';
        let url = URLserver + '/cart';

        fetch(url, {
            method: method,
            headers: { 'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5kdDE5MDVAZ21haWwuY29tIiwidXNlcklkIjoiNjBiZGMzM2RjNGI1Nzk1ZjY0ZTZkNmFjIiwiaWF0IjoxNjIzMjUyMDY2LCJleHAiOjE2MjY4NTIwNjZ9.LwId5wksct8LXPw1Vli0EULs9SWxedPZ2E6y1lYy1ss" },
            body: formData
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Increase product to cart Failed.');
                }
                console.log(res);
                return res.json();
            })  
            .then(resData => {
                this.props.onDelete(1);
                handleCLickTangSLSanPham();
                console.log(resData);
            })
            .catch(this.catchError);
    }
    giamSL = () => {
        console.log('giamSL');
        console.log(this.props.data._id);
        console.log(this.props.token);

        const formData = new FormData();
        formData.append('productId', this.props.data._id);

        let method = 'POST';
        let url = URLserver + '/decr_cart';

        fetch(url, {
            method: method,
            headers: { 'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5kdDE5MDVAZ21haWwuY29tIiwidXNlcklkIjoiNjBiZGMzM2RjNGI1Nzk1ZjY0ZTZkNmFjIiwiaWF0IjoxNjIzMjUyMDY2LCJleHAiOjE2MjY4NTIwNjZ9.LwId5wksct8LXPw1Vli0EULs9SWxedPZ2E6y1lYy1ss" },
            body: formData
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Decrease product to cart Failed.');
                }
                console.log(res);
                return res.json();
            })  
            .then(resData => {
                this.props.onDelete(1);
                if(this.props.data.quantity == 1){
                    handleCLickGiamSLSanPhamKoThanhCong();
                }else{
                    handleCLickGiamSLSanPham();
                }
                console.log(resData);
            })
            .catch(this.catchError);
    }
    xoaProduct = () => {
        console.log('Delete product from cart');
        console.log(this.props.data._id);
        console.log(this.props.token);

        const formData = new FormData();
        formData.append('productId', this.props.data._id);

        let method = 'POST';
        let url = URLserver + '/cart-delete-item';

        fetch(url, {
            method: method,
            headers: { 'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5kdDE5MDVAZ21haWwuY29tIiwidXNlcklkIjoiNjBiZGMzM2RjNGI1Nzk1ZjY0ZTZkNmFjIiwiaWF0IjoxNjIzMjUyMDY2LCJleHAiOjE2MjY4NTIwNjZ9.LwId5wksct8LXPw1Vli0EULs9SWxedPZ2E6y1lYy1ss" },
            body: formData
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Delete product from cart Failed.');
                }
                console.log(res);
                return res.json();
            })  
            .then(resData => {
                this.props.onDelete(1);
                handleCLickXoaSPGioHang();
                console.log(resData);
            })
            .catch(this.catchError);
    };
    xoaSanPham = (e) =>{
        e.preventDefault();
        this.xoaProduct();
        console.log('đã xóa');
    }
    render() {
        return (
            <div className="table-row">
                <div className="serial">{this.props.data.index}</div>
                <div className="country"> <img src={URLserver + this.props.data.img} alt={this.props.data.img} width= "30px" />{this.props.data.title}</div>
                <div className="visit">{this.props.data.price}</div>
                <div className="visit">
                    <a href="#" class="genric-btn danger-border TangGiam" onClick={(e)=>this.giamSL()}><i class="fas fa-minus text-dark"></i></a>
                    <span class="mx-2">{this.props.data.quantity}</span>
                    <a href="#" class="genric-btn danger-border TangGiam" onClick={(e)=>this.tangSL(e)}><i class="fas fa-plus text-dark"></i></a>

                </div>
                <div className="visit">{this.props.data.price * this.props.data.quantity}</div>
                <div className="visit"> 
                    <a href="#" class="genric-btn danger-border" onClick={(e)=>this.xoaSanPham(e)}>Xóa</a>
                    
                </div>
                
            </div>
        )
    }
}
