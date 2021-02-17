import React, { Component } from "react";
import { Card, Icon, Spin } from "antd";
import { Link, withRouter } from "react-router-dom";
import "./news.less";
import { connect } from "react-redux";
import { getAllNews } from "../../redux/action/news";
import LinkButton from "../../components/link-button/link-button";

class Detail extends Component {
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

  showDetailView = (data) => {
    const images = data[0].matterUrl;
    const image = images.split(",");
    return (
      <div>
        <div className="news-detail-title">{data[0].title}</div>
        <div className="news-detail-time">{data[0].createTime}</div>
        <div className="news-detail-conetnt">{data[0].content}</div>
        <div className="news-detail-images">
          {image.map((Item) => {
            return (
              <img
                src={Item}
                alt="img"
                className="news-detail-images-image"
                key={Item}
              />
            );
          })}
        </div>
      </div>
    );
  };
  componentDidMount() {
    document.getElementById("root").scrollIntoView(true); //为ture返回顶部，false为底部
    this.props.GetAllNews({ id: this.props.location.state });
  }


  render() {
    const { newsData, loading } = this.props.news;
    return (
      <Spin tip="Loading..." spinning={loading}>
        <div className="news-bg">
          <div className="news-detail-goback">
            <LinkButton>
              <Icon
                type="arrow-left"
                className="news-goback-icon"
                onClick={() => this.props.history.goBack()}
              />
            </LinkButton>
            <span className="news-goback-text">资讯详情</span>
          </div>
          {newsData.data && this.showDetailView(newsData.data)}
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = ({ news }) => ({
  news,
});

const mapDispatchToProps = (dispatch) => ({
  GetAllNews: (condition) => dispatch(getAllNews(condition)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
