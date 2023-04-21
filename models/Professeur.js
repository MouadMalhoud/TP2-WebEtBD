const mongoose = require('mongoose')

const professeurSchema = new mongoose.Schema({
        prenom: String,
        nom: String,
        cours: [{idDuCours: String}] 
    }
)
const Professeur = mongoose.model("Professeur", professeurSchema);

module.exports = Professeur;