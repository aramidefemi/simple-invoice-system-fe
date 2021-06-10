import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { Layout, Menu, Button,Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
function handleMenuClick(e) {
  console.log('click', e);
}
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);
const columns = [
  {
    title: 'S/N',
    dataIndex: 'name',
    width: '25%',
    editable: true,
  },
  {
    title: 'Contact',
    dataIndex: 'age',
    width: '15%',
    editable: true,
  },
  {
    title: 'Total Amount',
    dataIndex: 'address',
    width: '40%',
    editable: true,
  },
  {
    title: 'Bill Date',
    dataIndex: 'address',
    width: '40%',
    editable: true,
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    render: (text, record) => (
      <>
         <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Hover me <DownOutlined />
    </a>
  </Dropdown>
      </>
    ),
  },
];
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const HomePage = () => {
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">Invoice System</Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default HomePage;
