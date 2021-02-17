import React, { Component } from "react";
import { Card, Icon, Avatar,Spin } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getPostDetail } from "../../redux/action/posts";
import ProductComment from "../product-detail/product-comment";
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
    const images = data.imagesUrl;
    const image = images.split(",");
    return (
      <div>
        <div className="news-detail-title">{data.title}</div>
        <div style={{ textAlign: "center" }}>
          <Avatar src={data.user.avatarUrl} />
          <span className="posts-userInfo-nickName">{data.user.nickName}</span>
        </div>
        <div className="news-detail-time">{data.createTime}</div>
        <div className="news-detail-conetnt">{data.content}</div>
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
    const path = window.location.pathname
    const id = path.charAt(path.lastIndexOf('/') + 1)
    this.props.GetPostDetail(id);
  }

  render() {
    const { postDetail ,loading} = this.props.posts;
    return (
      <div className="news-bg">
        <Spin tip="Loading..." spinning={loading}>
          <div className="news-detail-goback">
            <LinkButton>
              <Icon
                type="arrow-left"
                className="news-goback-icon"
                onClick={() => this.props.history.goBack()}
              />
            </LinkButton>
            <span className="news-goback-text">帖子详情</span>
          </div>
          {postDetail.id && this.showDetailView(postDetail)}
          <div className="comment">评论墙</div>
          <ProductComment />
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts,
});

const mapDispatchToProps = (dispatch) => ({
  GetPostDetail: (id) => dispatch(getPostDetail(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
