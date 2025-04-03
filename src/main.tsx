
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// For development purposes, we'll use a placeholder key if the environment variable is not set
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_placeholder_key";

// Remove the strict error throwing and replace with a console warning for development
if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  console.warn(
    "⚠️ No Clerk Publishable Key found in environment variables. " +
    "The app will run but authentication features won't work correctly. " +
    "Please set VITE_CLERK_PUBLISHABLE_KEY environment variable."
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
