import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'
import { Provider } from 'react-redux';
import { createStore } from "redux"
import { Toaster } from "react-hot-toast"
import rootReducer from "@/Store";
import Head from "next/head"

const Store = createStore(rootReducer)

export default function App({ Component, pageProps }) {
  return (
    <Provider store={Store}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="./headassests/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="./headassests/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="./headassests/favicon-16x16.png" />
        <link
          rel="icon"
          href="./headassests/favicon-32x32.png" // Replace with the path to your favicon image
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
      />
    </Provider>
  )
}
