import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'
import { Provider } from 'react-redux';
import {createStore} from "redux"
import rootReducer from "@/Store";

const Store = createStore(rootReducer)
export default function App({ Component, pageProps }) {
  return (
      <Provider store={Store}>
        <Component {...pageProps} />
      </Provider>
  )
}
