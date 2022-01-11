import React, { Component} from 'react';
import Axios from 'axios';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {
          email:'',
          password:''
        };
      }
      handleEmailChange(e){
        this.setState({email:e.target.value})
      }
      handlePasswordChange(e){
        this.setState({password:e.target.value})
      }
      signIn(){
          // alert('Email address is ' + this.state.email + ' Password is ' + this.state.password);    
          // const requestOptions = {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ 
          //     username: this.state.email,
          //     password: this.state.password
          //    })
          // };

          // fetch('http://localhost:3001/signin', requestOptions)
          //   .then(response => response.json())
          //   .then(data => alert(data.status));
          Axios({
            method:"POST",
            url: `URL here`,
            data: {username:this.state.email, password: this.state.pasword}
        })
        .then(rs=>{
           
        })
        .catch(err=>{
            
        })
      }

      render() {
          return (
              <form className="form-signin" style={{margin:"20px"}}>
                  <h2 className="form-signin-heading">Đăng nhập</h2>
                  <label for="inputEmail" className="sr-only">Nhập địa chỉ email
                  </label>
                  <input type="email" onChange={this.handleEmailChange}
                   id="inputEmail"
                   className="form-control" 
                   placeholder="Email" 
                   required autofocus />
                  <label for="inputPassword" className="sr-only">Mật khẩu</label>
                  <input type="password" onChange={this.handlePaswordChange}
                   id="inputPassword" 
                   className="form-control" 
                   placeholder="Mật khẩu" 
                   required />
                  <button className="btn btn-lg btn-primary btn-block" 
                   type="button" 
                   onClick={this.signIn}>
                       Đăng nhập
                  </button>
              </form>
          );
      }
}

export default Login;