import React, { Component } from 'react';
import AddProduct from '../components/AddProduct';
import Web3 from 'web3'
import Marketplace from '../abis/Marketplace.json'

export default class Created extends Component {
    constructor(props) {
        super(props);
        this.state = {
          account: "",
          productCount: 0,
          products: [],
          loading: true,
        };
  
        this.createProduct = this.createProduct.bind(this);
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
          const productCount = await marketplace.methods
            .productCount()
            .call();
          this.setState({ productCount });
          // Load products
          for (var i = 1; i <= productCount; i++) {
            const product = await marketplace.methods
              .products(i)
              .call();
            this.setState({
              products: [...this.state.products, product],
            });
          }
          this.setState({ loading: false });
        } else {
          window.alert(
            "Marketplace contract not deployed to detected network."
          );
        }
      }
    createProduct(name, price) {
        this.setState({ loading: true });
        this.state.marketplace.methods
          .createProduct(name, price)
          .send({ from: this.state.account })
          .once("receipt", (receipt) => {
            this.setState({ loading: false });
          });
      }
    render() {
        return (
            <div>
                {/* <AddProduct createProduct={this.createProduct} /> */}
            </div>
        )
    }
}
