import { useEffect, useState } from 'react'
import './App.css'

// Tipo para produtos
type ProdutoType = {
  id: number,
  nome: string,
  preco: string,
  descricao: string,
  imagem: string
}

// Tipo para usuários
type UsuarioType = {
  id: number,
  name: string,
  email: string,
  created_at: string,
  updated_at: string
}

function App() {
  const [nome, setNome] = useState("")
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([])

  // useEffect para carregar produtos e usuários
  useEffect(() => {
    setNome("Guilherme Terenciani")

    // Buscar os produtos
    fetch("https://one022a-marketplace-e90o.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))

    // Buscar os usuários
    fetch("https://one022a-marketplace-e90o.onrender.com/usuarios")
      .then(resposta => resposta.json())
      .then(dados => setUsuarios(dados))
  }, [])

  return (
    <>
      <h1>{nome}</h1>

      {/* Listagem de Produtos */}
      <div className="produtos-container">
        <h2>Produtos</h2>
        {
          produtos.map(produto => (
            <div key={produto.id} className="produto-item">
              <h1>{produto.nome}</h1>
              <div className='container-imagem'>
                <img src={produto.imagem} alt="Imagem do produto" />
              </div>
              <p>{produto.preco}</p>
              <p>{produto.descricao}</p>
            </div>
          ))
        }
      </div>

      {/* Listagem de Usuários */}
      <div className="usuarios-container">
        <h2>Usuários</h2>
        {
          usuarios.map(usuario => (
            <div key={usuario.id} className="usuario-item">
              <h1>{usuario.name}</h1>
              <p>Email: {usuario.email}</p>
              <p>Criado em: {new Date(usuario.created_at).toLocaleDateString()}</p>
              <p>Atualizado em: {new Date(usuario.updated_at).toLocaleDateString()}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
