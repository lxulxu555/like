import React, {Component} from 'react'
import {Form, Icon, Input, Button} from "antd";
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

import UpdateAvatarImage from '../../utils/upload-image'

class UpdateUser extends Component {


    static propTypes = {
        setForm: PropTypes.func.isRequired,
    }


    componentWillMount() {
        this.props.setForm(this.props.form)
    }


    render() {
        const {user} = this.props
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 10},
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label='我的头像: ' {...formItemLayout}>
                        <UpdateAvatarImage type='avatar'/>
                    </Form.Item>
                    <Form.Item label='用户名' {...formItemLayout}>
                        {getFieldDecorator('nickName', {
                            initialValue: user.nickName,
                        })(
                            <Input placeholder='nickName' />
                        )}
                    </Form.Item>
                    <Form.Item label='密码' {...formItemLayout}>
                        {getFieldDecorator('password', {
                            initialValue: user.password,
                        })(
                            <Input placeholder='UserName' />
                        )}
                    </Form.Item>
                    <Form.Item label='手机号' {...formItemLayout}>
                        {getFieldDecorator('phone', {
                            initialValue: user.phone,
                            rules: [
                                {min: 11, message: '手机号最少为11位'},
                                {max: 11, message: '手机号最多为11位'},
                                {pattern: /^[0-9_]+$/, message: '手机号必须为数字'}
                            ]
                        })(
                            <Input placeholder='Phone' addonBefore='+86'/>
                        )}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const form = Form.create()(UpdateUser)
export default withRouter(form)
