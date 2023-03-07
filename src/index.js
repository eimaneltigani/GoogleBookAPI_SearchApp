import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

//redux and redux persist
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

//configure aws amplify so it can interact with backend services
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
      </Provider>
  </StrictMode>
);
