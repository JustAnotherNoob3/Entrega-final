import { daoUsers } from "./index.js";
import { __dirname } from '../utils/misc_utils.js';
import email_sender from "../utils/email_sender.js";
import { logger } from "../utils/logger.js";

class UserManager {
    async changeRoleOfUser(uid) {
        let x = await daoUsers.getById(uid);
        if (x.role == 'premium') { await daoUsers.update(uid, { role: "user" }); return }
        if(!(await this.#checkIfArrayHasOnName(x.documents, ["id","location","status"]))) throw new Error("Necesitas subir la documentacion requerida!");
        await daoUsers.update(uid, { role: "premium" });
    }
    async get() {
        users = await daoUsers.get();
        users.map((obj) => {
            return { name: obj.first_name, email: obj.email, role: obj.role }
        })
        return users;
    }
    async addDocs(uid, files) {
        console.log(files)
        let user = await this.getUserById(uid);
        Object.keys(files).forEach(async element => {
            let i = user.documents.findIndex(x => { x.name == element });
            if (i != -1) {
                user.documents[i] = {
                    name: element,
                    reference: files[element][0].path
                };
            }
            else {
                let doc = {
                    name: element,
                    reference: files[element][0].path
                };
                user.documents.push(doc)
            }
        });
        await daoUsers.saveChangesOnObject(user);
    }
    async updateLastConnection(uid) {
        await daoUsers.update(uid, { last_connection: Date.now() });
    }
    async cleanInactiveUsers() {
        let users = await daoUsers.get();
        let toDelete = [];
        users.forEach(async x => {
            if (Date.now() - (x.last_connection + 172800000) > 0) toDelete.push(x._id);
            await email_sender(x.email, "Cuenta eliminada por inactividad", "Tu cuenta en el ecommerce fue eliminada por inactividad.");
        });
        toDelete.forEach(async x => {
            await daoUsers.delete(x);
        });

    }
    async deleteUser(uid) {
        let user = await daoUsers.getById(uid);
        await email_sender(user.email, "Cuenta eliminada por admin", "Tu cuenta en el ecommerce fue eliminada por un admin.");
        await daoUsers.delete(uid);
    }
    async getUserById(uid) {
        let user = await daoUsers.getById(uid);
        if (user == undefined) {
            throw Error("No user with ID " + uid);
        }
        return user;
    };
    async sendEmailToUser(uid, subject, content, attachments) {
        let mail = (await this.getUserById(uid)).email;
        await email_sender(mail, subject, content, attachments);
    }
    async #checkIfArrayHasOnName(array, secondarray){
        let result = true;
        if(array.length == 0) return false;
        secondarray.forEach(element => {

            if(!array.some(x => x.name == element)) result = false;
            
        });
        return result;
    }
}

const userManager = new UserManager();
export default userManager;


