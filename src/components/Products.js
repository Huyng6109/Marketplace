import { Remove } from "@material-ui/icons";
import React, { Component } from "react";
import "../css/Product.css";

export default class Products extends Component {
  convertMoney = (price) => {
    return window.web3.utils.fromWei(price.toString(), "Ether");
  };
  renderBuyButton = (item) => {
    if (!item.purchased) {
      return (
        <div className="snipcart-details top_brand_home_details">
          <form action="#" method="post">
            <fieldset>
              <button
                style={{ width: "100%" }}
                name={item.id}
                value={item.price}
                onClick={(event) => {
                  this.props.purchaseProduct(
                    event.target.name,
                    event.target.value
                  );
                }}
                className="btn btn-info"
              >
                Buy
              </button>
            </fieldset>
          </form>
        </div>
      );
    }
  };

  renderProductBox = () => {
    if (this.props.products) {
      return this.props.products.map((item, index) => {
        return (
          <div className="col-md-4 top_brand_left" key={index}>
            <div className="hover14 column">
              <div className="agile_top_brand_left_grid">
                <div className="agile_top_brand_left_grid1">
                  <figure>
                    <div className="snipcart-item block">
                      <div className="snipcart-thumb">
                        <div
                          className="product-img"
                          style={{
                            height: "70%",
                            display: "flex",
                          }}
                        >
                          <img
                            style={{ width: "12rem" }}
                            src={require("../Image/gift_product.png")}
                          />
                        </div>
                        <div className="product-id" style={{ opacity: 0 }}>
                          {item.id.toString()}
                        </div>
                        <p>{item.name}</p>
                        <h4>{this.convertMoney(item.price)} Eth</h4>
                      </div>
                      <div className="snipcart-details top_brand_home_details">
                      </div>
                    </div>
                  </figure>
                  {this.renderBuyButton(item)}
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <div></div>;
    }
  };
  render() {
    return (
      <div className="my-2">
        <div className="container" >
          <div className="row">{this.renderProductBox()}</div>
         </div>
      </div>
    );
  }
}
