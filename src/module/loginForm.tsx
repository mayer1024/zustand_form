// @ts-nocheck
import { Form, Input } from "antd";
import * as React from "react";

const formCache = "login";
export const LoginForm = React.memo((props) => {
  return (
    <Form
      fields={props.values[formCache]}
      onFieldsChange={(_, allFields) => {
        props.onChange(allFields, formCache);
      }}
      name="global_state"
      layout="inline"
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Username is required!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="password"
        rules={[{ required: true, message: "password is required!" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
});
