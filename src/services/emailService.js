export async function sendEmail({
  sender,
  recipient,
  subject,
  message,
  authHeader,
}) {
  if (!recipient || !subject || !message) {
    throw new Error("All fields are required!");
  }

  const response = await fetch("http://68.183.74.14:4005/api/emails/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify({ sender, recipient, subject, message }),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }

  return response.json();
}
