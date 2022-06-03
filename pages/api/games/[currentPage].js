import axios from "axios";

export default async(req,res) => {
    const { query: {currentPage} } = req;
    try{
        const apiRes = await axios.get(`${process.env.API_URL_LIST_OF_GAMES}?key=${process.env.API_KEY}&page=${currentPage}&page_size=10`)
        if(apiRes.status === 200){
            return res.status(200).json(apiRes.data);
        }
    }catch(error){
        res.status(500).send(error);
    }
}