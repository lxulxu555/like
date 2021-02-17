import React, { Component } from "react";
import { Carousel, Menu, Input, Icon, Button, Spin } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./home.less";
import Product from "./product";
import {
  GetAllClass,
  SaveScroll,
  getAllCarousel,
  GetAllProduct,
} from "../../redux/action/product";

class Home extends Component {
  state = {
    One: [],
    success: false,
    initWidth: 0,
    carousel: [],
    condition: {
      classify: null,
      goodsName: null,
      page: 1,
      rows: 30,
    },
    loading: false,
  };

  getOneList = () => {
    const One = this.props.productAllClass;
    One.length = 9;
    return One.map((item) => {
      return <Menu.Item key={item.id}>{item.name}</Menu.Item>;
    });
  };

  handleClick = ({ item }) => {
    this.props.GetAllProduct({ ...this.state.condition, classify: item.key });
    if (document.getElementById("input").value !== "") {
      document.getElementById("input").value = "";
    }
  };

  SearchName = () => {
    const goodsName = this.textInput.state.value;
    this.props.GetAllProduct({ ...this.state.condition, goodsName });
  };

  scroll = () => {
    const y = this.props.productScroll.scroll;
    const x = window.scrollX;
    setTimeout(() => {
      window.scrollTo(x, y);
    }, 500);
  };

  handleScroll = () => {
    const scroll = document.scrollingElement.scrollTop;
    this.props.SaveScroll(scroll);
  };

  initCarouselWidth = () => {
    this.setState({
      initWidth: window.screen.width,
    });
  };

  getCarouselView = () => {
    return this.state.carousel.map((item) => {
      return (
        <img
          key={item.id}
          src={item.url}
          alt={item.title}
          className="home-carousel-image"
          style={{ width: this.state.initWidth - 300 }}
        />
      );
    });
  };

  initData = async () => {
    this.setState({
      loading: true,
    });
    this.props.getAllClass();
    const carousel = await getAllCarousel();
    this.setState({
      carousel,
      loading: false,
    });
  };

  componentDidMount() {
    this.scroll();
    this.initCarouselWidth();
    this.initData();
  }

  componentWillUnmount() {
    this.handleScroll();
  }

  render() {
    const { classify, goodsName, initWidth, loading } = this.state;

    const condition = { classify, goodsName };

    return (
      <div>
        <Spin tip="Loading..." spinning={loading}>
          <div className="home-top">
            <div style={{ marginBottom: 10 }}>
              <Menu
                onClick={(item) => this.handleClick({ item })}
                mode="vertical"
                theme={"dark"}
                className="menu"
              >
                {this.getOneList()}
              </Menu>
            </div>

            <div className="carousel-view">
              {this.state.carousel.length !== 0 && (
                <Carousel
                  autoplay
                  className="home-carousel"
                  style={{ width: initWidth - 300 }}
                >
                  {this.getCarouselView()}
                </Carousel>
              )}

              <div className="home-search">
                <Input
                  id="input"
                  placeholder="请输入关键字"
                  className="search"
                  addonBefore={<Icon type="search" />}
                  ref={(input) => (this.textInput = input)}
                  onPressEnter={() => this.SearchName()}
                />

                <Button type="primary" onClick={() => this.SearchName()}>
                  搜索
                </Button>
              </div>
            </div>
          </div>
        </Spin>

        <span>
          <Product condition={condition} />
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({ user, productAllClass, productScroll }) => ({
  user,
  productAllClass,
  productScroll,
});

const mapDispatchToProps = (dispatch) => ({
  getAllClass: () => dispatch(GetAllClass()),
  SaveScroll: (scroll) => dispatch(SaveScroll(scroll)),
  GetAllProduct: (condition) => dispatch(GetAllProduct(condition)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
