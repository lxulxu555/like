import React, { Component } from "react";
import { Card, Icon, Pagination, Input, Button, Avatar, Spin } from "antd";
import { Link, withRouter } from "react-router-dom";
import "./posts.less";
import { connect } from "react-redux";
import { savePostsPage, getAllPosts } from "../../redux/action/posts";

class Posts extends Component {
  state = {
    condition: {
      rows: 10,
      page: 1,
    },
  };

  getAllPosts = (page) => {
    const { condition } = this.state;
    this.props.GetAllPosts({ ...condition, page });
  };

  changePage = (page) => {
    this.props.SavePostsPage(page);
    this.getAllPosts(page);
  };

  showNewsView = (data) => {
    return data.map((item) => {
      const images = item.imagesUrl.split(",");
      return (
        <Link
          key={item.id}
          to={{
            pathname: `/posts-detail/${item.id}`
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
            <div className="posts-userInfo">
              <Avatar src={item.user.avatarUrl} />
              <span className="posts-userInfo-nickName">
                {item.user.nickName}
              </span>
            </div>
          </Card>
        </Link>
      );
    });
  };

  SearchName = async (title) => {
    this.props.GetAllPosts({ ...this.state.condition, searchName: title });
  };

  componentDidMount() {
    const { postsPage } = this.props.productPage;
    this.getAllPosts(postsPage);
  }

  render() {
    const { postsPage } = this.props.productPage;
    const { allPosts ,loading} = this.props.posts;
    const { total, data } = allPosts;
    return (
      <Spin tip="Loading..." spinning={loading}>
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
          {data && this.showNewsView(data)}
          <Pagination
            defaultPageSize={10}
            current={postsPage}
            total={total}
            onChange={this.changePage}
            style={{ textAlign: "center", marginTop: 20 }}
          />
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = ({ user, posts, productPage }) => ({
  user,
  posts,
  productPage,
});

const mapDispatchToProps = (dispatch) => ({
  GetAllPosts: (condition) => dispatch(getAllPosts(condition)),
  SavePostsPage: (page) => dispatch(savePostsPage(page)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
