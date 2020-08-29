const express = require('express');

const router = express.Router();

const controller = require('../controller/region.js')

router.get('/', controller.list_regions );

router.get('/:continent/:region', controller.display_time_region );

router.get('/:timestamp', controller.display_time_timestamp );

module.exports = router;