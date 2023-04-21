import {mongoose} from "../index.js"

const etudiantSchema = new mongoose.Schema({
    
    prenom: String,
        nom: String,
        studentID: Number,
        cours: [{idDuCours: String}],
    }
);

const Etudiant = mongoose.model('Etudiant', etudiantSchema);

module.exports = Etudiant;