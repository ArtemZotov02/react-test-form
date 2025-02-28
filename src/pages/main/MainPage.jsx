import React from "react";
import style from "./style.module.scss";
import Auth from "../../components/auth/Auth";

export default function MainPage() {
  return (
    <div className={style.mainPage}>
      <Auth />
    </div>
  );
}
