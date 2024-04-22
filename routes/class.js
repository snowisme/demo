const express = require('express');
const router = express.Router();
const ClassModel = require('../models/ClassModel');

router.get('/', async (req, res) => {
   let classList = await ClassModel.find({});
   res.render('class/index', { classList });
})

router.get('/delete/:id', async (req, res) => {
   await ClassModel.findByIdAndDelete(req.params.id);
   res.redirect('/class');
})


module.exports = router;
