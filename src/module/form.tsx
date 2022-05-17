// @ts-nocheck
import { Radio, Button } from "antd";
import React from "react";
import create from "zustand";
// import { BasicForm } from "./module/Form/basicForm";
// import { LoginForm } from "./module/loginForm";
import _ from "lodash";

const useStore = create((set) => ({
  store: {},
  setValues: (value: any, name: string) =>
    set((state) => {
      if (_.findKey(state.store, name)) {
        return _.omit(state.store, value);
      } else {
        return (state.store[name] = value);
      }
    }),
}));

const App = React.memo(() => {
  const { store, setValues } = useStore();
  const [select, setSelect] = React.useState<string>("basic");

  const handleSubmit = React.useCallback(() => {
    let errors = [];
    console.info(store);
    _.values(store).forEach((item) => {
      const error = _.findKey(item, (i) => i.errors.length > 0);
      errors.push(error);
    });
    if (errors.length > 0) {
      console.info(errors);
    }
  }, [store]);

  return (
    <>
      <Radio.Group value={select} onChange={(e) => setSelect(e.target.value)}>
        <Radio value="basic">表单A</Radio>
        <Radio value="login">表单B</Radio>
      </Radio.Group>
      {select === "basic" && (
        <BasicForm values={store} onChange={setValues} uid="basic" />
      )}
      {select === "login" && (
        <LoginForm values={store} onChange={setValues} uid={"login"} />
      )}
      <pre>{JSON.stringify(store, null, 2)}</pre>
      <Button onClick={handleSubmit}>提交</Button>
    </>
  );
});
export default App;
