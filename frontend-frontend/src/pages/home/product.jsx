import React, { Component } from "react";
import { BackTop, Card, Pagination, Empty, Spin } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { GetAllProduct, SaveProductPage } from "../../redux/action/product";

const { Meta } = Card;

class Product extends Component {
  state = {
    condition: {
      rows: 30,
    },
  };

  //获取指定页码数据显示
  getAllProduct = async (page) => {
    const { condition } = this.state;
    window.scrollTo(0, 0);
    this.props.getAllProduct({ ...condition, page });
  };

  changePage = (page) => {
    this.props.saveProductPage(page);
    this.getAllProduct(page);
  };

  getAllProductList = (data) => {
    if (data.length !== 0) {
      return data.map((product) => {
        const { images } = product;
        const cover = images.split(",")[0];
        return (
          <Link
            key={product.id}
            className="home-product-detail"
            to={{
              pathname: "/product-detail",
              state: product.id,
            }}
          >
            <Card
              hoverable={true}
              cover={
                <img alt={product.name} src={cover} style={{ height: 218 }} />
              }
            >
              <Meta
                title={product.name}
                description={
                  <span style={{ color: "#FF0000" }}>￥{product.price}</span>
                }
                style={{ fontSize: 20 }}
              />
              <Meta description={"于" + product.createTime + "发布"} />
            </Card>
          </Link>
        );
      });
    } else {
      return (
        <div style={{ width: "100%", marginTop: 100 }}>
          <Empty className="NoProduct" />
        </div>
      );
    }
  };

  componentDidMount() {
    const { page } = this.props.productPage;
    this.getAllProduct(page);
  }

  render() {
    const { allProduct,loading } = this.props.productAll;
    const { total } = allProduct;
    const { page } = this.props.productPage;
    return (
      <div>
        <Spin tip="Loading..." spinning={loading}>
          <div className="home-product-cnotext">{allProduct.data && this.getAllProductList(allProduct.data)}</div>
          <Pagination
            defaultPageSize={30}
            current={page}
            total={total}
            onChange={this.changePage}
            style={{ textAlign: "center", marginTop: 20 }}
          />
          <div>
            <BackTop />
          </div>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = ({ productAll, productPage }) => ({
  productPage,
  productAll,
});

const mapDispatchToProps = (dispatch) => ({
  getAllProduct: (condition) => dispatch(GetAllProduct(condition)),
  saveProductPage: (page) => dispatch(SaveProductPage(page)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
