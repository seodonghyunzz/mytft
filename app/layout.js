import "./globals.css";

export const metadata = {
  title: "TFT App",
  description: "TFT Assistant App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
