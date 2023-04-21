const express = require("express");
const router = express.Router();
const getHome = require('../controllers/MainControlleur')

router.get("/", getHome);

module.exports = router;

