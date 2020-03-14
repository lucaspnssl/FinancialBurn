const Dept = require('../models/Dept');
const Target = require('../models/Target');

module.exports = {
    async store(req, res) {
        const { target_id } = req.params;
        const { value, description } = req.body;

        const target = await Target.findOne({
            _id: target_id
        });

        if (!target) {
            return res.status(400).json({
                error: 'Target does not exists'
            }); 
        }

        const dept = await Dept.create({
            value,
            description,
            target: target_id
        });

        return res.json(dept);
    },

    async index(req, res) {
        const { target_id } = req.params;

        const depts = await Dept.find({
            target: target_id
        });

        return res.json(depts);
    },

    async destroy(req, res) {
        await Dept.findByIdAndRemove(req.params.dept_id);

        return res.send();
    }
}