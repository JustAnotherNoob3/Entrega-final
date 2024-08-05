import { Router } from "express";
import { __dirname, isValidPassword } from "../utils/misc_utils.js";
import { daoUsers } from "../Repositories/index.js";
import { uploader } from "../utils/multer.js";
import userManager from "../Repositories/UserManager.js";
import { isAdmin } from "../auth.js";


const userRouter = Router();

userRouter.get('/premium/:uid', async (req, res) => {
    try{
    let uid = req.params.uid;
    await userManager.changeRoleOfUser(uid);
    res.status(200).send({ status: "success" });
    } catch (error) {
        res.status(400).send({ status: "error", error: error.toString() });
    }
});
userRouter.post('/:uid/documents', uploader.fields([{ name: 'id', maxCount: 1 }, { name: 'location', maxCount: 1 }, {name: "status", maxCount: 1}]), async (req, res) => {
    try{
    if(!req.files) throw new Error("No se pudo guardar los documentos");
    await userManager.addDocs(req.params.uid, req.files);
    res.status(200).send({ status: "success" });
    } catch (error){
        res.status(400).send({ status: "error", error: error.toString() });
    }
});
userRouter.get('/', async (req, res) => {
    try{
        let users = await userManager.get()
        res.status(200).send({ status: "success", payload:users});
    } catch (error){
        res.status(400).send({ status: "error", error: error.toString() });
    }
});
userRouter.get('/:uid', async (req, res) => {
    try{
        let user = await userManager.getUserById(req.params.uid);
        res.status(200).send({ status: "success", payload:user});
    } catch (error){
        res.status(400).send({ status: "error", error: error.toString() });
    }
});
userRouter.delete('/', isAdmin, async (req, res) => {
    try{
        await userManager.cleanInactiveUsers()
        res.status(200).send({ status: "success"});
    } catch (error){
        res.status(400).send({ status: "error", error: error.toString() });
    }
});
userRouter.delete('/:uid', isAdmin, async (req, res) => {
    try{
        await userManager.deleteUser(req.params.uid)
        res.status(200).send({ status: "success"});
    } catch (error){
        res.status(400).send({ status: "error", error: error.toString() });
    }
});
export default userRouter;
