import "./globals.css";
import Banner from "./component/banner";
import Footer from "./footer/page"
export const metadata = {
  title: "TFT App",
  description: "TFT Assistant App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Banner/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
