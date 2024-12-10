import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';

function CadastroLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false); // State to track login success

    // Handle form submission
    async function handleForm(event: FormEvent) {
        event.preventDefault();

        if (!email) return handleErro("O campo 'Email' é obrigatório.");
        if (!senha) return handleErro("O campo 'Senha' é obrigatório.");

        setErro(""); // Clear previous errors

        try {
            // Replace with your actual login endpoint
            const resposta = await fetch("https://one022a-marketplace-actm.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            });

            if (resposta.status === 200) {
                alert("Login realizado com sucesso");
                setLoginSuccess(true);  // Set loginSuccess to true when login is successful
                navigate("/");
            } else {
                const mensagem = await resposta.text();
                alert("Erro ao fazer login: - Error: " + mensagem);
            }
        } catch (e) {
            alert("Servidor não está respondendo.");
        }
    }

    // Handle error message display
    function handleErro(mensagem: string) {
        setErro(mensagem);
        setTimeout(() => {
            setErro(""); // Clear error after 3 seconds
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
                        <li><a href="/home">Home</a></li>
                        <li><a href="#Store">Store</a></li>
                        <li><a href="#avaliar">Avaliar</a></li>
                        <li><a href="#sobre">Categorias</a></li>
                        <li><a href="#contato">Support</a></li>
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

            <h1>Login</h1>

            {/* Exibe a mensagem de erro, se existir */}
            {erro && <div className="error-message">{erro}</div>}

            <form onSubmit={handleForm}>
                    <input
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Senha"
                        type="text"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
               <div>
                 <input type="submit" value="Entrar" />
              </div>
            </form>

            {/* Condicionalmente exibe o personagem ou imagem após login */}
            {loginSuccess && (
                <div className="character-container">
                    <img
                        src="https://example.com/path-to-your-character-image.png" // Replace with your character/image URL
                        alt="Character"
                        className="character-image"
                    />
                    <p>Bem-vindo de volta!</p>
                </div>
            )}
        </>
    );
}

export default CadastroLogin;