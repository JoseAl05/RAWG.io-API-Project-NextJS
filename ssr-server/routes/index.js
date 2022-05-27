const router = require('express').Router();
const authRouter = require('./auth/authRouter');
const axios = require('axios');

require('dotenv').config();

const API_KEY = process.env.API_KEY;
const URL_LIST_OF_GAMES = process.env.API_URL_LIST_OF_GAMES;

router.use('/auth',authRouter);

// * API CALLS * //
router.get('/getAllGames/:currentPage',async(req,res) => {
    try{
        const apiRes = await axios.get(`${URL_LIST_OF_GAMES}?key=${API_KEY}&page=${req.params.currentPage}&page_size=5`)
        if(apiRes.status === 200){
            return res.status(200).json(apiRes.data);
        }
    }catch(error){
        res.status(500).send(error);
    }
})
router.get('/searchGame/:gameSearched',async(req,res) => {
    try{
        const apiRes = await axios.get(`${URL_LIST_OF_GAMES}?key=${API_KEY}&search=${req.params.gameSearched}`)
        if(apiRes.status === 200){
            return res.status(200).json(apiRes.data);
        }
    }catch(error){
        res.status(500).send(error);
    }
})
router.get('/gameDetails/:gameId',async(req,res) => {
    try{
        const apiRes = await axios.get(`${URL_LIST_OF_GAMES}/${req.params.gameId}?key=${API_KEY}`)
        if(apiRes.status === 200){
            return res.status(200).json(apiRes.data);
        }
    }catch(error){
        res.status(500).send(error);
    }
})

module.exports = router;