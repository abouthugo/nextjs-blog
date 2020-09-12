import { AppProps } from "next/app";
import "../styles/global.css";

/**
 * Mainly used for importing globals
 *
 */
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
