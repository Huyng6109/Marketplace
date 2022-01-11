import { ReactComponent as BellIcon } from "../Image/Shop/icon/bell.svg";
import { ReactComponent as MessengerIcon } from "../Image/Shop/icon/messenger.svg";
import { ReactComponent as CaretIcon } from "../Image/Shop/icon/caret.svg";
import { ReactComponent as PlusIcon } from "../Image/Shop/icon/plus.svg";
import React, { useState } from "react";
import "../css/Header.css";
import "../css/Shop.css";
import DropdownMenu from "./dropDownMenu";
import "./index.css";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <span
      style={{ display: "flex", justifyContent: "flex-end", float: "right" }}
    >
      <a
        className="icon-button"
        onClick={() => {
          switch (props.type) {
            case "dropdownmenu":
              console.log("123");

              setOpen(!open);
              break;
            case "addproduct":
              props.callback();
              break;
            default:
              break;
          }
        }}
        style={{ width: "50px", height: "50px" }}
      >
        {props.icon}
      </a>

      {open && props.children}
    </span>
  );
}

class Header extends React.Component {
  //const [{ basket }] = useStateValue();
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      productCount: 0,
      products: [],
      loading: true,
      setShow: false,
    };
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    localStorage.setItem("account", accounts[0]);
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      this.setState({ marketplace });
      const productCount = await marketplace.methods.productCount().call();
      this.setState({ productCount });
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        this.setState({
          products: [...this.state.products, product],
        });
      }
      this.setState({ loading: false });
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }
  createProduct = (name, price) => {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .createProduct(name, price)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  };
  // Modal func
  handleClose = () => this.setState({ setShow: false });
  handleShow = () => this.setState({ setShow: true });
  addProduct = (e) => {
    e.preventDefault();
    const name = this.productName.value;
    const price = window.web3.utils.toWei(
      this.productPrice.value.toString(),
      "Ether"
    );
    this.createProduct(name, price);
  };

  buttonAble = () => this.setState();

  uploadImg = (event) => {
    if (event.target.files && event.target.files[0]) {
      //
      // reader.readAsDataURL(input.files[0]);
      let file = event.target.files[0];
      let reader = new FileReader();
      let url = reader.readAsDataURL(file);
      reader.onloadend = () => {
        console.log(reader.result);
      };
    }
  };
  render() {
    return (
      <div className="header-wrapper">
        <nav style={{ display: "flow-root", background: "rgb(0 0 0)" }}>
          <ul>
            <li>
              <NavItem
                icon={<CaretIcon height="50" style={{ color: "#fff" }} />}
                type={"dropdownmenu"}
              >
                <DropdownMenu></DropdownMenu>
              </NavItem>
            </li>
            <li>
              <NavItem
                icon={<PlusIcon />}
                callback={this.handleShow}
                type={"addproduct"}
              />
            </li>
            <li>
              <NavItem icon={<BellIcon type={"123"} />} />
            </li>
            <li>
              <div className="header__search">
                <img
                  src={require("../Image/Picture1.png")}
                  style={{ width: "50px", height: "50px" }}
                />
                
                <input type="text" className="header__searchInput" />
              </div>
            </li>
          </ul>
        </nav>
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
      </div>
    );
  }
}

export default Header;
