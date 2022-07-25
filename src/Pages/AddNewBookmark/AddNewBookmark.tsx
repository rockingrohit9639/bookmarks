import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message, Spin, Typography } from "antd";
import { AxiosError } from "axios";
import React from "react";
import { addBookmark } from "../../axios/instance";
import { Bookmark } from "../../interfaces/Bookmarks";

const AddNewBookmark: React.FC = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(addBookmark, {
    onSuccess: () => {
      message.success("Bookmark added successfully");
      queryClient.invalidateQueries();
      form.resetFields();
    },
    onError: (error: AxiosError<any>) => {
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong");
      }
    },
  });

  const handleSubmit = (values: Bookmark) => {
    mutate(values);
  };

  return (
    <div className="addBookmark container flex align-items-center justify-content-center min-height-100">
      <Form
        form={form}
        name="add-new-bookmark"
        autoComplete="off"
        className="form bg-white"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Spin spinning={isLoading}>
          <Typography.Title>Add New Bookmark!</Typography.Title>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Link"
            name="link"
            rules={[
              { required: true, message: "Please input link!" },
              {
                type: "url",
                message: "Please input valid url!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Spin>
      </Form>
    </div>
  );
};

export default AddNewBookmark;
