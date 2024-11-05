function CadastroProduto(){
    return(
        <>
            <h1>Meu Componente de Cadastro de Produtos</h1>
            <form>
                <div>
                    <input placeholder="Id" type="text" name="id" id="id" />
                </div>
                <div>
                    <input placeholder="Nome" type="text" name="nome" id="nome" />
                </div>
                <div>
                    <input placeholder="Descrição" type="text" name="descricao" id="descricao" />
                </div>
                <div>
                    <input placeholder="Preço" type="text" name="preco" id="preco" />
                </div>
                <div>
                    <input placeholder="URL Imagem" type="text" name="imagem" id="imagem" />
                </div>
                <input type="submit" value="Cadastrar" />
            </form>
        </>
    )
}

export default CadastroProduto