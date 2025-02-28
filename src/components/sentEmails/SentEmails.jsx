import React from "react";
import style from "./style.module.scss";

export default function SentEmails({emails, count, next, previous, error, loading, fetchEmails }) {
  return (
    <div className={style.emailsContainer}>
      <h2>Your emails:</h2>

      {error && <p className={style.error}>{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && emails.length === 0 && <p>No sent emails.</p>}

      {emails.length > 0 && (
        <>
          <table className={style.emailsTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Recipient</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <tr key={email.id}>
                  <td>{email.id}</td>
                  <td>{email.recipient}</td>
                  <td>{email.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={style.pagination}>
            <button disabled={!previous} onClick={() => fetchEmails(previous)}>
              ⬅ Previous
            </button>
            <span>Total emails: {count}</span>
            <button disabled={!next} onClick={() => fetchEmails(next)}>
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
}
