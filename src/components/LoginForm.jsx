import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './LoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
      
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    console.log("Login action ...");
  }

  render() {
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} className="form">
        <Form.Item>
          <Input 
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username" />
        </Form.Item>
        <Form.Item>
          <Input type="password" 
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Log In</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default LoginForm;