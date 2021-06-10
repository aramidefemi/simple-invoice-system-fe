import React, { useState, useEffect } from 'react';
import { Table, Layout, Menu, Button, Dropdown, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import AddInvoiceModal from './components/AddInvoiceModal';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const { Text } = Typography;
const { Header, Content } = Layout;
function handleMenuClick(e) {
  console.log('click', e);
}

const columns = [
  {
    title: 'S/N',
    dataIndex: '_id',
    render: (str) => <Text>{str.slice(0, 7)}</Text>,
  },

  {
    title: 'Contact',
    dataIndex: 'contact',
    render: (text, record) => (
      <>
        <Text>{record.email}</Text>
        <br />
        <Text type="secondary">{record.phone}</Text>
      </>
    ),
  },
  {
    title: 'Billed to',
    dataIndex: 'company',
  },
  {
    title: 'Design Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Bill Date',
    dataIndex: 'createdAt',
  },
  {
    title: 'Operation',
    dataIndex: 'operation',
    render: (text, record) => {
      const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1">Share Via Email</Menu.Item>
          <Menu.Item key="3">Share Via Whatsapp</Menu.Item>
          <Menu.Item key="4">
            <Link to={"/invoice"+ record._id}>Open Invoice</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <a
              href={'https://wa.me/' + record.phone}
              target="_blank"
              rel="noreferrer"
            >
              Copy Link
            </a>
          </Menu.Item>
        </Menu>
      );
      return (
        <>
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Send Out <DownOutlined />
            </a>
          </Dropdown>
        </>
      );
    },
  },
];

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    invoice: { invoices },
  } = useSelector((state) => state);
  console.log('invoices', invoices);
  useEffect(() => {
    dispatch({
      type: 'GET_INVOICES',
    });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

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
          <Button type="primary" onClick={showModal}>
            Add Invoice
          </Button>
          <br />
          <br />
          <Table dataSource={invoices} columns={columns} />
        </div>
      </Content>
      <AddInvoiceModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </Layout>
  );
};

export default HomePage;
