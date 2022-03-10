const express = require('express');

const router = express.Router({ mergeParams: true });

const reportController = require('../controllers/reportController');

router.route('/').get(reportController.viewAll);
router
    .route('/petroleum-sales')
    .get(reportController.getIndividualPetroleumSales);
router.route('/country-sales').get(reportController.getRankedCountrySales);
router.route('/average-sales').get(reportController.getAverageSales);

module.exports = router;
