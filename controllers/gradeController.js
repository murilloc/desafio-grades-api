import {db} from '../models/index.js';
import {logger} from '../config/logger.js';

const Grade = db.grade;

const create = async (req, res) => {
    const grade = req.body;
    try {
        let newGrade = new Grade(grade);
        newGrade = await newGrade.save();
        res.send({message: 'Grade inserido com sucesso'});
        logger.info(`POST /grade - ${JSON.stringify(newGrade)}`);
    } catch (error) {
        res
            .status(500)
            .send({message: error.message || 'Algum erro ocorreu ao salvar'});
        logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
    }
};

const findAll = async (req, res) => {
    const name = req.query.name;
    //condicao para o filtro no findAll
    var condition = name
        ? {name: {$regex: new RegExp(name), $options: 'i'}}
        : {};
    try {
        const grades = await Grade.find(condition);
        res.send(grades);
        logger.info(`GET /grade/${name}`);

    } catch (error) {
        res
            .status(500)
            .send({message: error.message || 'Erro ao listar todos os documentos'});
        logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
    }
};

const findOne = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const grade = await Grade.findOne({_id: id}, {});

        res.send(grade);
        logger.info(`GET /grade - ${id}`);
    } catch (error) {
        res.status(500).send({message: 'Erro ao buscar o Grade id: ' + id});
        logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
    }
};

const update = async (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: 'Dados para atualizacao vazio',
        });
    }
    const id = req.params.id;
    try {
        let targetGrade = await Grade.findOne({_id: id});
        if (!targetGrade) {
            return res.status(400).send("Grade not found");
        }
        const gradeToUpdate = req.body;
        targetGrade.lastModified = new Date();

        targetGrade = await Grade.findByIdAndUpdate({_id: id}, gradeToUpdate, {new: true});
        res.send({message: `Grade ${id} atualizado com sucesso`});
        logger.info(`PUT /grade - ${id} - ${JSON.stringify(targetGrade)}`);
    } catch (error) {
        res.status(500).send({message: 'Erro ao atualizar a Grade id: ' + id});
        logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
    }
};

const remove = async (req, res) => {
    const id = req.params.id;
    try {
        await Grade.deleteOne({_id: id});
        logger.info(`DELETE /grade - ${id}`);
        res.send({message:`Grade ${id} foi deletado com sucesso`})
    } catch (error) {
        res
            .status(500)
            .send({message: 'Nao foi possivel deletar o Grade id: ' + id});
        logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
    }
};

const removeAll = async (req, res) => {
    try {
        await Grade.deleteMany({});
        res.send({message:'Todos os registros foram removidos'})
        logger.info(`DELETE /grade`);
    } catch (error) {
        res.status(500).send({message: 'Erro ao excluir todos as Grades'});
        logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
    }
};

export default {create, findAll, findOne, update, remove, removeAll};
