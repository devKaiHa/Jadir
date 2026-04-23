import AppShell from "@/components/AppShell";
import "../i18n";
import "./global.css";
import "../components/layout/header/Header.css";
import "../components/layout/footer/footer.css";
import "../pages/about/about-us.css";
import "../pages/blogs/blogs.css";
import "../pages/blogs/blog-details.css";
import "../pages/contact/contact-us.css";
import "../pages/policies/policies.css";
import "./website.css";
import "./utils.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  );
}

export default MyApp;
