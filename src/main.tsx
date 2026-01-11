import { createRoot } from "react-dom/client";

import App from "./app.tsx";

import "./index.less";

createRoot(document.getElementById("root")!).render(<App />);
