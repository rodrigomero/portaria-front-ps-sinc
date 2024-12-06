/* eslint-disable react/prop-types */
import { Roboto } from "next/font/google";
import Topbar from "./components/topbar";
import { EditProvider } from "./context/editContext";
import { UserProvider } from "./context/userContext";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata = {
  title: "Portaria",
  description: "Portaria",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <UserProvider>
          <EditProvider>
            <Topbar />
            <div className="content">{children}</div>
          </EditProvider>
        </UserProvider>
      </body>
    </html>
  );
}
