const commonDbHandler = require('../models/actions/common');

class CommonService {
    constructor() { }

    static getRepeatTypes = async () => {
        const repeatTypes = await commonDbHandler.getAllRepeatTypes();
        return repeatTypes.rows;
    }
}

module.exports = CommonService;