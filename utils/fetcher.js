const axios = require('axios');
const catchAsync = require('./catchAsync');
const Report = require('../models/Report');

let url =
    'https://raw.githubusercontent.com/younginnovations/internship-challenges/master/programming/petroleum-report/data.json';

const fetcher = catchAsync(async () => {
    const response = await axios.get(url);
    const { data } = response;

    data.map((report) =>
        Report.create({
            year: report.year,
            petroleum_product: report.petroleum_product,
            sale: report.sale,
            country: report.country,
        })
    );
});

module.exports = fetcher;
