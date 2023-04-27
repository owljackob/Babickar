const Receipt = require('../models/receipt');

class ReceiptService {
    async createReceipt(name) {
        const receipt = await Receipt.create({
            name,
        });
        return receipt;
    }

    async getReceiptById(id) {
        const receipt = await Receipt.findByPk(id);
        if (!receipt) {
            throw new Error('User not found');
        }
        return receipt;
    }
}
module.exports = ReceiptService;