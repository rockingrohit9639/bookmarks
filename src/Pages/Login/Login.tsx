import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="login container min-height-100 flex align-items-center justify-content-center">
      <Form
        name="login-form"
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="form bg-white flex  justify-content-center flex-column"
        layout="vertical"
      >
        <Typography.Title className="bold">Welcome Back!</Typography.Title>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please input a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Typography.Text>
          Did not have an account? <Link to={'/signup'}>Signup</Link>
        </Typography.Text>
      </Form>
    </div>
  );
};

export default Login;
