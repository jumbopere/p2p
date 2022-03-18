import {createExchange, getAllExchanges, getUserExchanges} from "../controller/exchange"

module.exports= (express)=> {
    const router = express.Router()
    router.post('/:id', async(req, res)=> {
        await createExchange(req,res)
    });
    router.get('/admin/transactions', async(req, res)=> {
        await getAllExchanges(req,res)
    });
    router.get('/:id', async(req, res)=> {
        await getUserExchanges(req,res)
    });

    return router
}