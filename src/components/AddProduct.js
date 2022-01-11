import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import AddBoxIcon from '@material-ui/icons/AddBox';
class AddProduct extends React.Component {
  constructor(props){
    super(props)
    this.state={
      setShow:false
    }
  }
  handleClose = () => this.setState({setShow:false});
  handleShow = () => this.setState({setShow:true});
  addProduct=(e)=>{
    e.preventDefault();
    const name = this.productName.value;
    const price = window.web3.utils.toWei(this.productPrice.value.toString(), "Ether");
    this.props.createProduct(name, price);
  }

  buttonAble = () => this.setState();

  uploadImg=(event)=>{
    if (event.target.files && event.target.files[0]) {
      // 
      // reader.readAsDataURL(input.files[0]);
      let file= event.target.files[0];
      let reader = new FileReader();
      let url = reader.readAsDataURL(file)
      reader.onloadend = ()=> {
        console.log(reader.result)
      }   
    }
  }
    render(){
        return (
          <div>
            <Modal
              show={this.state.setShow}
              onHide={this.handleClose}
              animation={true}
            >
              <Modal.Header closeButton>
                <Modal.Title>ADD PRODUCT</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group mr-sm-2">
                    <input
                      id="productName"
                      type="text"
                      ref={(input) => {
                        this.productName = input;
                      }}
                      className="form-control"
                      placeholder="Product Name"
                      required
                    />
                  </div>
                  <div className="form-group mr-sm-2">
                    <input
                      id="productPrice"
                      type="text"
                      ref={(input) => {
                        this.productPrice = input;                        
                      }}
                      className="form-control"
                      placeholder="Product Price"
                      required
                    />
                  </div>
                  <div className="form-group mr-sm-2">
                    <input
                      id="imgProduct"
                      type="file"
                      onChange={this.uploadImg}
                      required
                    />
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.addProduct}>
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="Add-Product">
             <AddBoxIcon onClick={this.handleShow} className="Add" style={{cursor:"pointer"}}/>
            </div>
            <p>&nbsp;</p>
          
          </div>
        );
    }
  }

export default AddProduct;