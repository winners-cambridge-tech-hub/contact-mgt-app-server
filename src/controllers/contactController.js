const models = require('../../models')
const {ContactAssembler} = require('../dto/contact.assembler')
const {ContactService} = require('../services/contact.service')
const {ContactValidator} = require('../validators/contact.validator')
const {Pagination} = require('../services/pagination.service')

let contactAssembler = new ContactAssembler();
let contactService = new ContactService();
let contactValidator = new ContactValidator();

function createNewContact(req, res) {
    let contactDto = contactAssembler.disassemble(req);
    let validationResponse = contactValidator.validate(contactDto);
    if (validationResponse !== true) {
        return res.status(400).json(validationResponse)
    }
    contactService.createNewContact(contactDto).then(result => {
        res.status(201).json(result)
    }).catch(error => {
        res.status(error.statusCode).json(error)
    })
}

function getAllContact(req, res) {
    const {page, size, email, phone_number, first_name, middle_name, last_name, birthday_month} = req.query;
    contactService.getAllContacts(page, size, email, phone_number, first_name, middle_name, last_name, birthday_month).then(result => {
        console.log(result)
        res.status(200).json(result)
    }).catch(error => {
        res.status(400).json(error)
    })
}

function getOneContact(req, res) {
    const id = req.params.id;
    contactService.getOneContact(id).then(result => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(error.statusCode).json(error)
    })
}

function updateContact(req, res) {
    const id = req.params.id;
    let contactDto = contactAssembler.disassemble(req);
    let validationResponse = contactValidator.validate(contactDto);
    if (validationResponse !== true) {
        return res.status(400).json(validationResponse)
    }
    contactService.updateContact(contactDto, id).then(result => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(error.statusCode).json(error)
    })
}

function deleteContact(req, res) {
    const id = req.params.id;
    contactService.deleteContact(id).then(result => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(error.statusCode).json(error)
    })
}

module.exports = {
    createNewContact: createNewContact,
    getOneContact: getOneContact,
    getAllContact: getAllContact,
    updateContact: updateContact,
    deleteContact: deleteContact,
};
