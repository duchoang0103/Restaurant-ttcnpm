import React, { Component, Fragment } from 'react'
import ItemDonHang from '../ItemDonHang/ItemDonHang';
// import { handleCLickCreateOrder } from '../Alert/Alert';
import  { Redirect } from 'react-router-dom'
import { URLserver } from '../constant';

export default class GioHang extends Component {
    state = {
        orders: [],
        token: this.props.token,
        isUpdate: false,
        redirectOrder: false
    };

    componentDidMount() {
        this.setState({ token: this.props.token });
        this.setState({ isUpdate: false });
        this.loadProducts();
    }
    loadProducts = () => {
        console.log('Loading cart');

        let method = 'GET';
        let url = URLserver + '/getOrders';

        fetch(url, {
            method: method,
            headers: { 'Authorization': 'Bearer ' + this.props.token },
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Fetching order Failed.');
                }
                return res.json();
            })
            .then(resData => {
                console.log("resData.products");
                console.log(resData.orders);
                this.setState({
                    orders: resData.orders,
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
        if (this.state.orders.length > 0) {
            console.log(this.state.orders);
            let i = 0;
            return (
                this.state.orders.map(order => {
                    i = 0;
                    console.log("order");
                    console.log(order);
                    if(order.status > 0){
                        return (
                        
                            order.products.map(productItem => {
                            i+=1;
                            console.log("product");
                            console.log(productItem);
                            
                            return <ItemDonHang data={{ _id: order._id, total: order.total,  index: i, img: productItem.product.imageUrl, price: productItem.product.price, title: productItem.product.title, quantity: productItem.quantity, status: productItem.status }} token={this.props.token} onDelete={this.delete}></ItemDonHang>
                        })
                        )
                    }
                })
            );
        }
    };

    
    showRedirect = ()=>{
        const { redirectOrder } = this.state;
        
        if (redirectOrder) {
            this.setState({
                redirectOrder: false
            })
            return <Redirect to='/giohang'/>;
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
                                    <div className="country">Id Đơn hàng</div>
                                    <div className=" visit">Tên</div>
                                    <div className="serial">Giá</div>
                                    <div className="serial">Số lượng</div>
                                    <div className="visit">#</div>
                                    <div className="serial">Tổng </div>
                                </div>
                                {this.showAllProduct()}
                            </div>
                        </div>

                    </div>

                </div>

            </Fragment>
        )
    }
}
