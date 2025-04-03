
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// Get the publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Setup page to display when there's no valid key
const ClerkSetupGuide = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
    <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg border">
      <h1 className="text-2xl font-bold text-center mb-6">TecXi Setup Required</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
          <h2 className="font-semibold mb-2">Missing Clerk API Key</h2>
          <p className="text-sm">
            To use authentication features, you need to provide a valid Clerk publishable key.
          </p>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium">Steps to setup Clerk:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Sign up for a <a href="https://clerk.com" className="text-primary underline" target="_blank" rel="noreferrer">Clerk account</a></li>
            <li>Create a new application in the Clerk dashboard</li>
            <li>Go to API Keys in your Clerk dashboard</li>
            <li>Copy your Publishable Key</li>
            <li>Set the environment variable <code className="bg-muted p-1 rounded">VITE_CLERK_PUBLISHABLE_KEY</code> to your key</li>
            <li>Restart your application</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
);

// Render the app
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {PUBLISHABLE_KEY ? (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    ) : (
      <ClerkSetupGuide />
    )}
  </React.StrictMode>
);
