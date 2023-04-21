const {mongoose} = require('../index.js');
const Professeur = require('../models/Professeur.js');
const Cours = require("../models/Cours.js")

async function getProfs(req, res) {
    const listOfProfs = await Professeur.find()
    const listOfCours = await Cours.find();
    res.render('cours', {data: listOfProfs, coursData: listOfCours})
}

async function postCours(req, res) {
    const {nomDuCours, profs} = req.body;
    if(nomDuCours === ""){
        return "Invalid Cours name"
    }
    const tempProf = await Professeur.findById(profs)
 
    const tempCours = new Cours({nomDuCours: nomDuCours, nomDuProf:  `${tempProf.nom}, ${tempProf.prenom}`, idDuProf: profs})
    await tempCours.save()
    await Professeur.updateOne({_id: profs}, {
        $push: {
            cours: {idDuCours: tempCours.nomDuCours},
        }
    })
    res.redirect('/cours')
}

async function getCours(req, res){
    const leCours = await Cours.find({_id: req.params.id});
    const listOfProfs = await Professeur.find()
    console.log(leCours)
    res.render("cour", {data: listOfProfs, cours: leCours})
}

async function changerCours(req, res){
    const {nomDuCours, profs} = req.body;
    const tempProf = await Professeur.findById(profs)
    await Cours.updateOne({_id: req.params.id},{
        $set:{
            nomDuCours: nomDuCours,
            idDuProf: tempProf._id,
            nomDuProf: `${tempProf.nom}, ${tempProf.prenom}`
        }
    })
    res.redirect('/cours')
}



module.exports = {getProfs, postCours, getCours, changerCours};