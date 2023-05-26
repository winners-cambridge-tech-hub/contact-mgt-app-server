const models = require('../../models')

class ContactRepositories{

    async save(contactDto) {
        const newContact = await models.Contact.create(contactDto);
        return newContact;
    }

    async saveById(contactDto, id) {
        return await models.Contact.update(contactDto, {where: {id: id}});
    }

    async delete(id){
       return await models.Contact.destroy({where: {id: id}});
    }

    async findById(id){
        return await models.Contact.findByPk(id);
    }

    async findByEmail(emailString) {
        const contact = await models.Contact.findOne({where: {email: emailString}});
        return contact;
    }

    async findAll(condition, limit, offset) {
       return  models.Contact.findAndCountAll({where: condition, limit, offset})
    }

}

module.exports = {
    ContactRepositories: ContactRepositories
}
