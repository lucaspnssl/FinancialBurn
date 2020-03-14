const Bank = require('../models/Bank');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { name, accountType, accountNumber, balance } = req.body;

        const bank = await Bank.create({
            name,
            accountType,
            accountNumber,
            balance,
            user: user_id
        }).catch(error => {
            return res.status(400).json(error);
        });

        return res.json(bank);
    },

    async index(req, res) {
        const { user_id } = req.headers;

        const banks = await Bank.find({
            user: user_id
        });

        return res.json(banks);
    },

    async update(req, res) {
        const { bank_id } = req.params;

        const bank = await Bank.findByIdAndUpdate(bank_id, req.body, {
            new: true
        }).catch(error => {
            return res.status(400).json(error);
        });

        return res.json(bank);
    },

    async destroy(req, res) {
        await Bank.findByIdAndRemove(req.params.bank_id).catch(error => { 
            return res.status(400).json(error)
        });

        return res.send();
    }
}