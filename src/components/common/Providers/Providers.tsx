"use client";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { ConfigProvider } from "antd";
import { store } from "@/store/store";
import i18n from "@/utils/i18n";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ffa200",
            },
          }}
        >
          {children}
        </ConfigProvider>
      </Provider>
    </I18nextProvider>
  );
}
