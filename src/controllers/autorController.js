import {autor} from "../models/Autor.js";

class AutorController {
    static async listarAutores (req, res) {
        try{
            const listaAutores = await autor.find({})//pelo método do mongoose, pego todos os livros que estão presentes no banco de dados e armazeno na variável --- as chaves indicam que quero buscar todos os livros, sem nenhuma condição específica
            res.status(200).json(listaAutores)// caso dê tudo certo, retorna todos os livros listados
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição`})
        }
       
    }

    static async listarAutorPorId (req, res) {
        try{
            const id = req.params.id //vai na requisição e olha o id que está vindo pelo parâmetro
            const autorEncontrado = await autor.findById(id) //usa uma função pelo mongoose que olha se o id passado no parâmetro é igual a algum presente no DB
            res.status(200).json(autorEncontrado)//caso dê tudo certo com a requisição, exibe o livro encontrado
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do autor`})
        }
       
    }

    static async cadastrarAutor(req, res){
        try{
            const novoAutor = await autor.create(req.body)//cria um novo livro com o corpo da requisição
            res.status(201).json({ message: "criado com sucesso", autor: novoAutor})
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar o autor`})
        }
    }

    static async atualizarAutor (req, res) {
        try{
            const id = req.params.id //vai na requisição e olha o id que está vindo pelo parâmetro
            await autor.findByIdAndUpdate(id, req.body) //usa uma função pelo mongoose que olha se o id passado no parâmetro é igual a algum presente no DB
            res.status(200).json({message: "Autor atualizado!"})//caso dê tudo certo com a requisição, exibe o livro encontrado
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização`})
        }
       
    }

    static async deletarAutorPorId (req, res) {
        try{
            const id = req.params.id //vai na requisição e olha o id que está vindo pelo parâmetro
            await autor.findByIdAndDelete(id) //usa uma função pelo mongoose que olha se o id passado no parâmetro é igual a algum presente no DB
            res.status(200).json({message: "Autor deletado com sucesso!"})//caso dê tudo certo com a requisição, exibe o livro encontrado
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao deletar o autor!`})
        }
       
    }
}

export default AutorController