const Receipt = require('../models/receipt');

class ReceiptService {
    async createReceipt(name, categoryId) {
        try {
            const receipt = await Receipt.create({
                name,
                categoryId
            });
            return receipt;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create receipt');
        }

    }

    async getReceiptById(id) {
        try {
            const receipt = await Receipt.findByPk(id);
            return receipt;
        }
        catch{
            throw new Error('Receipt not found');
        }
    }
}
module.exports = ReceiptService;