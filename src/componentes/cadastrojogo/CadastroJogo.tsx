import { FormEvent, useState } from "react";
import { useNavigate, } from "react-router-dom";

function CadastroJogo() {
  const navigate = useNavigate();
  const [codigojg, setCodigojg] = useState("");
  const [nome, setNome] = useState("");
  const [informacaojg, setInformacaojg] = useState("");
  const [imagem, setImagem] = useState("");
  const [preco, setPreco] = useState("");
  const [erro, setErro] = useState("");

  async function handleForm(event: FormEvent) {
    event.preventDefault();

    // Validação de campos vazios
    if (!codigojg) return handleErro("O campo 'Código do Jogo' é obrigatório.");
    if (!nome) return handleErro("O campo 'Nome do Jogo' é obrigatório.");
    if (!informacaojg) return handleErro("O campo 'Informações' é obrigatório.");
    if (!imagem) return handleErro("O campo 'URL Imagem' é obrigatório.");
    if (!preco) return handleErro("O campo 'Valor' é obrigatório.");

    setErro(""); // Limpa mensagem de erro ao enviar corretamente

    try {
      const resposta = await fetch("https://one022a-marketplace-actm.onrender.com/jogos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigojg: codigojg,
          nome: nome,
          informacaojg: informacaojg,
          imagem: imagem,
          preco: preco,
        }),
      });
      if (resposta.status !== 500) {
        alert("Jogo cadastrado com sucesso na página inicial!");
        navigate("/");
      } else {
        const mensagem = await resposta.text();
        alert("Erro ao cadastrar jogo - Error: " + mensagem);
      }
    } catch (e) {
      alert("Servidor não está respondendo.");
    }
  }

  function handleErro(mensagem: string) {
    setErro(mensagem);
    setTimeout(() => {
      setErro(""); // Limpa o erro após 3 segundos
    }, 3000);
  }

  return (
    <>
      <header className="site-header">
        <div className="logo">
          <span>GameZone</span>
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#Store">Store</a>
            </li>
            <li>
              <a href="#avaliar">Avaliar</a>
            </li>
            <li>
              <a href="#sobre">Categorias</a>
            </li>
            <li>
              <a href="#contato">Support</a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <button
            className="back-button"
            onClick={() => navigate("/")}
          >
            Voltar
          </button>
        </div>
      </header>

      <h1>Cadastre Seu Jogo Aqui</h1>

      {/* Exibe a mensagem de erro, se existir */}
      {erro && <div className="error-message">{erro}</div>}

      <form onSubmit={handleForm}>
        <div>
          <input
            placeholder="Codigo do Jogo"
            type="text"
            name="Codigo"
            id="Codigo"
            value={codigojg}
            onChange={(e) => setCodigojg(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Nome do Jogo"
            type="text"
            name="nome"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Avaliçao do Jogo"
            type="text"
            name="informacao"
            id="informacao"
            value={informacaojg}
            onChange={(e) => setInformacaojg(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Valor"
            type="text"
            name="preco"
            id="preco"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Url Imagem"
            type="text"
            name="imagem"
            id="imagem"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="CADASTRAR" />
        </div>
      </form>
      
    </>
  );
}

export default CadastroJogo;
