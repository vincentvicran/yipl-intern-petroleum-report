const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Report = require('../models/Report');
const sequelize = require('../utils/database');
const { Op } = require('sequelize');

exports.viewAll = catchAsync(async (req, res, next) => {
    const reports = await Report.findAll();

    if (!reports) {
        return next(new AppError('No report found!', 400));
    }

    res.status(200).json({
        status: 'success',
        results: reports.length,
        message: 'Requested reports have been found!',
        data: reports,
    });
});

exports.getIndividualPetroleumSales = catchAsync(async (req, res, next) => {
    const reports = await Report.findAll({
        attributes: [
            ['petroleum_product', 'Product'],
            [sequelize.fn('SUM', sequelize.col('sale')), 'Total Sales'],
        ],
        group: ['Product'],
    });

    if (!reports) {
        return next(new AppError('No report found!', 400));
    }

    res.status(200).json({
        status: 'success',
        results: reports.length,
        message: 'The list of total sale of each petroleum product is here!',
        data: reports,
    });
});

exports.getRankedCountrySales = catchAsync(async (req, res, next) => {
    const lowestSalesCountries = await Report.findAll({
        limit: 3,
        attributes: [
            'country',
            [sequelize.fn('SUM', sequelize.col('sale')), 'sales'],
        ],
        group: ['country'],
        order: sequelize.col('sales'),
    });

    const highestSalesCountries = await Report.findAll({
        limit: 3,
        attributes: [
            'country',
            [sequelize.fn('SUM', sequelize.col('sale')), 'sales'],
        ],
        group: ['country'],
        order: sequelize.literal('sales DESC'),
    });

    if (!highestSalesCountries || !lowestSalesCountries) {
        return next(new AppError('No report found!', 400));
    }

    res.status(200).json({
        status: 'success',
        message:
            'This is the list of the top 3 countries that have the highest and lowest total sales till date!',
        data: {
            lowestSalesCountries,
            highestSalesCountries,
        },
    });
});

exports.getAverageSales = catchAsync(async (req, res, next) => {
    var year = '2007' || '2008' || '2009' || '2010';
    const reports = await Report.scope(
        'avoidZeroSales',
        'yearIntervalA'
    ).findAll({
        attributes: [
            ['petroleum_product', 'Product'],
            [
                sequelize.fn(
                    'REPLACE',
                    sequelize.col('year'),
                    `${year}`,
                    '2007-2010'
                ),
                'Year',
            ],
            ['sale', 'Sale'],
        ],
    });

    if (!reports) {
        return next(new AppError('No report found!', 400));
    }

    res.status(200).json({
        status: 'success',
        results: reports.length,
        message:
            'This is the list of average sale of each petroleum product for 4 years of interval!',
        data: reports,
    });
});
