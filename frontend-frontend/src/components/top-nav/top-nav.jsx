import React, { Component } from "react";
import { Menu, Avatar, Modal, Icon, Popover } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./top-nav.less";
import LinkButton from "../link-button/link-button";
import UpdateUser from "../../pages/update-user/update-user";
import { UserMessage, updateUser, loginOutUser } from "../../redux/action/user";

const SubMenu = Menu.SubMenu;

class TopNav extends Component {
  state = {
    ShowUpdate: false,
  };

  getLookUserReplay = async () => {
    const id = this.props.user.id || "";
    this.props.getMessage(id);
  };

  GoLogin = () => {
    this.props.history.replace("/login");
  };

  LoginOut = () => {
    Modal.confirm({
      title: "确认退出吗",
      onOk: () => {
        window.localStorage.removeItem("UserInfo");
        this.props.loginOutUser();
      },
    });
  };

  UpdateUser = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState(
          {
            ShowUpdate: false,
          },
          () => {
            values.avatarUrl = this.props.uploadAvatarImage.image;
            values.id = this.props.user.user.id;
            this.props.updateUser(values);
          }
        );
      }
    });
  };

  goInitHome = () => {
    this.props.history.replace("/");
    // Page.SavePage(1)
  };


  ReadyMessage = () => {
    this.props.history.replace("/unread-information");
    this.props.getMessage(this.props.user.id);
  };

  componentWillMount() {
    //  this.getLookUserReplay()
  }

  render() {
    let path = this.props.location.pathname;
    const {user} = this.props.user || "";
    const { ShowUpdate } = this.state;
    return (
      <div>
        <div
          className="logo"
          onClick={this.goInitHome}
          style={{ cursor: "pointer" }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[path]}
          style={{ lineHeight: "64px", float: "left" }}
        >
          <Menu.Item key="/home" onClick={this.goInitHome}>
            首页
          </Menu.Item>
          <Menu.Item key="/news">
            <Link to="/news">资讯</Link>
          </Menu.Item>
          <Menu.Item key="/posts">
            <Link to="/posts">帖子</Link>
          </Menu.Item>
        </Menu>

        {user ? (
          <div>
            <LinkButton
              style={{ float: "right", marginRight: "15px" }}
              onClick={() => {
                this.setState({
                  ShowUpdate: true,
                });
              }}
            >
              <Popover content={<span>更新自己的个人信息</span>}>
                <Avatar icon="user" className="avatar" src={user.avatarUrl} />
              </Popover>
            </LinkButton>
            <LinkButton
              style={{
                float: "right",
                marginRight: "15px",
                pointerEvents: "none",
              }}
            >
              欢迎您，{user.nickName}
            </LinkButton>
            <LinkButton
              style={{ float: "right", marginRight: "15px" }}
              onClick={this.LoginOut}
            >
              退出账户
            </LinkButton>

            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: "64px", float: "right", marginRight: 30 }}
              selectedKeys={[path]}
            >
              <SubMenu key="/productHome" title="发布">
                <Menu.Item key="/product">
                  <Link to="/put-post">发布帖子</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>

            {/* <Popover
                                content={<span>{user.nickname}，您拥有0 条未读信息，
                                    <LinkButton
                                        onClick={this.ReadyMessage}>点击查看</LinkButton></span>}>
                                {
                                    message > 0 ?
                                        <Icon type="mail" className='HaveMessage'/> :
                                        <Icon type="mail" className='NoMessage'/>
                                }
                            </Popover> */}
          </div>
        ) : (
          <LinkButton
            onClick={this.GoLogin}
            style={{ float: "right", marginRight: "15px" }}
          >
            登录/注册
          </LinkButton>
        )}

        <Modal
          title="个人信息"
          visible={ShowUpdate}
          onOk={this.UpdateUser}
          onCancel={() => {
            this.setState({
              ShowUpdate: false,
            });
            this.form.resetFields();
          }}
        >
          <UpdateUser
            setForm={(form) => {
              this.form = form;
            }}
            user={user}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ user, userMessage, uploadAvatarImage }) => ({
  user,
  userMessage,
  uploadAvatarImage,
});

const mapDispatchToProps = (dispatch) => ({
  loginOutUser: () => dispatch(loginOutUser()),
  getMessage: (id) => dispatch(UserMessage(id)),
  updateUser: (user, callback) => dispatch(updateUser(user, callback)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNav));
