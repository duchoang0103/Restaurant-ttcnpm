import React, { Component } from 'react'
import { URLserver } from '../constant';
import GioiThieu from '../GioiThieu/GioiThieu'
import Product from '../Product/Product'
import './Main.css'


export default class Main extends Component {
    state = {
        token: this.props.token,
        products: [],
        status: '',
    };
    componentDidMount() {
        this.setState({token: this.props.token})
        this.loadProducts();
    }
    loadProducts = () => {
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
                this.setState({
                    products: resData.products,
                });
            })
            .catch(this.catchError);
    };
    showAllProduct = () =>{
        if(this.state.products.length > 0 ){
            console.log(this.state.products);
            return (
                this.state.products.map(product => {
                    console.log("product");
                    console.log(product);
                    if(product.status > 0 && product.quantity > 0 ){
                        return <Product data={product} token={this.props.token}></Product>
                    }
                    
                })
            );
        }
    };
    showAllProductFilter = (category) =>{
        if(this.state.products.length > 0 ){
            console.log(this.state.products);
            return (
                this.state.products.filter(product => 
                    product.category === category).map(product => {
                        if(product.status > 0 && product.quantity > 0 ){
                            return <Product data={product} token={this.props.token}></Product>
                        }
                    })
            );
        }
    };
    render() {
        return (
            <main>
                <GioiThieu></GioiThieu>
                <section id="menu" className="our-client section-padding section-img-bg2" data-background="../../../assets/img/gallery/section-bg1.jpg">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-5 col-lg-6 col-md-6">
                                <div className="section-tittle section-tittle2  mb-30">
                                    <h2>Thực đơn nhà hàng</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-lg-12">
                                <div className="nav-button mb-40">
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <a className="nav-link active" id="nav-one-tab" data-bs-toggle="tab" href="#nav-one" role="tab" aria-controls="nav-one" aria-selected="true">Full Menu</a>
                                            <a className="nav-link" id="nav-two-tab" data-bs-toggle="tab" href="#nav-two" role="tab" aria-controls="nav-two" aria-selected="false">Ẩm thực Sài Gòn</a>
                                            <a className="nav-link" id="nav-three-tab" data-bs-toggle="tab" href="#nav-three" role="tab" aria-controls="nav-three" aria-selected="false">Thức ăn nhanh</a>
                                            <a className="nav-link" id="nav-four-tab" data-bs-toggle="tab" href="#nav-four" role="tab" aria-controls="nav-four" aria-selected="false">Đồ uống</a>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-one" role="tabpanel" aria-labelledby="nav-one-tab">
                                <div className="items-active">
                                    {/* Product */}
                                    <div class="row">
                                        {this.showAllProduct()}
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade " id="nav-two" role="tabpanel" aria-labelledby="nav-two-tab">
                                <div className="items-active">
                                    {/* Product */}
                                    <div class="row">
                                    {this.showAllProductFilter(1)}

                                    </div>

                                </div>
                            </div>
                            <div className="tab-pane fade " id="nav-three" role="tabpanel" aria-labelledby="nav-three-tab">
                                <div className="items-active">
                                    {/* Product */}
                                    <div class="row">
                                    {this.showAllProductFilter(2)}

                                    </div>

                                </div>
                            </div>
                            <div className="tab-pane fade " id="nav-four" role="tabpanel" aria-labelledby="nav-four-tab">
                                <div className="items-active">
                                    {/* Product */}
                                    <div class="row">
                                    {this.showAllProductFilter(3)}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        )
    }
}
