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

        <nav className="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#produtos">Produtos</a></li>
            <li>
              <Link to="/cadastro-jogos">Cadastro Jogos</Link>  {/**No lugar do "a href" use o componente LINK */}
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
        <h1 className='titulo-produto'>Os Melhores Jogos Voce Encontra Aqui </h1>
        <div className="produtos-list">
          {
            jogos.map(jogos => (
              <div key={jogos.codigojg} className="produto-item">
                <h3 className="produto-nome">{jogos.nome}</h3> {/* Use h3 para o nome do produto */}
                <div className='container-imagem'>
                  <img src={jogos.imagem} alt="Imagem do produto" />
                </div>
                <p className="produto-preco">{jogos.preco}</p>
                <p className="produto-descricao">{jogos.informacaojg}</p>
                <button className="botao-comprar">Comprar</button>
              </div>
            ))
          }
          
        </div>
      </div>
    </>
  )
}

export default App

