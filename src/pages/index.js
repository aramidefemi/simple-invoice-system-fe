import React, { useState, useEffect } from 'react';
import {
  Table,
  Layout,
  Menu,
  Button,
  Dropdown,
  Typography,
  Badge,
  Statistic,
  Card,
} from 'antd';
import { DownOutlined, EyeFilled, DeleteFilled } from '@ant-design/icons';
import AddInvoiceModal from './components/AddInvoiceModal';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

const { Text } = Typography;
const { Header, Content } = Layout;
function handleMenuClick(e) {
  console.log('click', e);
}

const RemoveInvoice = ({ payload }) => {
  const dispatch = useDispatch();

  const remove = () => {
    dispatch({
      type: 'DELETE_INVOICE',
      payload: `${payload}`,
    });
  };
  return (
    <Button type="link" onClick={remove}>
      <DeleteFilled style={{ color: 'red' }} />
    </Button>
  );
};
const columns = [
  {
    title: '',
    dataIndex: '_id',
    render: (id) => (
      <Link to={'/invoice/' + id}>
        {' '}
        <EyeFilled />
      </Link>
    ),
  },
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
    render: (date) => moment(date).format('LLL'),
  },

  {
    title: 'Share',
    dataIndex: 'operation',
    render: (text, record) => {
      const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1">Share Via Email</Menu.Item>
          <Menu.Item key="3">Share Via SMS</Menu.Item>

          <Menu.Item key="2">
            <a
              href={'https://wa.me/' + record.phone}
              target="_blank"
              rel="noreferrer"
            >
              Share Via Whatsapp
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
              href="#"
            >
              options <DownOutlined />
            </a>
          </Dropdown>
        </>
      );
    },
  },
  {
    title: 'Delete',
    dataIndex: '_id',
    render: (payload) => <RemoveInvoice payload={payload} />,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (payload) => (
      <Badge count={payload} style={{ backgroundColor: colors[payload] }} />
    ),
  },
];

const colors = {
  'paid': 'green',
  'pending': 'orange',
  'unpaid': 'red'
};

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    invoice: { invoices, stats }, 
  } = useSelector((state) => state);
  console.log('invoices', invoices);
  useEffect(() => {
    dispatch({
      type: 'GET_INVOICES',
    });
    dispatch({
      type: 'GET_PAYMENT_STATS',
    });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  console.log('stats',stats)
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
          <div className="counter">
            <Card>
              <Statistic
                title="Paid"
                value={stats && stats[0]}
                precision={1}
                valueStyle={{ color: '#3f8600' }}
                
              />
            </Card>
            <Card>
              <Statistic
                title="Pending"
                value={stats && stats[1]}
                precision={1}
                valueStyle={{ color: '#3f8600' }}
                
              />
            </Card>
            <Card>
              <Statistic
                title="Unpaid"
                value={stats && stats[2]}
                precision={1}
                valueStyle={{ color: '#3f8600' }}
                
              />
            </Card>
          </div>
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
