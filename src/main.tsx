import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={null}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
