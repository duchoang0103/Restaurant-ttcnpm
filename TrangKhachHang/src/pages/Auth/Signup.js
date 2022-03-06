import React, { Component, Fragment } from 'react';
import { URLserver } from '../../components/TrangKhachHang/constant';
import { handleLoginFailed } from '../../components/TrangKhachHang/Alert/Alert';

import './Login.css'
import { Redirect } from 'react-router';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      token: '',
      userId: '',
      redirectHome: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    if(this.props.logout){
      this.props.logoutHandler();
    }
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name);
    console.log(value);

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // alert('A email was submitted: ' + this.state.email);
    event.preventDefault();
    this.signupAPI();
    const authData = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
      
    };
    // this.props.signupHandler(event,authData);
  }
  signupAPI = () => {
    console.log('signupAPI nè...');

    const formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('name', this.state.nmae);

    let method = 'POST';
    let url = URLserver + '/auth/signup';

    fetch(url, {
      method: method,
      headers: { 'Authorization': 'Bearer ' + this.props.token },
      body: formData
    })
      .then(res => {
        if (res.status !== 200) {
          console.log('Lỗi đăng ký');
          throw new Error('Signup Failed.');
        }
        console.log(res);
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        console.log("set false");
        this.setState({
          alert: false,
          token: resData.token,
          userId: resData.userId,
          redirectHome: true
        })
        
        
      })
      .catch(err => {
        console.log(err);
        // this.setState({
        //   isAuth: false,
        //   authLoading: false,
        //   error: err
        // });
        this.catchError();
      });
  };
  catchError = () => {
    console.log('lỗi đky');

    this.setState({ alert: true })
  }
  showAlert = () => {
    if (this.state.alert === true) {

      return (
        <div class="alert alert-danger" role="alert">
          Đăng ký không thành công.
        </div>
      );
    }

  }
  showRedirect = () => {
    const { redirectHome } = this.state;

    if (redirectHome) {
      this.setState({
        redirectHome: false
      })
      return <Redirect to='/' />;
    }
  }

  
  render() {
    return (
      <Fragment>
        {this.showRedirect()}
        <div className="container mt-5">
          <div className="row">

            <div className="col-4"></div>
            <div className="col-4 form">
              <h1 >Đăng ký</h1>
              {this.showAlert()}
              <form >
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.handleChange} name="email" />
                  <div id="emailHelp" className="form-text">Nhập vào email.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Tên</label>
                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.handleChange} name="name" />
                  <div id="emailHelp" className="form-text">Nhập vào tên.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" onChange={this.handleChange} name="password"  />
                  <div id="emailHelp" className="form-text">Nhập vào password.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" onChange={this.handleChange} name="con_password"  />
                  <div id="emailHelp" className="form-text">Confirm password.</div>
                </div>

                {/* <button class="button rounded-1 primary-bg text-white w-100 btn_3 boxed-btn" type="submit">Login</button> */}
                <a href="#" class="genric-btn btn-block primary large login_button" onClick={this.handleSubmit}>SIGN UP</a>
              </form>
            </div>
          </div>

        </div>
      </Fragment>
    )
  }
}

export default Signup;
