import { useEffect, useState } from 'react'
//Importar LINK
import { Link } from "react-router-dom";
import './App.css'

// Tipo para jogos
type JogoType = {
  codigojg: number,
  nome: string,
  preco: number,
  informacaojg: string,
  imagem: string
}

function App() {
  const [jogos, setJogos] = useState<JogoType[]>([])

  // useEffect para carregar produtos e usuários
  useEffect(() => {
    // Buscar os produtos
    fetch("http://localhost:8000/jogos")
      .then(resposta => resposta.json())
      .then(dados => setJogos(dados))
  }, [])

  return (
    <>
      <header className="site-header">
        <div className="logo">
          <span>GameZone</span>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#produtos">Produtos</a></li>
            <li>
              <Link to="/cadastro-jogos">Cadastro Jogos</Link> {/* Usando Link no lugar de "a href" */}
            </li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="login-button">Login</button>
        </div>
      </header>

      {/* Listagem de Produtos */}
      <div className="produtos-container">
        <h1 className='titulo-produto'>Os Melhores Jogos Você Encontra Aqui</h1>
        <div className="produtos-list">
          {
            jogos.map(jogo => (
              <div key={jogo.codigojg} className="produto-item">
                <h3 className="produto-nome">{jogo.nome}</h3> {/* Use h3 para o nome do produto */}
                <div className='container-imagem'>
                  <img src={jogo.imagem} alt="Imagem do produto" />
                </div>
                <p className="produto-preco">R$ {jogo.preco}</p>
                <p className="produto-descricao">{jogo.informacaojg}</p>
                <button className="botao-comprar">Comprar</button>
              </div>
            ))
          }
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
  )
}

export default App



