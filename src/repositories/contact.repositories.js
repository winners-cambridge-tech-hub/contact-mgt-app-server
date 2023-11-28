const models = require('../../models')

let Op = models.Sequelize.Op;

class ContactRepositories {

    async save(contactDto) {
        const newContact = await models.Contact.create(contactDto);
        return newContact;
    }

    async saveById(contactDto, id) {
        return await models.Contact.update(contactDto, {where: {id: id}});
    }

    async delete(id) {
        return await models.Contact.destroy({where: {id: id}});
    }

    async findById(id) {
        return await models.Contact.findByPk(id);
    }

    async findByEmail(emailString) {
        const contact = await models.Contact.findOne({where: {email: emailString}});
        return contact;
    }

    async findAll(email, phone_number, first_name, middle_name, last_name, birthday_month, limit, offset) {
        let emailParam = email ? {email: {[Op.like]: `%${email}%`}} : null;
        let phoneNumberParam = phone_number ? {phone_number: {[Op.like]: `%${phone_number}%`}} : null;
        let firstNameParam = first_name ? {first_name: {[Op.like]: `%${first_name}%`}} : null;
        let middleNameParam = middle_name ? {middle_name: {[Op.like]: `%${middle_name}%`}} : null;
        let lastNameParam = last_name ? {last_name: {[Op.like]: `%${last_name}%`}} : null;
        let birthdayMonthParam = birthday_month ? {birthday_month: {[Op.eq]: `${birthday_month}`}} : null;

        let condition = (emailParam || phoneNumberParam || firstNameParam || middleNameParam || lastNameParam || birthdayMonthParam) ?
            {[Op.and]: [emailParam, phoneNumberParam, firstNameParam, middleNameParam, lastNameParam, birthdayMonthParam]} : null;

        return models.Contact.findAndCountAll({where: condition, limit, offset})
    }
}

module.exports = {
    ContactRepositories: ContactRepositories
}
