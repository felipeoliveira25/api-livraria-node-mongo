import express from "express"
import LivroController from "../controllers/livroController.js"


const routes = express.Router()

routes.get("/livros", LivroController.listarLivros)
routes.get("/livros/busca", LivroController.listarLivrosPorEditora)//modelo: /livros/busca?editora=nomeDaEditora
routes.get("/livros/:id", LivroController.listarLivroPorId)
routes.post("/livros", LivroController.cadastrarLivro)
routes.put("/livros/:id", LivroController.atualizarLivro)
routes.delete("/livros/:id", LivroController.deletarLivroPorId)

export default routes