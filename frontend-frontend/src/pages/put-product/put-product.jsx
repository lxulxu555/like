import React, { Component } from "react";
import { Form, Input, Button } from "antd";

import "./put-product.less";
import PictureWall from "../../utils/upload-image";
import { connect } from "react-redux";
import { PutNewProduct } from "../../redux/action/product";

const { TextArea } = Input;

class PutProduct extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const arr = [];
        this.props.productImage.imageList.map((item) => {
          arr.push(item.url);
        });
        values.classify_id = 1;
        values.imagesUrl = arr.toString();
        this.props.PutNewProduct(values);
        this.props.history.replace("/posts");
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };

    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form className="small-background" onSubmit={this.handleSubmit}>
          <span className="title">发布帖子</span>
          <Form.Item
            label="帖子标题："
            {...formItemLayout}
            style={{ paddingTop: 30 }}
          >
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入帖子标题" }],
            })(<Input placeholder="请输入帖子标题" />)}
          </Form.Item>
          <Form.Item label="帖子内容：" {...formItemLayout}>
            {getFieldDecorator("content", {
              rules: [{ required: true, message: "请输入帖子内容" }],
            })(<TextArea placeholder="请输入帖子内容" />)}
          </Form.Item>
          <Form.Item label="产品图片：" {...formItemLayout}>
            <PictureWall />
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginBottom: 10 }}>
            提交
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ user, productImage }) => ({
  user,
  productImage,
});

const mapDispatchToProps = (dispatch) => ({
  PutNewProduct: (values) =>
    dispatch(PutNewProduct(values)),
});

export default Form.create()(
  connect(mapStateToProps, mapDispatchToProps)(PutProduct)
);
