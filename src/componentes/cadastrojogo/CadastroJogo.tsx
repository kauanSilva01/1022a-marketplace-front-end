import {  ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from 'react-router-dom';
function CadastroJogo(){
    const navigate = useNavigate()
    const [codigojg,setCodigojg] = useState("")
    const [nome,setNome] = useState("")
    const [informacaojg,setInformacaojg] = useState("")
    const [imagem,setImagem] = useState("")
    const [preco,setPreco] = useState("")
    async function handleForm(event:FormEvent){
        event.preventDefault()
        try{
            const resposta = await fetch("http://localhost:8000/jogos",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    codigojg:codigojg,
                    nome:nome,
                    informacaojg:informacaojg,
                    imagem:imagem,
                    preco:preco,

                })
            })
            if(resposta.status!=500){
                alert("Produto Cadastro com Sucesso")
                navigate("/")
            }
            else{
                const mensagem = await resposta.text()
                alert("Erro ao Cadastrar Produto - Error: "+mensagem)
            }
        }
        catch(e){
            alert("Servidor não está respondendo.")
        }
        
    }
    function handleCodigojg(event:ChangeEvent<HTMLInputElement>){
        setCodigojg(event.target.value)
    }
    function handleNome(event:ChangeEvent<HTMLInputElement>){
        setNome(event.target.value)
    }
    function handleInformacaojg(event:ChangeEvent<HTMLInputElement>){
        setInformacaojg(event.target.value)
    }
    function handleImagem(event:ChangeEvent<HTMLInputElement>){
        setImagem(event.target.value)
    }
    function handlePreco(event:ChangeEvent<HTMLInputElement>){
        setPreco(event.target.value)
    }

    return(
        <>
            <h1>Meu Componente de Cadastro de Produtos</h1>
            <form onSubmit={handleForm}>
                <div>
                    <input placeholder="CODIGO DO JOGO" type="text" name="Codigo" id="Codigo" onChange={handleCodigojg} />
                </div>
                <div>
                    <input placeholder="NOME DO JOGO" type="text" name="nome" id="nome" onChange={handleNome} />
                </div>
                <div>
                    <input placeholder="INFOMACÕES" type="text" name="informacao" id="informacao" onChange={handleInformacaojg} />
                </div>
                <div>
                    <input placeholder="VALOR" type="text" name="preco" id="preco" onChange={handlePreco} />
                </div>
                <div>
                    <input placeholder="URL IMAGEM" type="text" name="imagem" id="imagem" onChange={handleImagem} />
                </div>
                <input type="submit" value="CADASTRAR" />
            </form>
        </>
    )
}

export default CadastroJogo