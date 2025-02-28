import React from "react";
import Field from "../../components/Field";
import style from "./style.module.scss";

export default function Form({ control, isReg }) {
  const validEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1-3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    <>
      <Field
        control={control}
        name="username"
        placeholder="Enter login"
        className={style.form_input}
        rules={{
          required: "Please enter your login",
          minLength: {
            value: 1,
            message: "Please enter a login",
          },
        }}
      />
      {isReg && (
        <Field
          control={control}
          name="email"
          placeholder="Enter email"
          className={style.form_input}
          rules={{
            required: "Please enter your email",
            pattern: {
              value: validEmail,
              message: "Please enter a valid email adress",
            },
          }}
        />
      )}
      <Field
        control={control}
        name="password"
        placeholder="Enter password"
        className={style.form_input}
        rules={{
          required: "Please enter your password",
          minLength: {
            value: 1,
            message: "Please enter a password",
          },
        }}
      />
    </>
  );
}
