"use client";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </Provider>
    </>
  );
};

export default Providers;
