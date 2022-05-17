// @ts-nocheck
import { Radio, Button } from "antd";
import React from "react";
import create from "zustand";
import { BasicForm } from "./module/basicForm";
import { LoginForm } from "./module/loginForm";
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
  const [select, setSelect] = React.useState<string>(1);

  const handleSubmit = React.useCallback(() => {}, []);
  return (
    <>
      <Radio.Group value={select} onChange={(e) => setSelect(e.target.value)}>
        <Radio value={1}>表单A</Radio>
        <Radio value={2}>表单B</Radio>
      </Radio.Group>
      {select === 1 && <BasicForm values={store} onChange={setValues} />}
      {select === 2 && <LoginForm values={store} onChange={setValues} />}
      <pre>{JSON.stringify(store, null, 2)}</pre>
      <Button>提交</Button>
    </>
  );
});
export default App;
