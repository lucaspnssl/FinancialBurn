const Card = require('../models/Card');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { description, limit, cardBank } = req.body;
        
        const card = await Card.create({
            description,
            limit,
            cardBank,
            user: user_id
        }).catch(error => {
            return res.status(400).json(error); 
        });

        return res.json(card);
    },

    async update(req, res) {
        const card = await Card.findByIdAndUpdate(req.params.card_id, req.body, {
            new: true  
        }).catch(error => {
            return res.status(400).json(error);
        });

        return res.json(card);
    },

    async show(req, res) {
        const { user_id } = req.headers;

        const card = await Card.find({
            user: user_id
        });

        return res.json(card);
    },

    async destroy(req, res) {
        await Card.findByIdAndRemove(req.params.card_id);

        return res.send();
    }
}