import Head from "next/head";
import { Provider } from "react-redux";
import store from "../RTK/store";
const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>JADWA INVESTMENT</title>
        <link rel="icon" href="/assets/jadwa.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Quicksand:wght@300..700&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto+Flex:opsz,wght@8..144,100..1000&family=TASA+Explorer:wght@400..800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default Layout;
