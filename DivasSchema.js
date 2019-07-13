const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DivasSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    senha: { type: String, required: true },
    ponto: { type: Number },
})

const DivasModel = mongoose.model("divas", DivasSchema);

module.exports = DivasModel;