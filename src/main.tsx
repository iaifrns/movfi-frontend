import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import ReactDom from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import router from "./router";

const root = document.getElementById("root")!;

ReactDom.createRoot(root).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
