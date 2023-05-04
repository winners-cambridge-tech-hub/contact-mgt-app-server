const models = require('../models');
const Validator = require('fastest-validator');

function post(req, res) {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    middleName: req.body.middleName,
    email: req.body.email,
    contactAddress: req.body.contactAddress,
    birthMonth: req.body.birthMonth,
    birthDay: req.body.birthDay,
    townCity: req.body.townCity,
    county: req.body.county,
    country: req.body.country,
    postCode: req.body.postCode,
    gender: req.body.gender,
    mobileNumber: req.body.mobileNumber,
    maritalStatus: req.body.maritalStatus,
    firstAttendance: req.body.firstAttendance,
    bfc_status: req.body.bfc_status,
    water_baptism: req.body.water_baptism,
    service_unit: req.body.service_unit,
    wofbi_status: req.body.wofbi_status,
    status: req.body.status,
    approvedTime: req.body.approvedTime,
    createDate: req.body.createDate,
    createdBy: req.body.createdBy,
    lastModifiedDate: req.body.lastModifiedDate,
    modifiedBy: req.body.modifiedBy,
  };

  const schema = {
    firstName: { type: 'string', optional: false, max: '50' },
    middleName: { type: 'string', optional: true, max: '50' },
    lastName: { type: 'string', optional: false, max: '50' },
    email: { type: 'string', optional: true, max: '50', unique: true },
    contactAddress: { type: 'string', optional: true, max: '50' },
    birthMonth: { type: 'string', optional: true, max: '50' },
    birthDay: { type: 'string', optional: true, max: '50' },
    townCity: { type: 'string', optional: true, max: '50' },
    county: { type: 'string', optional: true, max: '50' },
    country: { type: 'string', optional: true, max: '50' },
    postCode: { type: 'string', optional: true, max: '50' },
    gender: { type: 'string', optional: false, max: '50' },
    mobileNumber: { type: 'integer', optional: true, max: '50' },
    maritalStatus: { type: 'string', optional: true, max: '50' },
    firstAttendance: { type: 'date', optional: true, max: '50' },
    bfc_status: { type: 'string', optional: true, max: '50' },
    water_baptism: { type: 'string', optional: true, max: '50' },
    service_unit: { type: 'string', optional: true, max: '50' },
    wofbi_status: { type: 'string', optional: true, max: '50' },
    status: { type: 'string', optional: true, max: '50' },
    approvedTime: { type: 'date', optional: false, max: '50' },
    createDate: { type: 'date', optional: true, max: '50' },
    createdBy: { type: 'string', optional: false, max: '50' },
    lastModifiedDate: { type: 'date', optional: false, max: '50' },
    modifiedBy: { type: 'string', optional: false, max: '50' },
  };

  const v = new Validator();
  const validationResponse = v.validate(contact, schema);

  if (validationResponse !== true) {
    return res
      .status(400)
      .json({ message: 'validation failed', errors: validationResponse });
  }

  models.Contact.create(contact)
    .then((result) => {
      res.status(201).json({
        message: 'contact successfully created.',
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'something went wrong',
        error: err,
      });
    });
}

function getAllContact(req, res) {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 2;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 2) {
    size = sizeAsNumber;
  }

  const contact = models.Contact.findAndCountAll({
    limit: size,
    offset: page * size,
  })
    .then((result) => {
      res.status(200).json({
        content: result.rows,
        totalPages: Math.ceil(contact.count / size),
      });
    })
    .catch((err) => {
      res.status(500).json({ message: 'something went wrong' });
    });
}

function getOneContact(req, res) {
  const id = req.params.id;

  models.Contact.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'Contact not found' });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}

function update(req, res) {
  const id = req.params.id;
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    middleName: req.body.middleName,
    email: req.body.email,
    contactAddress: req.body.contactAddress,
    birthMonth: req.body.birthMonth,
    birthDay: req.body.birthDay,
    townCity: req.body.townCity,
    county: req.body.county,
    country: req.body.country,
    postCode: req.body.postCode,
    gender: req.body.gender,
    mobileNumber: req.body.mobileNumber,
    maritalStatus: req.body.maritalStatus,
    firstAttendance: req.body.firstAttendance,
    bfc_status: req.body.bfc_status,
    water_baptism: req.body.water_baptism,
    service_unit: req.body.service_unit,
    wofbi_status: req.body.wofbi_status,
    status: req.body.status,
    approvedTime: req.body.approvedTime,
    createDate: req.body.createDate,
    createdBy: req.body.createdBy,
    lastModifiedDate: req.body.lastModifiedDate,
    modifiedBy: req.body.modifiedBy,
  };
  const schema = {
    firstName: { type: 'string', optional: false, max: '50' },
    middleName: { type: 'string', optional: true, max: '50' },
    lastName: { type: 'string', optional: false, max: '50' },
    email: { type: 'string', optional: true, max: '50', unique: true },
    contactAddress: { type: 'string', optional: true, max: '50' },
    birthMonth: { type: 'string', optional: true, max: '50' },
    birthDay: { type: 'string', optional: true, max: '50' },
    townCity: { type: 'string', optional: true, max: '50' },
    county: { type: 'string', optional: true, max: '50' },
    country: { type: 'string', optional: true, max: '50' },
    postCode: { type: 'string', optional: true, max: '50' },
    gender: { type: 'string', optional: false, max: '50' },
    mobileNumber: { type: 'integer', optional: true, max: '50' },
    maritalStatus: { type: 'string', optional: true, max: '50' },
    firstAttendance: { type: 'date', optional: true, max: '50' },
    bfc_status: { type: 'string', optional: true, max: '50' },
    water_baptism: { type: 'string', optional: true, max: '50' },
    service_unit: { type: 'string', optional: true, max: '50' },
    wofbi_status: { type: 'string', optional: true, max: '50' },
    status: { type: 'string', optional: true, max: '50' },
    approvedTime: { type: 'date', optional: false, max: '50' },
    createDate: { type: 'date', optional: true, max: '50' },
    createdBy: { type: 'string', optional: false, max: '50' },
    lastModifiedDate: { type: 'date', optional: false, max: '50' },
    modifiedBy: { type: 'string', optional: false, max: '50' },
  };

  const v = new Validator();
  const validationResponse = v.validate(updatedContact, schema);
  if (validationResponse !== true) {
    return res
      .status(400)
      .json({ message: 'validation failed', errors: validationResponse });
  }

  models.Contact.update(updatedContact, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: 'updated post successfully',
        contact: updatedContact,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'something went wrong',
        error: error,
      });
    });
}

function destroy(req, res) {
  const id = req.params.id;

  models.Contact.destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).json({ message: 'deleted contact successfully' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'something went wrong', error: error });
    });
}

module.exports = {
  post: post,
  getOneContact: getOneContact,
  getAllContact: getAllContact,
  update: update,
  destroy: destroy,
};
