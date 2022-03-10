const { Model, DataTypes, Op } = require('sequelize');

const sequelize = require('../utils/database');

class Report extends Model {}

Report.init(
    {
        year: {
            type: DataTypes.STRING,
        },
        petroleum_product: {
            type: DataTypes.STRING,
        },
        sale: {
            type: DataTypes.NUMBER,
        },
        country: {
            type: DataTypes.STRING,
        },
    },
    {
        scopes: {
            avoidZeroSales: {
                where: {
                    sale: {
                        [Op.ne]: 0,
                    },
                },
            },
            yearIntervalA: {
                where: {
                    year: {
                        [Op.between]: ['2007', '2010'],
                    },
                },
            },
            yearIntervalB: {
                where: {
                    year: {
                        [Op.between]: ['2011', '2014'],
                    },
                },
            },
        },
        sequelize,
        modelName: 'report',
    }
);

module.exports = Report;
