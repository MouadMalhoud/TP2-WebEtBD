const {mongoose} = require('../index.js')
const Professeur = require('../models/Professeur.js')
const Cours = require('../models/Cours.js')
async function postProf(req, res){
    const {prenom, nom} = req.body;

    if(prenom == '' || nom == ''){
        const listOfProfs = await Professeur.find()
        res.render('profs', {data: listOfProfs})
        return "Non valide"
    }

    const tempProf = new Professeur({prenom: prenom, nom: nom})
    await tempProf.save();
    const listOfProfs = await Professeur.find()
    res.render('profs', {data: listOfProfs})
}

async function getProfsPage(req, res){
    const listOfProfs = await Professeur.find()
    res.render('profs', {data: listOfProfs})
}

async function getProf(req, res){
    const leProf = await Professeur.find({_id: req.params.id});
    res.render("prof", {data: leProf, cours: leProf[0].cours})
}

async function updateProf(req, res){
    const {prenom, nom} = req.body;
    await Professeur.updateOne({_id: req.params.id},
        {$set: {
        prenom: prenom,
        nom: nom
    }})
    await Cours.updateOne({idDuProf: req.params.id},{$set:{
        nomDuProf: `${nom}, ${prenom}`
    }})
    res.redirect('/profs')  
}

module.exports = {postProf, getProfsPage, getProf, updateProf}
