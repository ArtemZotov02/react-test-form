import React, { useState } from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";

import Form from "../form/Form";
import { useAuth } from "../../hooks/useAuth";

export default function Auth() {
  const { handleSubmit, control, reset } = useForm({
    mode: "onSubmit",
  });
  const [isReg, setIsReg] = useState(false);

  const { login, register, error, setError } = useAuth();

  const onSubmit = async (data) => {
    if (!isReg) {
      await login(data);
    } else {
      await register(data);
    }
  };
  return (
    <div className={style.form}>
      <h2 className={style.title}>{isReg ? "Registration" : "Login"}</h2>
      <p className={style.error}>{error}</p>
      <Form isReg={isReg} control={control} />
      <p
        onClick={() => {
          setIsReg(!isReg)
          reset()
          setError("")
        }}
        className={style.isReg}
      >
        {" "}
        {isReg ? "Already have an account?" : "Don`t have an account?"}
        <span style={{ color: "#47AA52" }}>
          {isReg ? " Login" : " Sign Up"}
        </span>
      </p>
      <button onClick={handleSubmit(onSubmit)} className={style.form_btn}>
        {isReg ? " Sign Up" : "Login"}
      </button>
    </div>
  );
}
