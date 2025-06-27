"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Provider as ReduxProvider} from "react-redux";
import { store } from "@/redux/store";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </ReduxProvider>
  );
}
