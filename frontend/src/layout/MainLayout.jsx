// src/layouts/MainLayout.jsx
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
