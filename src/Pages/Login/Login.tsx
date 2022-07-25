import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message, Typography, Spin } from "antd";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, server } from "../../axios/instance";
import { useAuthContext } from "../../hooks/useAuthentication";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { UserDataType, UserLoginValues } from "../../types/User";

const Login: React.FC = () => {
  const { isAuthenticated, setUserContent, setAuthenticated } =
    useAuthContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [, setToken] = useLocalStorage("token", "");

  const { isLoading, mutate } = useMutation(login, {
    onSuccess: ({ data }, values: UserDataType) => {
      server.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setUserContent(values);
      setToken(data.access_token);
      form.resetFields();
      message.success("Login successful");
      setAuthenticated(true);
      navigate("/");
    },
    onError: (error: AxiosError<any>) => {
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong");
      }
    },
  });

  const handleLoginFinish = (values: UserDataType) => {
    mutate(values);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login container min-height-100 flex align-items-center justify-content-center">
      <Form
        form={form}
        name="login-form"
        onFinish={handleLoginFinish}
        autoComplete="off"
        className="form bg-white flex  justify-content-center flex-column"
        layout="vertical"
      >
        <Spin spinning={isLoading}>
          <Typography.Title className="bold">Welcome Back!</Typography.Title>
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
          Did not have an account? <Link to={"/signup"}>Signup</Link>
        </Typography.Text>
      </Form>
    </div>
  );
};

export default Login;
