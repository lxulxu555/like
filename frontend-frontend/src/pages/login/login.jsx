import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Input, Button, Form, Icon, Row, Col, Radio } from "antd";
import logo from "./images/logo.png";
import "./login.less";
import { LoginUser, register } from "../../redux/action/user";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    user: {},
    type: "login",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };

  SubmitRegister = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        register(values)
        this.setState({
          type: "login",
        });
      }
    });
  };

  changeType = (type) => {
    this.setState({ type });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    const { getFieldDecorator } = this.props.form;
    const { type } = this.state;
    return (
      <div className="login">
        <div className="login-header">
          <Link to="/home">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="content">
          <div
            className="login-content"
            style={type === "register" ? { height: 350 } : { height: 300 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {type === "login" ? (
                <div />
              ) : (
                <Icon
                  type="arrow-left"
                  className="left-icon-father"
                  onClick={() => this.changeType("login")}
                />
              )}
              <h2 style={{ width: "100%", textAlign: "center" }}>
                土特产推荐系统
              </h2>
            </div>
            {type === "login" ? (
              <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item {...formItemLayout} label="用户名">
                    {getFieldDecorator("nickName", {
                      rules: [
                        {
                          required: true,
                          whiteSpace: true,
                          message: "用户名必须输入",
                        },
                      ],
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Username"
                      />
                    )}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="密码">
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          whiteSpace: true,
                          message: "密码必须输入",
                        },
                      ],
                    })(
                      <span>
                        <Input.Password
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          type="password"
                          placeholder="Password"
                          onPressEnter={this.handleSubmit}
                        />
                      </span>
                    )}
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: 100 }}
                    >
                      登录
                    </Button>
                    <Button
                      type="primary"
                      style={{ marginLeft: 100, width: 100 }}
                      onClick={() => this.changeType("register")}
                    >
                      注册
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            ) : (
              <Form onSubmit={this.SubmitRegister} className="login-form">
                <Form.Item label="用户名" {...formItemLayout}>
                  {getFieldDecorator("nickName", {
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        whiteSpace: true,
                        message: "用户名必须输入",
                      },
                    ],
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Username"
                    />
                  )}
                </Form.Item>

                <Form.Item label="密码" {...formItemLayout}>
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        whiteSpace: true,
                        message: "密码必须输入",
                      },
                    ],
                  })(
                    <Input.Password
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                    />
                  )}
                </Form.Item>

                <Form.Item label="手机号" {...formItemLayout}>
                  {getFieldDecorator("phone", {
                    rules: [
                      { min: 11, message: "手机号最少为11位" },
                      { max: 11, message: "手机号最多为11位" },
                      { pattern: /^[0-9_]+$/, message: "手机号必须为数字" },
                    ],
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="phone"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Phone"
                      addonBefore="+86"
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ width: "100%", marginBottom: -20 }}
                  >
                    注册
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(LoginUser(user)),
});

const WrapLogin = Form.create()(Login);
const Router = withRouter(WrapLogin);
export default connect(mapStateToProps, mapDispatchToProps)(Router);
