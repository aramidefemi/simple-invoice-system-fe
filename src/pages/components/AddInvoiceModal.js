import React from 'react';
import { Modal } from 'antd';
import NewInvoiceForm from './NewInvoiceForm';

const AddInvoiceModal = ({ isModalVisible, setIsModalVisible }) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Modal
        footer={null}
        title="New Invoice"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <NewInvoiceForm handleOk={handleOk} />
      </Modal>
    </>
  );
};

export default AddInvoiceModal;
