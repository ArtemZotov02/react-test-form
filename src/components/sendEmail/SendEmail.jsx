import React, { useState } from "react";
import styles from "./style.module.scss";
import { sendEmail } from "../../services/emailService.js";
import Field from "../Field.jsx";
import { useForm } from "react-hook-form";

export default function SendEmail({ email, sender, onSubmit=()=> null}) {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const validEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1-3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const { handleSubmit, control, reset } = useForm({
    mode: "onSubmit",
  });
  const handleSubmitEmail = async (data) => {
    try {
      await sendEmail({
        sender,
        recipient: data.email,
        subject,
        message,
        authHeader: userData.authHeader,
      });

      setFeedback({ type: "success", message: "Email sent successfully!" });
      reset()
      setSubject("");
      setMessage("");
      onSubmit();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Send Email</h2>
      {feedback.message && (
        <p className={styles[feedback.type]}>{feedback.message}</p>
      )}
      <label>
        <strong>Sender:</strong> {email}
      </label>

      <Field
        control={control}
        name="email"
        placeholder="Recipient (email)"
        rules={{
          required: "Please enter your email",
          pattern: {
            value: validEmail,
            message: "Please enter a valid email adress",
          },
        }}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="6"
      />

      <button onClick={handleSubmit(handleSubmitEmail)}>Send Email</button>
    </div>
  );
}
