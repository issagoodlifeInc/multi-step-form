import "../assets/styles.css";

export const metadata = {
  title: "Multi-step form | Frontend Mentor",
  description: "Choose a gaming plan and customize your subscription.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
