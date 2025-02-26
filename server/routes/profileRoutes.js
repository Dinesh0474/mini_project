const express = require('express');
const profileController = require('../controllers/profileController');
const validateToken = require('../middleware/validateToken');  // Corrected the import here

const router = express.Router();

// CRUD operations for profiles
router.post('/', profileController.createProfile);
router.get('/', profileController.getProfiles);
router.get('/main/:id', profileController.getMainProfileById);
router.get('/search', profileController.searchProfiles);

// Protected route that requires a valid token
router.get('/:id', validateToken, profileController.getProfileById);

router.put('/:id', profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);

module.exports = router;
