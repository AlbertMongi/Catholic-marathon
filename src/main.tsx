import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "./i18n"; // ✅ make sure i18n is imported

createRoot(document.getElementById("root")!).render(<App />);
