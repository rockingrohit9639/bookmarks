import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import "./Bookmark.css";
import { LinkOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { BookmarkType } from "../../types/Bookmarks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookmark } from "../../axios/instance";
import { AxiosError } from "axios";

type BookmarkProps = {
  bookmark: BookmarkType;
};

const Bookmark: React.FC<BookmarkProps> = ({ bookmark }: BookmarkProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(updateBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(["bookmarks"]);
      message.success("Bookmark updated successfully");
    },
    onError: (error: AxiosError<any>) => {
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong");
      }
      console.log(error);
    },
  });

  const handleUpdate = (values: BookmarkType) => {
    mutate({ bookmarkId: bookmark.id, data: values });
  };

  useEffect(() => {
    form.setFieldsValue({
      title: bookmark.title,
      link: bookmark.link,
      description: bookmark.description,
    });
  }, [bookmark, form]);

  const handleClose = () => setVisible(false);

  return (
    <>
      <Card
        title={<Typography.Title level={3}>{bookmark.title}</Typography.Title>}
        extra={
          <div className="flex align-items-center">
            <a href={bookmark.link} target="_blank" rel="noreferrer">
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
        <Typography.Text>{bookmark.description}</Typography.Text>
      </Card>
      <Modal
        title="Basic Modal"
        visible={visible}
        onCancel={handleClose}
        okButtonProps={{ hidden: true }}
      >
        <Form
          name="update-bookmark"
          autoComplete="off"
          layout="vertical"
          form={form}
          onFinish={handleUpdate}
        >
          <Spin spinning={isLoading}>
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
                { type: "url", message: "Please input valid url!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      </Modal>
    </>
  );
};

export default Bookmark;
