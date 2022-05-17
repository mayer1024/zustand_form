// @ts-nocheck
import { Radio, Button, Form } from "antd";
import React from "react";
import create from "zustand";
import { BasicForm } from "./module/basicForm";
import { LoginForm } from "./module/loginForm";
import _ from "lodash";

const useStore = create((set) => ({
  store: {},
  form: {},
  setValues: (value: any, name: string) =>
    set((state) => {
      if (_.findKey(state.store, name)) {
        return _.omit(state.store, value);
      } else {
        return (state.store[name] = value);
      }
    }),
  setForm: (value: any, name: string) =>
    set((state) => {
      if (_.findKey(state.form, name)) {
        return _.omit(state.form, value);
      } else {
        return (state.form[name] = value);
      }
    }),
}));

const App = React.memo(() => {
  const { store, setValues, setForm, form } = useStore();
  const [select, setSelect] = React.useState<string>(1);
  const handleSubmit = React.useCallback(() => {
    Object.values(form).forEach((item) => {
      item.submit();
    });
  }, [form]);

  console.info(form);
  return (
    <>
      <Radio.Group value={select} onChange={(e) => setSelect(e.target.value)}>
        <Radio value={1}>表单A</Radio>
        <Radio value={2}>表单B</Radio>
      </Radio.Group>
      <Form.Provider
        onFormChange={(name, info) => setForm(info.forms[name], name)}
      >
        {select === 1 && (
          <BasicForm
            values={store}
            onChange={(e, name) => {
              console.info(e);
              setValues(e, name);
            }}
          />
        )}
        {select === 2 && <LoginForm values={store} onChange={setValues} />}
      </Form.Provider>
      <Button onClick={handleSubmit}>提交</Button>
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </>
  );
});
export default App;
