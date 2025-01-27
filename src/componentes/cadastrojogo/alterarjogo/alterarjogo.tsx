import { FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

function AlterarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();
   
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");
    const [erro, setErro] = useState("");
    const [produtoAlterado, setProdutoAlterado] = useState(false); // Estado para controle do sucesso

    // Carrega os dados do produto no carregamento do componente
    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8000/produtos/${id}`)
                .then(resposta => resposta.json())
                .then(dados => {
                    setNome(dados.nome);
                    setDescricao(dados.descricao);
                    setPreco(dados.preco);
                    setImagem(dados.imagem);
                })
                .catch(() => alert("Erro ao buscar o produto"));
        }
    }, [id]);

    // Handle form submission
    async function handleForm(event: FormEvent) {
        event.preventDefault();

        if (!nome || !descricao || !preco || !imagem) {
            return handleErro("Todos os campos são obrigatórios.");
        }

        setErro(""); // Limpar erros anteriores

        try {
            const resposta = await fetch(`http://localhost:8000/produtos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    descricao,
                    preco,
                    imagem
                })
            });

            if (resposta.status === 200) {
                alert("Produto Alterado com Sucesso");
                setProdutoAlterado(true); // Marca como alterado com sucesso
                navigate("/"); // Redireciona após sucesso
            } else {
                const mensagem = await resposta.text();
                handleErro("Erro ao Alterar Produto - Error: " + mensagem);
            }
        } catch (e) {
            alert("Servidor não está respondendo.");
        }
    }

    // Handle error message display
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
                    <span>Doce Nevasca</span>
                </div>
                <nav className="navigation">
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="#produtos">Produtos</a></li>
                        <li><a href="#contato">Contato</a></li>
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

            <h1>Alterar Produto</h1>

            {/* Exibe a mensagem de erro, se existir */}
            {erro && <div className="error-message">{erro}</div>}

            <form onSubmit={handleForm}>
                <div>
                    <label htmlFor="id">Id</label>
                    <input placeholder="Id" type="text" name="id" id="id" value={id} readOnly />
                </div>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input placeholder="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição</label>
                    <input placeholder="Descrição" type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="preco">Preço</label>
                    <input placeholder="Preço" type="text" value={preco} onChange={(e) => setPreco(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="imagem">URL Imagem</label>
                    <input placeholder="URL Imagem" type="text" value={imagem} onChange={(e) => setImagem(e.target.value)} />
                    {imagem && <img className="imagem-produto-reduzida" src={imagem} alt="Imagem do Produto" />}
                </div>
                <div>
                    <input type="submit" value="Alterar Produto" />
                </div>
            </form>

            {/* Exibe uma mensagem de sucesso condicionalmente após alteração */}
            {produtoAlterado && (
                <div className="success-message">
                    <p>Produto alterado com sucesso!</p>
                </div>
            )}
        </>
    );
}

export default AlterarProduto;