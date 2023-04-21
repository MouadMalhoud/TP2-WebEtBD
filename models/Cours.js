const mongoose = require('mongoose')

const coursSchema = new mongoose.Schema({
        nomDuCours: String,
        nomDuProf: String,
        idDuProf: String,
        etudiants: [{studentID: String}]
    }
)

const Cours = mongoose.model("Cours", coursSchema);

module.exports = Cours;
