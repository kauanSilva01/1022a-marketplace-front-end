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
import AlterarJogo from './componentes/alterarjogo.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cadastro-jogos",
    element: <CadastroJogo />,
  },
  {
    path: "/cadastro-login",
    element: <CadastroLogin />,
  },
  {
    path: "/alterar-jogos/:codigojg",
    element: <AlterarJogo />,
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
