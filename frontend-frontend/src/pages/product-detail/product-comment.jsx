import React, { Component } from "react";
import {
  Comment,
  Modal,
  Form,
  Button,
  Input,
  Avatar,
  message,
  Icon,
} from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  SendComment,
  ReplyComment,
  LikeComment,
} from "../../redux/action/product";
import { getPostDetail } from "../../redux/action/posts";

class ProductComment extends Component {
  state = {
    visible: false,
    comment: {},
    like: "",
  };

  static propTypes = {
    getProductDetail: PropTypes.func,
  };

  getCommentsNodes = (commentList) => {
    return commentList.map((item) => {
      return (
        <Comment
          key={item.leaf === null ? item.commentId : item.id}
          actions={
            item.state === "false"
              ? [
                  <span
                    onClick={() => this.ClickReplay(item)}
                    style={{ marginRight: 15 }}
                  >
                    回复
                  </span>,
                  <Icon
                    id={item.createTime}
                    type="like"
                    style={{ marginRight: 15, cursor: "pointer" }}
                    onClick={() => this.ClickLike(item)}
                  />,
                  <p id={item.leaf === null ? item.commentId : item.id}>
                    {item.number ? item.number : 0}
                  </p>,
                ]
              : [
                  <span
                    onClick={() => this.ClickReplay(item)}
                    style={{ marginRight: 15 }}
                  >
                    回复
                  </span>,
                  <Icon
                    id={item.createTime}
                    type="like"
                    style={{
                      marginRight: 15,
                      color: "#FF0000",
                      cursor: "pointer",
                    }}
                    onClick={() => this.ClickLike(item)}
                  />,
                  <p id={item.leaf === null ? item.commentId : item.id}>
                    {item.number ? item.number : 0}
                  </p>,
                ]
          }
          author={
            item.leaf === null ? (
              <span>{item.user.nickName}</span>
            ) : (
              <span>
                {item.user.nickName} 回复了 {item.parentName}
              </span>
            )
          }
          avatar={
            <Avatar src={item.user.avatarUrl} style={{ marginLeft: 20 }} />
          }
          content={
            <p style={{ float: "left", marginTop: 10 }}>{item.content}</p>
          }
          datetime={item.createTime}
        >
          {item.replyList && this.getCommentsNodes(item.replyList)}
        </Comment>
      );
    });
  };

  ClickReplay = (comment) => {
    this.setState({
      visible: true,
      comment,
    });
  };

  ClickLike = async (item, index) => {
    if (item.state === "false") {
      document.getElementById(item.createTime).style.color = "#FF0000";
      document.getElementById(
        item.leaf === null ? item.commentId : item.id
      ).innerHTML = ++item.number;
      item.state = "true";
    } else {
      document.getElementById(item.createTime).style.color = "";
      document.getElementById(
        item.leaf === null ? item.commentId : item.id
      ).innerHTML = --item.number;
      item.state = "false";
    }
    const type =
      item.leaf === null
        ? "comment" + ":" + item.commentId
        : "reply" + ":" + item.id;
    const state = item.state === "true" ? "1" : "0";
    this.props.LikeComment(type, state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const content = values.content;
        const postId = this.props.posts.postDetail.id;
        this.props.SendComment(content, postId);
        this.props.form.resetFields();
        this.props.GetPostDetail(this.props.posts.postDetail.id);
      }
    });
  };

  ReplayComment = async () => {
    const { comment } = this.state;
    const content = document.getElementById("replayComment").value;
    const commentId = comment.commentId;
    const postId = comment.postId;
    const nameid = comment.user.id;
    const leaf = comment.leaf === null ? "0" : comment.id;
    const parentname = comment.user.nickName;
    const reply = {
      content,
      commentId,
      postId,
      nameid,
      leaf,
      parentname,
    };
    this.props.ReplyComment(reply, () => {
      this.setState({
        visible: false,
      });
      this.props.GetPostDetail(this.props.posts.postDetail.id);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.props.user;
    const { postDetail } = this.props.posts;
    const { commentList } = postDetail;
    const { visible } = this.state;
    return (
      <div>
        {commentList && this.getCommentsNodes(commentList)}
        <span style={{ display: "flex" }}>
          <Avatar size="large" src={user.avatarUrl} style={{ margin: 20 }} />
          <Form onSubmit={this.handleSubmit} style={{ width: "90%" }}>
            <Form.Item>
              {getFieldDecorator("content", {
                rules: [
                  { required: true, whiteSpace: true, message: "评论不能为空" },
                ],
              })(
                <Input.TextArea
                  placeholder="请输入您的评论"
                  style={{ marginTop: 20 }}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                发表评论
              </Button>
            </Form.Item>
          </Form>
        </span>
        <Modal
          destroyOnClose
          title="回复"
          visible={visible}
          onOk={this.ReplayComment}
          onCancel={() => this.setState({ visible: false })}
        >
          <Input id="replayComment" onPressEnter={this.ReplayComment} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, user }) => ({
  posts,
  user,
});

const mapDispatchToProps = (dispatch) => ({
  SendComment: (content, postId) => SendComment(content, postId),
  ReplyComment: (reply, callback) => ReplyComment(reply, callback),
  LikeComment: (type, state) => LikeComment(type, state),
  GetPostDetail: (id) => dispatch(getPostDetail(id)),
});

export default Form.create()(
  connect(mapStateToProps, mapDispatchToProps)(ProductComment)
);
