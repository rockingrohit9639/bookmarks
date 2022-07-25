import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Typography, message, Spin } from "antd";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server, signup } from "../../axios/instance";
import { useAuthContext } from "../../hooks/useAuthentication";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { UserDataType } from "../../interfaces/User";

const Singup: React.FC = () => {
  const [signupForm] = Form.useForm();
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated, setUserContent } =
    useAuthContext();
  const [, setToken] = useLocalStorage("token", "");

  const { isLoading, mutate } = useMutation(signup, {
    onSuccess: ({ data }, values) => {
      setToken(data.access_token);
      setUserContent(values);
      setAuthenticated(true);
      message.success("Signup Success!");
      server.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      signupForm.resetFields();
      navigate("/");
    },
    onError: (error: AxiosError<any>) => {
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        console.log(error);
      }
    },
  });

  const handleFormFinish = (values: UserDataType) => {
    mutate(values);
  };

  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container min-height-100 flex align-items-center justify-content-center">
      <Form
        form={signupForm}
        name="signup"
        onFinish={handleFormFinish}
        autoComplete="off"
        className="form bg-white flex justify-content-center flex-column"
        layout="vertical"
      >
        <Spin spinning={isLoading}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
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
        </Spin>

        <Typography.Text>
          Already have an account? <Link to={"/login"}>Login</Link>
        </Typography.Text>
      </Form>
    </div>
  );
};

export default Singup;
