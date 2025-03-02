"use client";
import React from "react";
import { ConfigProvider } from "antd";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import store from "@/store/store";
import i18n from "@/util/i18n";
import Navbar from "../navbar/navbar";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ConfigProvider>
          <Navbar>{children}</Navbar>
        </ConfigProvider>
      </Provider>
    </I18nextProvider>
  );
}
