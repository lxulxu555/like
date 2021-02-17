import React, { Component } from "react";
import { Card, Icon, Pagination, Input, Button, Spin } from "antd";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { saveNewsPage, getAllNews } from "../../redux/action/news";

class News extends Component {
  state = {
    condition: {
      rows: 10,
      page: 1,
    },
  };

  getAllNews = (page) => {
    const { condition } = this.state;
    this.props.GetAllNews({ ...condition, page });
  };

  changePage = (page) => {
    this.props.SaveNewsPage(page);
    this.getAllNews(page);
  };

  showNewsView = (data) => {
    return data.map((item) => {
      const images = item.matterUrl.split(",");
      return (
        <Link
          key={item.id}
          to={{
            pathname: "/news-detail",
            state: item.id,
          }}
        >
          <Card
            title={item.title}
            bordered={false}
            style={{ margin: "1% 10% 3% 10%" }}
          >
            <p>
              {images.map((item, index) => {
                return (
                  <img
                    src={item}
                    style={{ width: 150, height: 150, marginLeft: 5 }}
                    alt="img"
                    key={index}
                  />
                );
              })}
            </p>
            <p>{item.createTime}</p>
          </Card>
        </Link>
      );
    });
  };

  SearchName = async (title) => {
    this.props.GetAllNews({ ...this.state.condition, title });
  };

  componentDidMount() {
    const { newsPage } = this.props.productPage;
    this.getAllNews(newsPage);
  }

  render() {
    const { newsPage } = this.props.productPage;
    const { newsData, loading } = this.props.news;
    const { total, data } = newsData;
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <Input
              id="input"
              placeholder="请输入关键字"
              style={{ width: 400, height: 40, marginTop: 12 }}
              addonBefore={<Icon type="search" />}
              onPressEnter={() =>
                this.SearchName(document.getElementById("input").value)
              }
            />
            <Button
              type="primary"
              style={{
                width: 63,
                marginTop: 13,
                height: 30,
                borderRadius: 0,
                borderBottomRightRadius: "5px",
                borderTopRightRadius: "5px",
              }}
              onClick={() =>
                this.SearchName(document.getElementById("input").value)
              }
            >
              搜索
            </Button>
          </div>
        </div>
        <Spin  tip="Loading..." spinning={loading}>
          {data && this.showNewsView(data)}
          <Pagination
            defaultPageSize={10}
            current={newsPage}
            total={total}
            onChange={this.changePage}
            style={{ textAlign: "center", marginTop: 20 }}
          />
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = ({ user, news, productPage }) => ({
  user,
  news,
  productPage,
});

const mapDispatchToProps = (dispatch) => ({
  GetAllNews: (condition) => dispatch(getAllNews(condition)),
  SaveNewsPage: (page) => dispatch(saveNewsPage(page)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News));
