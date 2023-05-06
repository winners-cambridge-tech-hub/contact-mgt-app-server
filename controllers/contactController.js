const models = require('../models');

const { Op } = require('sequelize');

function create(req, res) {
  models.Contact.findOne({
    where: { email: req.body.email },
  }).then((result) => {
    if (result) {
      res.status(400).json({ message: 'email already exists' });
      return;
    } else {
      const contact = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        middle_name: req.body.middle_name,
        email: req.body.email,
        contact_address: req.body.contact_address,
        birthday_month: req.body.birthday_month,
        birthday_day: req.body.birthday_day,
        town_city: req.body.town_city,
        county: req.body.county,
        country: req.body.country,
        post_code: req.body.post_code,
        gender: req.body.gender,
        mobile_number: req.body.mobile_number,
        marital_status: req.body.marital_status,
        first_attendance: req.body.first_attendance,
        bfc_status: req.body.bfc_status,
        water_baptism: req.body.water_baptism,
        service_unit: req.body.service_unit,
        wofbi_status: req.body.wofbi_status,
        status: req.body.status,
        approved_time: req.body.approved_time,
        create_date: req.body.create_date,
        created_by: req.body.created_by,
        last_modified_date: req.body.last_modified_date,
        modified_by: req.body.modified_by,
      };
      if (
        contact.first_name === '' ||
        contact.last_name === '' ||
        contact.email === '' ||
        contact.status === ''
      ) {
        res.json({ message: 'please provide required field' });
      } else {
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
    }
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
    query: {
      $select: ['email', 'birthday_month'],
    },
  })
    .then((result) => {
      res.status(200).json({
        content: result.rows,
        totalPages: Math.ceil(result.count / size),
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
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    middle_name: req.body.middle_name,
    email: req.body.email,
    contact_address: req.body.contact_address,
    birthday_month: req.body.birthday_month,
    birthday_day: req.body.birthday_day,
    town_city: req.body.town_city,
    county: req.body.county,
    country: req.body.country,
    post_code: req.body.post_code,
    gender: req.body.gender,
    mobile_number: req.body.mobile_number,
    marital_status: req.body.marital_status,
    first_attendance: req.body.first_attendance,
    bfc_status: req.body.bfc_status,
    water_baptism: req.body.water_baptism,
    service_unit: req.body.service_unit,
    wofbi_status: req.body.wofbi_status,
    status: req.body.status,
    approved_time: req.body.approvedTime,
    create_date: req.body.create_date,
    created_by: req.body.created_by,
    last_modified_date: req.body.last_modified_date,
    modified_by: req.body.modified_by,
  };

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
  create: create,
  getOneContact: getOneContact,
  getAllContact: getAllContact,
  update: update,
  destroy: destroy,
};
