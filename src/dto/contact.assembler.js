const {ContactDto} = require("./contact.dto")
const Validator = require('fastest-validator');
const readXlsxFile = require("read-excel-file/node");

class ContactAssembler {

    assemble(req) {
        let first_name = req.first_name;
        let last_name = req.last_name;
        let middle_name = req.middle_name;
        let email = req.email;
        let contact_address = req.contact_address;
        let birthday_month = req.birthday_month;
        let birthday_day = req.birthday_day;
        let town_city = req.town_city;
        let county = req.county;
        let country = req.country;
        let post_code = req.post_code;
        let gender = req.gender;
        let phone_number = req.phone_number;
        let marital_status = req.marital_status;
        let first_attendance = req.first_attendance;
        let bfc_status = req.bfc_status;
        let water_baptism = req.water_baptism;
        let service_unit = req.service_unit;
        let wofbi_status = req.wofbi_status;
        let status = req.status;
        let approved_time = req.approved_time;
        let create_date = req.create_date;
        let created_by = req.created_by;
        let last_modified_date = req.last_modified_date;
        let modified_by = req.modified_by;

        return new ContactDto(first_name, last_name, middle_name,
            email, contact_address, birthday_month,
            birthday_day, town_city, county,
            country, post_code, gender,
            phone_number, marital_status, first_attendance,
            bfc_status, water_baptism, service_unit,
            wofbi_status, status, approved_time,
            create_date, created_by, last_modified_date);

            // Assuming you have a req.categories array containing category names
            
        const contactDto = new ContactDto(first_name, last_name, middle_name,
            email, contact_address, birthday_month,
            birthday_day, town_city, county,
            country, post_code, gender,
            phone_number, marital_status, first_attendance,
            bfc_status, water_baptism, service_unit,
            wofbi_status, status, approved_time,
            create_date, created_by, last_modified_date);

        // Add categories to the contactDto
        if (req.categories && Array.isArray(req.categories)) {
            req.categories.forEach(category => {
                const categoryDto = CategoryAssembler.toDTO({ name: category });
                contactDto.addCategory(categoryDto);
            });
        }

        return contactDto;
    }

    disassemble(req) {

        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let middle_name = req.body.middle_name;
        let email = req.body.email;
        let contact_address = req.body.contact_address;
        let birthday_month = req.body.birthday_month;
        let birthday_day = req.body.birthday_day;
        let town_city = req.body.town_city;
        let county = req.body.county;
        let country = req.body.country;
        let post_code = req.body.post_code;
        let gender = req.body.gender;
        let phone_number = req.body.phone_number;
        let marital_status = req.body.marital_status;
        let first_attendance = req.body.first_attendance;
        let bfc_status = req.body.bfc_status;
        let water_baptism = req.body.water_baptism;
        let service_unit = req.body.service_unit;
        let wofbi_status = req.body.wofbi_status;
        let status = req.body.status;
        let approved_time = req.body.approved_time;
        let create_date = req.body.create_date;
        let created_by = req.body.created_by;
        let last_modified_date = req.body.last_modified_date;
        let modified_by = req.body.modified_by;

        const contactDto = new ContactDto(first_name, last_name, middle_name,
            email, contact_address, birthday_month,
            birthday_day, town_city, county,
            country, post_code, gender,
            phone_number, marital_status, first_attendance,
            bfc_status, water_baptism, service_unit,
            wofbi_status, status, approved_time,
            create_date, created_by, last_modified_date);

            

        return contactDto;
    }

    async disassembleUpload(path) {

        let data = await readXlsxFile(path).then((rows) => {

            rows.shift();
            let contacts = [];

            rows.forEach((row) => {
                let c = {
                    first_name: row[0],
                    middle_name: row[1],
                    last_name: row[2],
                    email: row[3],
                    phone_number: row[4],
                    contact_address: row[5],
                    marital_status: row[6],
                    town_city: row[7],
                    county: row[8],
                    post_code: row[9],
                    birthday_month: row[10],
                    birthday_day: row[11],
                    gender: row[12],
                    first_attendance: row[13],
                    bfc_status: row[14],
                    water_baptism: row[15],
                    service_unit: row[16],
                    wofbi_status: row[17],
                    approved_time: row[18],
                    create_date: row[19],
                    create_by: row[20],
                    last_modified_date: row[21],
                    modified_by: row[22],
                    status: row[23],
                };

                const contactDto = new ContactDto(c.first_name, c.last_name, c.middle_name,
                    c.email, c.contact_address, c.birthday_month,
                    c.birthday_day, c.town_city, c.county,
                    c.country, c.post_code, c.gender,
                    c.phone_number, c.marital_status, c.first_attendance,
                    c.bfc_status, c.water_baptism, c.service_unit,
                    c.wofbi_status, c.status, c.approved_time,
                    c.create_date, c.created_by, c.last_modified_date);

                contacts.push(contactDto);
            });
            return contacts;
        });
        return data;
    }

}

module.exports = {
    ContactAssembler: ContactAssembler
}
