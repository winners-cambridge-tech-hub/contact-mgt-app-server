const Validator = require('fastest-validator');

class ContactValidator {

    validate(contactDto) {
        const schema = {
            first_name: { type: "string", optional: false, max: "100" },
            last_name: { type: "string", optional: false, max: "100" },
            middle_name: { type: "string", optional: false, max: "100" },
            email: { type: "email", optional: false, max: "100" },
            contact_address: { type: "string", optional: false, max: "100" },
            birthday_month: { type: "number", positive: true, integer: true},
            birthday_day: { type: "number", positive: true, integer: true },
            town_city: { type: "string", optional: false, max: "100" },
            county: { type: "string", optional: false, max: "100" },
            post_code: { type: "string", optional: false, max: "100" },
            gender: { type: "string", optional: false, max: "100" },
            phone_number: { type: "string", optional: false, max: "100" },
            marital_status: { type: "string", optional: false, max: "100" },
            first_attendance: { type: "string", optional: false, max: "100" },
            bfc_status: { type: "string", optional: false, max: "100" },
            water_baptism: { type: "string", optional: false, max: "100" },
            service_unit: { type: "string", optional: false, max: "100" },
            wofbi_status: { type: "string", optional: false, max: "100" },
        }
        const v = new Validator();
        const validation_failed = v.validate(contactDto, schema);
        console.log(validation_failed)

        return validation_failed === true ? true : {validation_failed};

    }

}

module.exports = {
    ContactValidator: ContactValidator
}
