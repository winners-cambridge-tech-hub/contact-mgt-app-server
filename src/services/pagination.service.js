class Pagination {

    constructor() {
    }

    getPagingData(data, page, size) {
        const {count: totalElements, rows: contacts} = data;
        const number = page ? +page : 0;
        const totalPages = Math.ceil(totalElements / size);

        return {
            _embedded: {contacts},
            page: {totalPages, number, totalElements, size}
        };
    };

    getPagination(page, size) {
        size = size ? +size : 20;
        const offset = page ? page * size : 0;

        return {size, offset};
    }

}

module.exports = {
    Pagination: Pagination
}


