import React, { Component } from 'react';

class Admin extends React.Component {
  render(){
    return (
      <div id="content">
      <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value 
          const price = new window.web3.utils.toWei(this.productPrice.value.toString(), 'ether')
          this.props.createProduct(name, price)
        }}>
            <div className="form-group mr-sm-2">
              <input
              id="productName"
              type="text"
              ref={(input) => {this.productName = input}}
              className="form-control"
              placeholder="Product Name"
              required/>
          </div>
          <div className="form-group mr-sm-2">
              <input
              id="productPrice"
              type="text"
              ref={(input) => {this.productPrice = input}}
              className="form-control"
              placeholder="Product Price"
              required/>
          </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
        </div>
      )
    }
}

export default Admin;
