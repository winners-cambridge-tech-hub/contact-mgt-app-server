const {ContactRepositories} = require('../repositories/contact.repositories')
const Api404Error = require('../exception/api404Error')
const {Pagination} = require('../services/pagination.service')

let contactRepositories = new ContactRepositories();
let pagination = new Pagination();

class ContactService {

    constructor() {}

    async createNewContact(contactDto) {
        const result = await this.getContactByEmail(contactDto.email).then((result) => {
            if (result) {
                throw new Api404Error(`Email id: ${contactDto.email} already exists.`);
            } else {
                return this.contactRepositories.save(contactDto);
            }
        })
        return result;
    }

    async updateContact(contactDto, id) {
        const result = await contactRepositories.saveById(contactDto, id);
        return result;
    }

    async getOneContact(contactId) {
        const result = await contactRepositories.findById(contactId).then((result) => {
            if (result) {
                return result;
            } else {
                console.log(contactId+" NOT FOUND")
                throw new Api404Error(`Contact id: ${id} does not exists.`);
            }
        })

        return result;
    }

    async deleteContact(id) {
        const result = await contactRepositories.delete(id);
        return result;
    }

    async getAllContacts(page, dataSize, email, phone, first_name, middle_name, last_name, birthday_month) {
        const {size, offset} = pagination.getPagination(page, dataSize);
        return await contactRepositories.findAll(email, phone, first_name, middle_name, last_name, birthday_month, size, offset).then((result) => {
            return pagination.getPagingData(result, page, size)
        })
    }

    async getContactByEmail(emailString) {
        return await contactRepositories.findByEmail(emailString);
    }
}

module.exports = {
    ContactService: ContactService
}
