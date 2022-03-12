import { register , userActivate, login, deleteUser, updateUser, getOneUser,getAllUsers } from "../controller/user";

module.exports= (express)=> {
    const router = express.Router();

    router.post('/register', async(req, res)=> {
        await register(req,res)
    });
    router.patch('/activate', async(req,res)=> {
        await userActivate(req, res)
    });
    router.post('/login', async(req, res)=> {
        await login(req,res)
    });
    router.put('/:id', async (req, res) => {
        await updateUser(req, res);
      });

      router.delete('/:id', async(req, res)=> {
          await deleteUser(req,res)
      })
      router.get('/:id', async(req, res)=> {
          await getOneUser(req, res)
      })
      router.get('/admin/users', async(req, res)=> {
          await getAllUsers(req, res)
      })
    return router
}