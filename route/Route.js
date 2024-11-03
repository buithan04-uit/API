const express = require('express');
const { signUp, logIn, logOut, forgetPassword, verifyCode, changeForget, dashBoard,
    mapView, profile, setting, deleteAccount, changePassword, update
    , api } = require('../controller/Controller');

const router = express.Router();
// Authentication routes
router.post('/auth/sign_up', signUp);
router.post('/auth/log_in', logIn);
router.post('/auth/log_out', logOut);
router.post('/auth/forget_password', forgetPassword);
router.post('/auth/verify_code', verifyCode);
router.post('/auth/change_forget', changeForget);

// Dashboard route
router.get('/dashboard', dashBoard);
// Map routes  
router.get('/map/view', mapView);
// ProfileUser routes
router.get('/profile', profile);
// Setting routes
router.get('/setting', setting);
router.get('/setting/account/deleteAccount', deleteAccount);
router.post('/setting/account/changePassword', changePassword);
// Setting routes
router.get('/', api);

// admin route
router.post('/admin/update', update);

module.exports = router;