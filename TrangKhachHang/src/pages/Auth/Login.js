import React, { Component, Fragment } from 'react';
import { URLserver } from '../../components/TrangKhachHang/constant';
import { handleLoginFailed } from '../../components/TrangKhachHang/Alert/Alert';

import './Login.css'
import { Redirect } from 'react-router';

class Login extends Component {
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
    this.loginAPI();
    const authData = {
      email: this.state.email,
      password: this.state.password
    };
    // this.props.loginHandler(event,authData);
  }
  loginAPI = () => {
    console.log('Login nè...');

    const formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);

    let method = 'POST';
    let url = URLserver + '/auth/login';

    fetch(url, {
      method: method,
      headers: { 'Authorization': 'Bearer ' + this.props.token },
      body: formData
    })
      .then(res => {
        if (res.status !== 200) {
          console.log('sai đăng nhập');
          throw new Error('Login Failed.');
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
        this.props.getDataLogin(this.state.token, this.state.userId);
      // })
      // .then(resData => {
        
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
        
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
    console.log('saisss đăng nhập');

    this.setState({ alert: true })
  }
  showAlert = () => {
    if (this.state.alert === true) {

      return (
        <div class="alert alert-danger" role="alert">
          Sai email hoặc mật khẩu.
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
              <h1 >Đăng Nhập</h1>
              {this.showAlert()}
              <form >
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.handleChange} name="email" />
                  <div id="emailHelp" className="form-text">Nhập vào email.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" onChange={this.handleChange} name="password" name="password" />
                  <div id="emailHelp" className="form-text">Nhập vào password.</div>
                </div>

                {/* <button class="button rounded-1 primary-bg text-white w-100 btn_3 boxed-btn" type="submit">Login</button> */}
                <a href="#" class="genric-btn btn-block primary large login_button" onClick={this.handleSubmit}>LOGIN</a>
              </form>
            </div>
          </div>

        </div>
      </Fragment>
    )
  }
}

export default Login;
