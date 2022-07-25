import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { UserDataType } from "../../interfaces/User";

const Singup: React.FC = () => {
  const handleFormFinish = (values: UserDataType) => {
    console.log(values);
  };

  return (
    <div className="container min-height-100 flex align-items-center justify-content-center">
      <Form
        name="signup"
        onFinish={handleFormFinish}
        autoComplete="off"
        className="form bg-white flex  justify-content-center flex-column"
        layout="vertical"
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please input a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Typography.Text>
          Already have an account? <Link to={"/login"}>Login</Link>
        </Typography.Text>
      </Form>
    </div>
  );
};

export default Singup;
