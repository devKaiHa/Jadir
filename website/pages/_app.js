import Layout from "./layout";
import "../i18n";
import "./global.css";
import "../components/layout/header/Header.css";
import "../public/assets/css/contact.css";
import "./utils.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
