import React, { Component, Fragment } from 'react'
import ItemGioHang from '../ItemGioHang/ItemGioHang';
import { handleCLickCreateOrder } from '../Alert/Alert';
import  { Redirect } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { URLserver } from '../constant';


export default class GioHang extends Component {
    state = {
        products: [],
        token: this.props.token,
        isUpdate: false,
        redirectOrder: false,
        loiQuaSoLuong: null
    };

    componentDidMount() {
        this.setState({ token: this.props.token });
        this.setState({ isUpdate: false });
        this.loadProducts();
    }
    loadProducts = () => {
        console.log('Loading cart');

        let method = 'GET';
        let url = URLserver + '/cart';

        fetch(url, {
            method: method,
            headers: { 'Authorization': 'Bearer ' + this.props.token },
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Failed to fetch cart.');
                }
                return res.json();
            })
            .then(resData => {
                console.log("resData.products");
                console.log(resData.products);
                this.setState({
                    products: resData.products,
                });
            })
            .catch(this.catchError);
    };
    delete = (i) => {
        var upd = this.state.isUpdate;
        this.setState({
            isUpdate: !upd
        })
        console.log('loaddddddđ');
        setTimeout(this.loadProducts(), 1000);
    }
    showAllProduct = () => {
        if (this.state.products.length > 0) {
            console.log(this.state.products);
            let i = 0;
            return (
                this.state.products.map(product => {
                    i = i + 1;
                    if (product.productId !== null){
                        return <ItemGioHang data={{ _id: product.productId._id, index: i, img: product.productId.imageUrl, price: product.productId.price, title: product.productId.title, quantity: product.quantity }} token={this.props.token} onDelete={this.delete}></ItemGioHang>
                    }
                })
            );
        }
    };
    showTong = () => {
        if (this.state.products.length > 0) {
            let tong = 0;
            for (const product of this.state.products) {
                if(product.productId !== null){
                    tong +=product.productId.price *product.quantity;
                }
            }
            return <b>{tong}</b>
        }
    }
    loadProducts2 = () => {
        console.log('Loadproducts');

        let method = 'GET';
        let url = URLserver + '/product/getProducts';

        fetch(url, {
            method: method,
            headers: { 'Authorization': 'Bearer ' + this.props.token },
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Failed to fetch products.');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData.products);
                for(let p of resData.products){
                    console.log("p");
                    console.log(p);
                    
                    for(let pState of this.state.products){
                        if(p._id === pState.productId._id && p.quantity < pState.quantity){
                            this.setState({
                                loiQuaSoLuong: p.title
                            })
                            throw new Error(p.title + ' Với số lượng ít hơn: ' + p.quantity);
                        }
                        
                    }
                }
                this.createOrder();
            })
            .catch(this.catchError);
    };
    createOrder = () => {
        console.log('createOrder');

        // const formData = new FormData();
        // formData.append('productId', this.props.data._id);

        let method = 'POST';
        let url = URLserver + '/create-order';

        fetch(url, {
            method: method,
            headers: { 'Authorization': 'Bearer ' + this.props.token },
            // body: formData
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Creating order Failed.');
                }
                console.log(res);
                return res.json();
            })
            .then(resData => {
                this.loadProducts();
                handleCLickCreateOrder();
                console.log(resData);
                this.setState({
                    redirectOrder: true
                })
            })
            .catch(this.catchError);
    };
    submit = (e) => {
        e.preventDefault();
        confirmAlert({
            title: 'Xác nhận đặt món',
            message: 'Bạn có chắc chắn đặt món.',
            buttons: [
                {
                    label: 'Chắc chắn',
                    onClick: () => this.loadProducts2()
                },
                {
                    label: 'Không',
                    onClick: () => {}
                }
            ]
        });
    };
    showButton = () => {
        if (this.state.products.length > 0) return (
            <div className="row">
                <div className="col-9">

                </div>
                <div className="col">
                    {/* <a href="#" class="genric-btn success radius" onClick={(e) => this.createOrder(e)} >Đặt hàng</a> */}
                    <a href="#" class="genric-btn success radius" onClick={(e)=> this.submit(e)} >Đặt hàng</a>
                </div>

            </div>
        )
        else {
            return (
                <div className="row">
                <div className="col-2">

                </div>
                <div className="col-4">
                    <div className="alert alert-warning" role="alert">
                        Giỏ hàng trống
                    </div>
                </div>
            </div>
            )
        }

    }
    showRedirect = ()=>{
        const { redirectOrder } = this.state;
        
        if (redirectOrder) {
            this.setState({
                redirectOrder: false
            })
            return <Redirect to='/donhang'/>;
        }
    }
    catchError = (e)=>{
        if(this.state.loiQuaSoLuong){
            this.setState({
                loiQuaSoLuong: null
            })
            return window.confirm("Lỗi đặt quá số lượng hiện có: " + e);
        }
    }
    render() {
        return (
            <Fragment>
                
                {this.showRedirect()}
                <div className="container">
                    <div className="section-top-border">
                        <h3 className="mb-30">Table</h3>
                        <div className="progress-table-wrap">
                            <div className="progress-table">

                                <div className="table-head">
                                    <div className="serial">#</div>
                                    <div className="country">Tên</div>
                                    <div className="visit">Giá</div>
                                    <div className="visit">Số lượng</div>
                                    <div className="visit">Tổng</div>
                                    <div className="visit">{this.showTong()} <b>VND</b></div>
                                </div>
                                {this.showAllProduct()}
                            </div>
                            {this.showButton()}
                        </div>

                    </div>

                </div>

            </Fragment>
        )
    }
}
