import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

//redux 
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

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
