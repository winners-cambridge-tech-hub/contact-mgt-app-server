class Pagination {

    constructor() {
    }

    getPagingData(data, page, size) {
        size = isNaN(size) ? 20 : size;
        page = isNaN(page) ? 1 : page;

        const {count: totalElements, rows: contacts} = data;
        const number = page ? +page : 0;
        const totalPages = Math.ceil(totalElements / size);

        return {
            _embedded: {contacts},
            page: {totalPages, number, totalElements, size}
        };
    };

    getPagination(page, size) {
        size = isNaN(size) ? 20 : size;
        page = (isNaN(page) || page < 1) ? 0 : page-1;

        size = size ? +size : 20;
        const offset = page ? page * size : 0;

        return {size, offset};
    }

}

module.exports = {
    Pagination: Pagination
}


