import { Button, Form, Input } from 'antd';
import React from 'react';

const AddNewBookmark: React.FC = () => {
  return (
    <div className="addBookmark container flex align-items-center justify-content-center min-height-100">
      <Form
        name="add-new-bookmark"
        autoComplete="off"
        className="form bg-white"
        layout='vertical'
      >
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewBookmark;
