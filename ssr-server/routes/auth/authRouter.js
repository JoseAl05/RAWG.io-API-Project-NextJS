const userController = require('../../controllers/userController');
const router = require('express').Router();
const {signUpSchema} = require('../../lib/signUpValidator');
const {checkSchema} = require('express-validator');
const { signInSchema } = require('../../lib/signInValidator');
const verifyUserSession = require('../../lib/verifyUserSession');
require('dotenv').config();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// * AUTHENTICATION * //
router.post("/signup/",checkSchema(signUpSchema),userController.registerUser);
router.get("/confirm-account/:confirmToken",userController.confirmToken);
router.post("/signin/",checkSchema(signInSchema),userController.loginUser);
router.get("/logout/",userController.logout);
router.get("/logged-user/",(req,res) => {
    if(req.user){
        return res.json(req.user);
    }
    return res.status(401).send('not logged');
})
router.get("/getCSRFToken/",(req,res) => {
    return res.json(req.csrfToken());
})

module.exports = router;