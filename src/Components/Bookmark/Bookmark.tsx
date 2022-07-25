import { Button, Card, Form, Input, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import './Bookmark.css';
import { LinkOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Bookmark: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleClose = () => setVisible(false);

  return (
    <>
      <Card
        title={<Typography.Title level={3}>Google</Typography.Title>}
        extra={
          <div className="flex align-items-center">
            <a href="http://google.com" target="_blank" rel="noreferrer">
              <LinkOutlined />
            </a>
          </div>
        }
        actions={[
          <Button type="link" onClick={() => setVisible(true)}>
            <EditOutlined />
          </Button>,
          <Button type="link" danger>
            <DeleteOutlined />
          </Button>,
        ]}
        style={{ width: 300 }}
      >
        <Typography.Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ducimus
          doloremque accusamus culpa deserunt? Vero, nam! Ipsum fugit aperiam
          porro?
        </Typography.Text>
      </Card>
      <Modal
        title="Basic Modal"
        visible={visible}
        onCancel={handleClose}
        okButtonProps={{ hidden: true }}
      >
        <Form name="update-bookmark" autoComplete="off" layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Link"
            name="link"
            rules={[{ required: true, message: 'Please input link!' }]}
          >
            <Input type="url" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Bookmark;
