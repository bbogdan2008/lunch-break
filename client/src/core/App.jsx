import { hot } from 'react-hot-loader';
import React from 'react';

import { Layout, Row, Col } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faSquare } from '@fortawesome/free-solid-svg-icons';

import Home from '../components/Home';
import LoginForm from '../components/LoginForm';

const { Header, Content, Footer } = Layout;

const App = () => (
  <Layout className="layout">
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        lineHeight: '40px',
        height: '40px',
      }}
    >
      <Row>
        <Col span={4}>
          <div className="fa-layers fa-fw">
            <FontAwesomeIcon icon={faSquare} color="red" size="3x" />
            <FontAwesomeIcon
              icon={faUtensils}
              color="white"
              size="2x"
              transform="right-4"
            />
          </div>
        </Col>
        <Col span={20}>
          <LoginForm />
        </Col>
      </Row>
    </Header>
    <Content style={{ padding: '0 50px', minHeight: 280, marginTop: 64 }}>
      <Home />
      {' '}
sds
    </Content>
    <Footer style={{ textAlign: 'center' }}> ©2019 Created by </Footer>
  </Layout>
);

export default hot(module)(App);
