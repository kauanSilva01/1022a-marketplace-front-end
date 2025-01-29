import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function AlterarJogo() {
  const { codigojg } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    fetch(`https://one022a-marketplace-actm.onrender.com/jogos/${codigojg}`)
      .then((resposta) => resposta.json())
      .then((dados) => {
        setNome(dados.nome);
        setDescricao(dados.descricao);
        setPreco(dados.preco);
        setImagem(dados.imagem);
      })
      .catch((erro) => {
        alert("Erro ao buscar dados do jogo.");
      });
  }, [codigojg]);

  async function handleForm(event: FormEvent) {
    event.preventDefault();
    try {
      const resposta = await fetch(`https://one022a-marketplace-actm.onrender.com/jogos/${codigojg}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          descricao: descricao,
          preco: preco,
          imagem: imagem,
        }),
      });

      if (resposta.status !== 500) {
        alert("Jogo alterado com sucesso!");
        navigate("/");
      } else {
        const mensagem = await resposta.text();
        alert("Erro ao alterar jogo - Error: " + mensagem);
      }
    } catch (e) {
      alert("Servidor não está respondendo.");
    }
  }

  function handleNome(event: ChangeEvent<HTMLInputElement>) {
    setNome(event.target.value);
  }

  function handleDescricao(event: ChangeEvent<HTMLInputElement>) {
    setDescricao(event.target.value);
  }

  function handlePreco(event: ChangeEvent<HTMLInputElement>) {
    setPreco(event.target.value);
  }

  function handleImagem(event: ChangeEvent<HTMLInputElement>) {
    setImagem(event.target.value);
  }

  return (
    <>
      <h1>Alterar Jogo</h1>
      <form onSubmit={handleForm}>
        <div>
          <label htmlFor="id">Id</label>
          <input placeholder="codigojg" type="text" name="id" id="id" value={codigojg} readOnly />
        </div>
        <div>
          <label htmlFor="nome">Nome</label>
          <input placeholder="Nome" type="text" name="nome" id="nome" value={nome} onChange={handleNome} />
        </div>
        <div>
          <label htmlFor="descricao">Descrição</label>
          <input placeholder="Descrição" type="text" name="descricao" id="descricao" value={descricao} onChange={handleDescricao} />
        </div>
        <div>
          <label htmlFor="preco">Preço</label>
          <input placeholder="Preço" type="text" name="preco" id="preco" value={preco} onChange={handlePreco} />
        </div>
        <div>
          <label htmlFor="imagem">URL Imagem</label>
          <input placeholder="URL Imagem" type="text" name="imagem" id="imagem" value={imagem} onChange={handleImagem} />
          {imagem && <img className="imagem-produto-reduzida" src={imagem} alt="Imagem do Jogo" />}
        </div>
        <div>
          <input type="submit" value="Alterar" />
        </div>
      </form>
    </>
  );
}

export default AlterarJogo;