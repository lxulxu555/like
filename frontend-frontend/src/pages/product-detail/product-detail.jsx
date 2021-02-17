import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./product-detail.less";
import { Icon, Modal, BackTop, Spin } from "antd";
import { connect } from "react-redux";
import LinkButton from "../../components/link-button/link-button";
import { GetProductDetail,cleanProductDetail } from "../../redux/action/product";

class ProductDetail extends Component {
  state = {
    BigImageUrl: "",
    visible: false,
  };

  getProductDetail = async () => {
    this.props.GetProductDetail(this.props.location.state);
  };

  BigImage = (url) => {
    const BigImageUrl = url;
    this.setState({
      BigImageUrl,
    });
  };

  imageList = () => {
    const { detail } = this.props.productDetail;
    const { images } = detail;
    const image = images.split(",");
    if (image && image.length > 0) {
      return image.map((Item) => {
        return (
          <img
            src={Item}
            onClick={() => this.BigImage(Item)}
            style={{ width: 100, height: 80, marginLeft: 5 }}
            alt="img"
            key={Item}
          />
        );
      });
    }
  };

  componentDidMount() {
    this.getProductDetail();
    document.getElementById("root").scrollIntoView(true); //为ture返回顶部，false为底部
  }

  componentWillUnmount(){
    this.props.cleanProductDetail()
  }

  render() {
    const { BigImageUrl, visible } = this.state;
    const { detail,loading } = this.props.productDetail;
    const { images } = detail;
    const image = images.split(",")[0];

    return (
      <div className="small-background">
        <div className="product-detail-goback">
          <LinkButton>
            <Icon
              type="arrow-left"
              className="product-detail-goback-icon"
              onClick={() => this.props.history.goBack()}
            />
          </LinkButton>
          <span className="product-detail-goback-text">商品详情</span>
        </div>
        <Spin tip="Loading..." spinning={loading}>
          <div className="detail">
            <div className="image-wall">
              {
                <span
                  onClick={() =>
                    this.setState({
                      visible: true,
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  {BigImageUrl ? (
                    <img
                      src={BigImageUrl}
                      style={{ width: 300, height: 300, border: "1px solid" }}
                      alt="img"
                    />
                  ) : (
                    <img
                      src={image}
                      style={{ width: 300, height: 300, border: "1px solid" }}
                      alt="img"
                    />
                  )}
                </span>
              }
              <span className="image-small">{this.imageList()}</span>
            </div>
            <div className="right-detail">
              <span className="detail-title">{detail.name}</span>
              <span className="detailIntro">{detail.intro}</span>
              <span className="a">
                <Icon
                  type="dollar-circle"
                  theme="filled"
                  style={{ paddingRight: 15 }}
                />
                {detail.price}元
              </span>
              <span className="a">
                <Icon
                  type="notification"
                  theme="filled"
                  style={{ paddingRight: 15 }}
                />
                {detail.createTime}
              </span>
            </div>

            <Modal
              visible={visible}
              onCancel={() => {
                this.setState({
                  visible: false,
                });
              }}
              footer={null}
            >
              {BigImageUrl ? (
                <img
                  src={BigImageUrl}
                  alt="img"
                  style={{ width: 500, height: 500 }}
                />
              ) : (
                <img
                  src={image}
                  alt="img"
                  style={{ width: 500, height: 500 }}
                />
              )}
            </Modal>
            <BackTop />
          </div>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = ({ productDetail, user }) => ({
  productDetail,
  user,
});

const mapDispatchToProps = (dispatch) => ({
  GetProductDetail: (id) => dispatch(GetProductDetail(id)),
  cleanProductDetail : () =>  dispatch(cleanProductDetail())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
);
