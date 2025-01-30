import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CadastroJogo from './componentes/cadastrojogo/CadastroJogo.tsx';
import CadastroLogin from './componentes/cadastrojogo/cadastrologin.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cadastro-jogos",
    element: <CadastroJogo/>,
  },
  {
    path: "/cadastro-login",
    element: <CadastroLogin/>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
