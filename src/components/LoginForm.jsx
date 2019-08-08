import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Icon, Input, Button } from 'antd';
import './LoginForm.css';
import { doLogin } from '../login/LoginAction';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  render() {

    const { username, password } = this.state;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit} className="form">
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            name="username" value={username}
            onChange={this.handleChange} />
        </Form.Item>
        <Form.Item>
          <Input type="password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password"
            name="password" value={password}
            onChange={this.handleChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Log In</Button>
        </Form.Item>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return { isLoading: state.login.isLoading }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      dispatch(doLogin(username, password))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
