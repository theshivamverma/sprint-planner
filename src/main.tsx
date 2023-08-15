import ReactDOM from 'react-dom/client'
import {Theme} from "@radix-ui/themes"
import App from './App.tsx'
import './index.css'

import "@radix-ui/themes/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Theme
    appearance="dark"
    accentColor="cyan"
    grayColor="gray"
    panelBackground="solid"
    scaling="100%"
    radius="medium"
  >
    <App />
  </Theme>
);