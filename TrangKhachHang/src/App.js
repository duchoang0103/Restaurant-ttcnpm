import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';

import './App.css';
import Header from './components/TrangKhachHang/Header/Header';
import Footer from './components/TrangKhachHang/Footer/Footer';
import Main from './components/TrangKhachHang/Main/Main';
import Order from './components/TrangKhachHang/Order/Order';
import GioHang from './components/TrangKhachHang/GioHang/GioHang';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { URLserver } from './components/TrangKhachHang/constant';

class App extends Component {
  state = {
    showBackdrop: false,
    showMobileNav: false,
    isAuth: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    userId: '',
    authLoading: false,
    error: null
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    this.setAutoLogout(remainingMilliseconds);
  }

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  loginHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    const formData = new FormData();
    formData.append('email', authData.email);
    formData.append('password', authData.password);

    let method = 'POST';
    let url = URLserver + '/auth/login';

    fetch(url, {
      method: method,
      headers: { 'Authorization': 'Bearer ' + this.props.token },
      body: formData
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,
          userId: resData.userId
        });
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
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };

  // signupHandler = (event, authData) => {
  //   event.preventDefault();
  //   this.setState({ authLoading: true });
  //   fetch('URL')
  //     .then(res => {
  //       if (res.status === 422) {
  //         throw new Error(
  //           "Validation failed. Make sure the email address isn't used yet!"
  //         );
  //       }
  //       if (res.status !== 200 && res.status !== 201) {
  //         console.log('Error!');
  //         throw new Error('Creating a user failed!');
  //       }
  //       return res.json();
  //     })
  //     .then(resData => {
  //       console.log(resData);
  //       this.setState({ isAuth: false, authLoading: false });
  //       this.props.history.replace('/');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       this.setState({
  //         isAuth: false,
  //         authLoading: false,
  //         error: err
  //       });
  //     });
  // };

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  errorHandler = () => {
    this.setState({ error: null });
  };
  getDataLogin = (token, userId)=>{
    console.log('đã get đc data');
    console.log(token);
    console.log(userId);
    
    
    this.setState({
      token: token,
      userId: userId,
      isAuth: true
    })
  }
  showRedirect = () => {
    const { isAuth } = this.state;

    if (!isAuth) {
      
      return <Redirect to='/' />;
    }
  }
  render() {
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <Fragment>
                  {/* <Header></Header> */}
                  <Login getDataLogin={this.getDataLogin} loginHandler={this.loginHandler}></Login>
                  {/* <Footer></Footer> */}
              </Fragment>
          )}
        />
        <Route
          path="/signup"
          exact
          render={props => (
            <Fragment>
                  {/* <Header></Header> */}
                  <Signup></Signup>
                  {/* <Footer></Footer> */}
              </Fragment>
          )}
        />
      </Switch>
    );
    if (this.state.isAuth) {
      
      
      routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              
              <Fragment>
                  
                  <Header></Header>
                  <Main userId={this.state.userId} token={this.state.token}></Main>
                  <Footer></Footer>
              </Fragment>
            )}
          />
          <Route
            path="/GioHang"
            exact
            render={props => (
              
              <Fragment>
                  
                  <Header></Header>
                  <GioHang token={this.state.token}></GioHang>
                  <Footer></Footer>
              </Fragment>
            )}
          />
          <Route
            path="/DonHang"
            exact
            render={props => (
              
              <Fragment>
                  
                  <Header></Header>
                  
                  <Order token={this.state.token}></Order>
                  <Footer></Footer>
              </Fragment>
            )}
          />
          <Route
            path="/logout"
            exact
            render={props => (
              
              <Fragment>
                  
                  <Login getDataLogin={this.getDataLogin} loginHandler={this.loginHandler} logout={true} logoutHandler={this.logoutHandler}></Login>
              </Fragment>
            )}
          />
          
        </Switch>

      );
      console.log("routes");
      console.log(routes);
    }

    
    return (

      <Fragment>
        <ReactNotifications />
        {this.showRedirect()}
        {routes}
      </Fragment>
    );
  }
}

export default withRouter(App);
