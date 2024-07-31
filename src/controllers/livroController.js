import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {
    static async listarLivros (req, res) {
        try{
            const listaLivros = await livro.find({})//pelo método do mongoose, pego todos os livros que estão presentes no banco de dados e armazeno na variável --- as chaves indicam que quero buscar todos os livros, sem nenhuma condição específica
            res.status(200).json(listaLivros)// caso dê tudo certo, retorna todos os livros listados
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição`})
        }
       
    }

    static async listarLivroPorId (req, res) {
        try{
            const id = req.params.id //vai na requisição e olha o id que está vindo pelo parâmetro
            const livroEncontrado = await livro.findById(id) //usa uma função pelo mongoose que olha se o id passado no parâmetro é igual a algum presente no DB
            res.status(200).json(livroEncontrado)//caso dê tudo certo com a requisição, exibe o livro encontrado
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do livro`})
        }
       
    }

    static async cadastrarLivro(req, res){
        const novoLivro = req.body
        try{
            const autorEncontrado = await autor.findById(novoLivro.autor)//cria um novo livro com o corpo da requisição
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc} }
            const livroCriado = await livro.create(livroCompleto)
            res.status(201).json({ message: "criado com sucesso", livro: livroCriado})
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar o livro`})
        }
    }

    static async atualizarLivro (req, res) {
        try{
            const id = req.params.id //vai na requisição e olha o id que está vindo pelo parâmetro
            await livro.findByIdAndUpdate(id, req.body) //usa uma função pelo mongoose que olha se o id passado no parâmetro é igual a algum presente no DB
            res.status(200).json({message: "Livro atualizado!"})//caso dê tudo certo com a requisição, exibe o livro encontrado
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização`})
        }
       
    }

    static async deletarLivroPorId (req, res) {
        try{
            const id = req.params.id //vai na requisição e olha o id que está vindo pelo parâmetro
            await livro.findByIdAndDelete(id) //usa uma função pelo mongoose que olha se o id passado no parâmetro é igual a algum presente no DB
            res.status(200).json({message: "Livro deletado com sucesso!"})//caso dê tudo certo com a requisição, exibe o livro encontrado
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao deletar o livro!`})
        }
       
    }

    static async listarLivrosPorEditora (req, res) {
        const editora = req.query.editora;
        try{
            const livrosPorEditora = await livro.find({ editora: editora});
            res.status(200).json(livrosPorEditora)
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na busca`})
        }
    }
}

export default LivroController