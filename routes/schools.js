const express = require('express');
const router = express.Router();
const { addSchoolHandler, listSchoolsHandler } = require('../controllers/schoolsController');
const { addSchoolValidator, listSchoolsValidator } = require('../middlewares/validation');

router.post('/addSchool', addSchoolValidator, addSchoolHandler);
router.get('/listSchools', listSchoolsValidator, listSchoolsHandler);

module.exports = router;
