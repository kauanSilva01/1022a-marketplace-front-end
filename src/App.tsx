

import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './App.css';

// Tipo para jogos
type JogoType = {
  codigojg: number;
  nome: string;
  preco: number;
  informacaojg: string;
  imagem: string;
};

// Tipo para usuários (apenas email e senha)
type UsuariosType = {
  email: string;
  senha: string;
};

function App() {
  const [jogos, setJogos] = useState<JogoType[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<string | null>(null); // Estado para o nome do usuário
  const [usuarios, setUsuarios] = useState<UsuariosType[]>([]); // Estado para listar os usuários
  const navigate = useNavigate();

  // useEffect para carregar produtos, verificar usuário logado e carregar a lista de usuários
  useEffect(() => {
    // Buscar os produtos
    fetch("https://one022a-marketplace-actm.onrender.com/jogos")
      .then((resposta) => resposta.json())
      .then((dados) => setJogos(dados));

    // Verificar se o nome do usuário está salvo no localStorage
    const usuarioLogado = localStorage.getItem("usuario"); // Aqui você pode usar um token ou outra forma de identificar
    if (usuarioLogado) {
      setUsuario(usuarioLogado); // Se o usuário estiver logado, mostra o nome
    }

    // Simulação de uma lista de usuários (email e senha)
    // Em um caso real, você faria uma requisição para buscar os usuários de um banco de dados.
    const listaUsuarios: UsuariosType[] = [
      { email: "usuario1@example.com", senha: "senha123" },
      { email: "usuario2@example.com", senha: "senha456" },
      { email: "usuario3@example.com", senha: "senha789" },
    ];
    setUsuarios(listaUsuarios); // Atualiza a lista de usuários
  }, []);

  // Função para exibir mensagem ao comprar jogo
  const handleComprar = (jogoNome: string) => {
    setMensagem(`Jogo "${jogoNome}" comprado com sucesso!`);
    setTimeout(() => setMensagem(null), 3000); // Limpa a mensagem após 3 segundos
  };

  // Função para fazer o logout
  const handleLogout = () => {
    localStorage.removeItem("usuario"); // Remove o nome do usuário (simula logout)
    setUsuario(null); // Atualiza o estado
    navigate("/cadastro-login"); // Redireciona para a página de login
  };

  // Função para exibir mensagem ao comprar jogo
  const handleCompraar = (jogoNome: string) => {
    setMensagem(`Jogo "${jogoNome}" comprado com sucesso!`);
    setTimeout(() => setMensagem(null), 3000); // Limpa a mensagem após 3 segundos
  }

  return (
    <>
      <header className="site-header">
        <div className="logo">
          <span>GameZone</span>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#Store">Store</a></li>
            <li>
              <Link to="/cadastro-jogos">Cadastro Jogos</Link>
            </li>
            <li><a href="#sobre">Categorias</a></li>
            <li><a href="#contato">Support</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          {/* Mostrar nome do usuário se ele estiver logado, caso contrário mostrar link de login */}
          {usuario ? (
            <div className="usuario-info">
              <span>Bem-vindo, {usuario}!</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <li>
              <Link to="/cadastro-login">Login</Link>
            </li>
          )}
        </div>
      </header>

      {/* Seção de Banners */}
      <div className="banners-container">
        <div className="banner-item">
          <img
            src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Flego-batman%2FEGS_WB_LEGO_Batman_G1_1920x1080_19_0911-1920x1080-e166b698acbbbcdae1ff306198684d143828467c.jpg"
            alt="Banner LEGO Batman"
          />
        </div>
        <div className="banner-item">
          <img
            src="https://prod.liveshare.vsengsaas.visualstudio.com/join?7C3F6DE41F9B005C3A048D2733BA24688530"
            alt="Banner Nintendo Switch"
          />
        </div>
        <div className="banner-item">
          <img
            src="https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg"
            alt="Banner Red Dead Redemption 2"
          />
        </div>
      </div>

      {/* Mensagem de compra */}
      {mensagem && <div className="mensagem-compra">{mensagem}</div>}

      {/* Listagem de Produtos */}
      <div className="jogos-container">
        <h1 className="jogo-produto">Os Melhores Jogos Você Encontra Aqui</h1>
        <div className="jogos-list">
          {jogos.map((jogo) => (
            <div key={jogo.codigojg} className="jogo-item">
              <h3 className="jogo-nome">{jogo.nome}</h3>
              <div className="container-imagem">
                <img src={jogo.imagem} alt="Imagem do jogo" />
              </div>
              <p className="jogo-descricao">{jogo.informacaojg}</p>

              {/* Valor abaixo da descrição */}
              <p className="jogo-preco">R$ {jogo.preco}</p>

              <button className="botao-comprar" onClick={() => handleComprar(jogo.nome)}>
                Comprar
              </button>

              {/* Estrelas abaixo do botão de compra */}
              <div className="estrelas">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Listagem de Usuários (Email e Senha) */}
      <div className="usuarios-list">
        <h2>Lista de Usuários</h2>
        <ul>
          {usuarios.map((usuario, index) => (
            <li key={index}>
              <p>Email: {usuario.email}</p>
              <p>Senha: {usuario.senha}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Rodapé */}
      <footer>
        <p>&copy; 2024 GameZone. Todos os direitos reservados.</p>
        <p>
          <a href="#termos">Termos de Serviço</a> | 
          <a href="#privacidade">Política de Privacidade</a>
        </p>
      </footer>
    </>
  );
}

export default App;
