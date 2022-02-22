import { register , userActivate, login} from "../controller/user";

module.exports= (express)=> {
    const router = express.Router();

    router.post('/register', async(req, res)=> {
        await register(req,res)
    })
    router.patch('/activate', async(req,res)=> {
        await userActivate(req, res)
    })
    router.post('/login', async(req, res)=> {
        await login(req,res)
    })
    return router
}