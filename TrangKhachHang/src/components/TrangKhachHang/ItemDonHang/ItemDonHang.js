import React, { Component } from 'react'
import {handleCLickXoaSPGioHang} from '../Alert/Alert';
import {URLserver} from '../constant';
export default class ItemDonHang extends Component {

    state ={
        itemId: 1,
        
    }
    showStatus =(status) =>{
        if(status === 1) return <p class="text-primary">Đang thực hiện</p>;
        if(status === 2) return <p class="text-success">Đã hoàn tất</p>;
        if(status === -1) return <p class="text-danger">Đã hủy</p>;

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
    showStatus = () =>{
        if(this.props.data.status === 1){
            return <p class="text-primary">Đang chuẩn bị</p>
        }
        if(this.props.data.status === 2){
            return <p class="text-success">Đã hoàn tất</p>
        }
        if(this.props.data.status ===  -1){
            return <p class="text-danger">Đã hủy</p>
        }
    }
    showTotal = () =>{
        if(this.props.data.index === 1){
            console.log(this.props.data);
            
            return (
                    <b>{this.props.data.total}</b>
            )
        }
    }
    render() {
        return (
            <div className="table-row">
                <div className="country ">{this.props.data._id}</div>
                <div className="visit"> <img src={URLserver + this.props.data.img} alt={this.props.data.img} width= "30px" />{this.props.data.title}</div>
                <div className="serial">{this.props.data.price}</div>
                <div className="serial">{this.props.data.quantity}</div>
                <div className="visit"> 
                    {this.showStatus()}
                </div>
                <div className="serial"> 
                {this.showTotal()}
                </div>
                
            </div>
        )
    }
}
