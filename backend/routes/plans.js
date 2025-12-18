const express = require('express');
const { getPlans, getPlan, createPlan, updatePlan, deletePlan } = require('../controllers/planController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', getPlans);
router.get('/:id', getPlan);
router.post('/', auth, adminAuth, createPlan);
router.put('/:id', auth, adminAuth, updatePlan);
router.delete('/:id', auth, adminAuth, deletePlan);

module.exports = router;