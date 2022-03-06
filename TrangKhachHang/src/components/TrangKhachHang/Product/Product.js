import React, { Component } from 'react'
import {handleCLickAddSPGioHang} from '../Alert/Alert';
import { URLserver } from '../constant';

export default class Product extends Component {

    addProducts = () => {
        console.log('Loadproducts');
        console.log(this.props.data._id);
        console.log(this.props.token);

        const formData = new FormData();
        formData.append('productId', this.props.data._id);

        let method = 'POST';
        let url = URLserver + '/cart';

        fetch(url, {
            method: method,
            headers: { 'Authorization': 'Bearer ' + this.props.token },
            body: formData
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Add to cart Failed.');
                }
                console.log(res);
                return res.json();
            })  
            .then(resData => {
                handleCLickAddSPGioHang();
                console.log(resData);
            })
            .catch(this.catchError);
    };
    newCartHandler = (e) => {
        e.preventDefault()
        this.addProducts();
    };
    render() {
        return (
            <div className="col-lg-4 col-md-6 col-sm-6 mb-3">
                <div className="single-cat text-center mb-40">
                    <div className="cat-img">
                        <img src={URLserver + this.props.data.imageUrl} alt={this.props.data.img} height="250px" width= "250px"/>
                        {/* <img src="https://cdn.24h.com.vn/upload/2-2019/images/2019-05-25/1558802221-860-vi-dau-sieu-pham-hoat-hinh-he-doraemon-vua-quen-vua-la-unnamed--8--1558666578-width739height559.png" alt={this.props.data.img} width= "250px"/> */}
                        <div className="numbering">{this.props.data.price / 1000}k</div>
                    </div>
                    <div className="cat-cap">
                        <h5><a href="#">{this.props.data.title}</a></h5>
                        <p>{this.props.data.description}</p>
                        <a href="#" onClick={(e)=>this.newCartHandler(e)} className="browse-btn">Thêm vào giỏ</a>
                    </div>
                </div>
            </div>
        )
    }
}
