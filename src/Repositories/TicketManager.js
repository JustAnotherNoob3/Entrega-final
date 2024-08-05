import { daoTickets } from "./index.js";
import { __dirname } from '../utils/misc_utils.js';
import email_sender from "../utils/email_sender.js";

class TicketManager {
    async generateTicket(products, amount, email) {
        let newDate = new Date(Date.now());
        let ticket = {
            code: crypto.randomUUID(),
            products: products,
            purchase_datetime: newDate.toUTCString(),
            amount: amount,
            purchaser: email
        };
        let newTicket = await daoTickets.create(ticket);
        let string = "";
        
        await email_sender(email, "Gracias por comprar en mi ecommerce, aqui esta el ticket.", `Ticket #${ticket.code}\n${JSON.stringify(ticket)}`);
        return newTicket._id;
    }
    async getAllTicketsRelatedToEmail(email){
        daoTickets.getByOther({purchaser: email});
    }
}

const ticketManager = new TicketManager();
export default ticketManager;


