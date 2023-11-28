const models = require('../../models')
const {ContactAssembler} = require('../dto/contact.assembler')
const {ContactService} = require('../services/contact.service')
const {ContactValidator} = require('../validators/contact.validator')
const {Pagination} = require('../services/pagination.service')
const readXlsxFile = require("read-excel-file/node");

const Contact = models.Contact;

let contactAssembler = new ContactAssembler();
let contactService = new ContactService();
let contactValidator = new ContactValidator();

// Controller - Collect the data from the user
        // Assembler -
        // Validator - Validate the data

// Service - Process the data before saving in the dtabase
        // Repository - Saving the data in to the database

// DTO - Data transfer Object


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
    contactService.getAllContacts(page, size, email, phone_number, first_name, middle_name, last_name, birthday_month)
        .then(result => {
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


async function uploadContacts(req, res) {

    try {
        if (req.file === undefined) {
            return res.status(400).send("Please upload an excel file!");
        }
        let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;
        let contacts = await contactAssembler.disassembleUpload(path);

        Contact.bulkCreate(contacts)
            .then(() => {
                res.status(200).send({
                    message: "Uploaded the file successfully: " + req.file.originalname,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    message: "Fail to import data into database!",
                    error: error.message,
                });
            });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
}


module.exports = {
    createNewContact: createNewContact,
    getOneContact: getOneContact,
    getAllContact: getAllContact,
    updateContact: updateContact,
    deleteContact: deleteContact,
    uploadContacts: uploadContacts,
};
