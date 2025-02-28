import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import SendEmail from "../../components/sendEmail/SendEmail";
import SentEmails from "../../components/sentEmails/SentEmails";
import style from "./style.module.scss";
import { useFetchEmails } from "../../hooks/useFetchEmails";

export default function EmailsPage() {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const { fetchEmails, ...emailsData } = useFetchEmails();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const response = await fetch(
          "http://68.183.74.14:4005/api/users/current/",
          {
            headers: { Authorization: user.authHeader },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentUser();
  }, []);
  return (
    <div>
      <div className={style.profile}>
        <div className={style.profileData}>
          <h1>Profile</h1>
          {user ? (
            <>
              <div>
                <p>
                  <strong>User name:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
              <button onClick={() => logout()}>LOGOUT</button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <SendEmail email={user?.email} sender={user?.id} onSubmit={fetchEmails} />
      </div>
      <SentEmails {...emailsData} fetchEmails={fetchEmails} />
    </div>
  );
}
