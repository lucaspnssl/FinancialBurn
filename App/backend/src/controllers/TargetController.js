const Target = require('../models/Target');
const User = require('../models/User');
const Dept = require('../models/Dept');

module.exports = {
    async show(req, res) {
        const { user_id } = req.headers;
        const { page = 1 } = req.query;

        const targets = await Target.paginate({
            user: user_id
        }, { page, limit: 4 })
        

        let struct = [];

        for (let i = 0; i < targets.docs.length; i++) {
            const depts = await Dept.find({
                target: targets.docs[i]._id
            });

            let totalValue = 0;

            Object.keys(depts).forEach(dept => {
                totalValue += depts[dept].value;        
            });            
            
            struct.push({target: targets.docs[i], totalValue, actualPage: targets.page, totalPages: targets.pages });
        }

        return res.json(struct);
    },

    async store(req, res) {
            const { user_id } = req.headers;
            const { name }  = req.body;

            const user = await User.findOne({
                _id: user_id
            });

            if (!user) {
                return res.status(400).json({
                    error: 'User does not exists'
                }); 
            }

            let target = await Target.findOne({
                name,
                user: user_id
            });

            if (!target) {
                target = await Target.create({
                    name: name,
                    user: user_id
                });
            } else {
                return res.status(400).json({
                    error: 'Target already exists'
                });
            }

            return res.json(target);
    },

    async update(req, res) {
        const target = await Target.findByIdAndUpdate(req.params.target_id, req.body, {
            new: true
        });

        return res.json(target);
    },

    async destroy(req, res) {
        const { target_id } = req.params;

        //Remove todas as dependencias
        await Dept.remove({
            target: target_id
        }).catch(error => {
            return res.status(400).json(error);
        });

        await Target.findByIdAndDelete(target_id);

        return res.send();
    }
}