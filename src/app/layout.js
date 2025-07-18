import localFont from "next/font/local";
import "@/styles/reset.scss";
import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";
import { LocaleProvider } from "@/lib/providers/LocaleContext/LocaleContext";
import { ModalProvider } from "@/lib/providers/ModalProvider/ModalProvider";
import Script from "next/script";
const neueHaasDisplay = localFont({
  src: [
    {
      path: "./fonts/NeueHaasDisplay/NeueHaasDisplayBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/NeueHaasDisplay/NeueHaasDisplayRoman.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neue-haas-display",
});

const hovesPro = localFont({
  src: [
    {
      path: "./fonts/TTHovesPro/TTHovesProVariable.ttf",
      style: "normal",
    },
  ],
  variable: "--font-hoves-pro",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="html">
      <head>
        <Script
          dangerouslySetInnerHTML={{
            __html: `(function(c,s,q,u,a,r,e){c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};c._hjSettings={hjid:a};r=s.getElementsByTagName('head')[0];e=s.createElement('script');e.async=true;e.src=q+c._hjSettings.hjid+u;r.appendChild(e);})(window,document,'https://static.hj.contentsquare.net/c/csq-', '.js', 6395816);`, // Замените 6395816 на ваш ID Hotjar
          }}
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
      const getUtm = () => {
        const params = new URLSearchParams(window.location.search);
        const utmParams = {
          gId: params.get("gId"),
          gSend: params.get("gSend"),
          pixel: params.get("pixel")
        };

        Object.keys(utmParams).forEach((key) => {
          if (!utmParams[key]) delete utmParams[key];
        });

        return utmParams;
      };

      const utm = getUtm();

      if (utm.gId) {
        const script = document.createElement("script");
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + utm.gId;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }

          gtag('js', new Date());
          gtag('config', utm.gId);

          gtag('event', 'conversion', {
            'send_to': utm.gSend,
            'value': 10.0,
            'currency': 'GBP',
            'transaction_id': ''
          });
        };
      }

      // Facebook Pixel Code
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );
      fbq("init", utm.pixel);
      fbq("track", "PageView");
    `,
          }}
        />
      </head>
      <body className={`${hovesPro.variable} body`}>
        <ScrollProvider scrollBar></ScrollProvider>
        <LocaleProvider>
          <ModalProvider>{children}</ModalProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
