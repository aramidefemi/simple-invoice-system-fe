import React from 'react';
import { Button, Input, Form } from 'antd';
import { useDispatch } from 'react-redux';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const NewInvoiceForm = ({ handleOk }) => {
  const dispatch = useDispatch();
  const onFinish = (payload) => {
    dispatch({
      type: 'ADD_INVOICE',
      payload,
    });
    handleOk();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Company Name"
        name="company"
        rules={[{ required: true, message: 'Please input the company name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email Address"
        name="email"
        rules={[{ required: true, message: 'Please input the Email Address!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[{ required: true, message: 'Please input the Phone Number!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Company Address"
        name="address"
        rules={[
          { required: true, message: 'Please input the company address!' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Invoice amount"
        name="amount"
        rules={[
          { required: true, message: 'Please input the Invoice amount!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewInvoiceForm;
