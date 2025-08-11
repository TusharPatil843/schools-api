
const { body, query, validationResult } = require('express-validator');

const addSchoolValidator = [
  body('name').isString().notEmpty().withMessage('name is required'),
  body('address').isString().notEmpty().withMessage('address is required'),
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('latitude must be between -90 and 90'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('longitude must be between -180 and 180'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    next();
  },
];

const listSchoolsValidator = [
  query('lat').exists().isFloat({ min: -90, max: 90 }).withMessage('lat is required & valid'),
  query('lon').exists().isFloat({ min: -180, max: 180 }).withMessage('lon is required & valid'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    next();
  },
];

module.exports = { addSchoolValidator, listSchoolsValidator };
