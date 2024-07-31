import express from "express"
import conectaDB from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await conectaDB();

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro)
})

conexao.once("open", () => {
    console.log("Conexão com o banco de dados feita com sucesso!")
})

const app = express();
routes(app)


app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);//define o indice do item que desejo deletar
    livros.splice(index, 1);//deleta o livro no indice passado
    res.status(200).send("Livro removido com sucesso!")
})

export default app

