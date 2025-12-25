import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

export default function App({ Component, pageProps }: any) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}
