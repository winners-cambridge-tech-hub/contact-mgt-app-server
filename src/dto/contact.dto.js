class ContactDto {

    constructor(first_name, last_name, middle_name,
                email, contact_address, birthday_month,
                birthday_day, town_city, county,
                country, post_code, gender,
                phone_number, marital_status, first_attendance,
                bfc_status, water_baptism, service_unit,
                wofbi_status, status, approved_time,
                create_date, created_by, last_modified_date, modified_by) {
        this.first_name =  first_name;
        this.last_name =  last_name;
        this.middle_name =  middle_name;
        this.email =  email;
        this.contact_address =  contact_address;
        this.birthday_month =  birthday_month;
        this.birthday_day =  birthday_day;
        this.town_city =  town_city;
        this.county =  county;
        this.country =  country;
        this.post_code =  post_code;
        this.gender =  gender;
        this.phone_number =  phone_number;
        this.marital_status =  marital_status;
        this.first_attendance =  first_attendance;
        this.bfc_status =  bfc_status;
        this.water_baptism =  water_baptism;
        this.service_unit =  service_unit;
        this.wofbi_status =  wofbi_status;
        this.status =  status;
        this.approved_time =  approved_time;
        this.create_date =  create_date;
        this.created_by =  created_by;
        this.last_modified_date =  last_modified_date;
        this.modified_by =  modified_by;
    }

    setTitle(title) {
        this.title = title;
    }
    
    addCategory(category) {
        this.categories.push(category);
    }

}

module.exports = {
    ContactDto: ContactDto
}
