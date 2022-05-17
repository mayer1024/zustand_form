// @ts-nocheck
import { Form, Input } from "antd";
import * as React from "react";

const formCache = "basic";

export const BasicForm = (props) => {
  return (
    <Form
      name="global_state"
      layout="inline"
      fields={props.values[formCache]}
      onFieldsChange={(_, allFields) => {
        props.onChange(allFields, formCache);
      }}
    >
      <Form.Item
        name="name"
        label="姓名"
        rules={[{ required: true, message: "Username is required!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="pwd"
        label="密码"
        rules={[{ required: true, message: "password is required!" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
