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

function App() {
  const [jogos, setJogos] = useState<JogoType[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<string | null>(null); // Estado para o nome do usuário
  const navigate = useNavigate();

  // useEffect para carregar produtos e verificar usuário logado
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
            src="https://th.bing.com/th/id/OIP.5Tq9mB7mRq84jds2c1y21wHaDq?rs=1&pid=ImgDetMain"
            alt="Banner Nintendo Switch"
          />
        </div>
        <div className="banner-item">
          <img
            src="https://th.bing.com/th/id/R.ab0710019c6b488f0eeecd6213a5cb5d?rik=1D3LJWIRVRiHdQ&pid=ImgRaw&r=0"
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
