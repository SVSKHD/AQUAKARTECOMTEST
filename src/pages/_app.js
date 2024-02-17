import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Toaster } from "react-hot-toast";
import rootReducer from "@/Store";
import { useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter

const Store = createStore(rootReducer);

export default function App({ Component, pageProps }) {
  const router = useRouter(); // Use the useRouter hook

  useEffect(() => {
    // Load existing cart from localStorage

    // Google Analytics
    const handleRouteChange = (url) => {
      window.gtag("config", "G-FS41RRVRD4", {
        page_path: url,
      });
    };

    // Subscribe to route changes
    router.events.on("routeChangeComplete", handleRouteChange);
    // Cleanup subscription on unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={Store}>
      <Component {...pageProps} />
      <Toaster position="top-right" />

      {/* Google Analytics Script */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-FS41RRVRD4"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FS41RRVRD4');
          `,
        }}
      />
    </Provider>
  );
}
