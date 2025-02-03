import { useEffect, useState } from 'react'; // Importando useState e useEffect de react
import { Link, useNavigate } from "react-router-dom"; // Importando Link e useNavigate de react-router-dom
import './App.css';


// Tipo para jogos
type JogoType = {
  codigojg: number;
  nome: string;
  preco: number;
  informacaojg: string;
  imagem: string;
};


function App() {
  const [jogos, setJogos] = useState<JogoType[]>([]); // Estado para armazenar os jogos
  const [mensagem, setMensagem] = useState<string | null>(null); // Estado para a mensagem de compra
  const [usuario, setUsuario] = useState<string | null>(null); // Estado para o nome do usuário
  const navigate = useNavigate(); // Hook para navegação entre páginas


  useEffect(() => {
    // Buscar os jogos da API
    fetch("https://one022a-marketplace-actm.onrender.com/jogos")
      .then((resposta) => resposta.json())
      .then((dados) => setJogos(dados));


    // Verificar se o nome do usuário está salvo no localStorage
    const usuarioLogado = localStorage.getItem("usuario");
    if (usuarioLogado) {
      setUsuario(usuarioLogado);
    }
  }, []); // A dependência vazia [] significa que o useEffect será executado apenas uma vez


  const handleComprar = (jogoNome: string) => {
    setMensagem(`Jogo "${jogoNome}" comprado com sucesso!`);
    setTimeout(() => setMensagem(null), 3000);
  };


  const handleEditar = (codigojg: number) => {
    // Aqui redirecionamos para a página de alteração
    navigate(`/alterar-jogos/${codigojg}`);
  };
 
  const handleExcluir = (codigojg: number) => {
    if (window.confirm("Tem certeza de que deseja excluir este jogo?")) {
      fetch(`https://one022a-marketplace-actm.onrender.com/jogos/${codigojg}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erro ao excluir o jogo");
          }
          setJogos((prevJogos) => prevJogos.filter((jogo) => jogo.codigojg !== codigojg));
          alert("Jogo excluído com sucesso!");
        })
        .catch((erro) => alert("Erro ao excluir o jogo: " + erro.message));
    }
  };
 


  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/cadastro-login");
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


      {mensagem && <div className="mensagem-compra">{mensagem}</div>}


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
              <p className="jogo-preco">R$ {jogo.preco}</p>
              <button className="botao-comprar" onClick={() => handleComprar(jogo.nome)}>
                Comprar
              </button>
              <button className="botao-alterar" onClick={() => handleEditar(jogo.codigojg)}>
                Alterar
              </button>
              <button className="botao-excluir" onClick={() => handleExcluir(jogo.codigojg)}>
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>


      <footer>
        <p>&copy; 2024 GameZone. Todos os direitos reservados.</p>
        <p>
          <a href="#politica">Política de Privacidade</a> | <a href="#termos">Termos de Serviço</a>
        </p>
      </footer>
    </>
  );
}


export default App;
