const User = require("../models/User");

// index, show, store, update, destroy

module.exports = {
  async store(req, res) {
    const { email, nickname } = req.body;

    if (!email || !nickname) {
      return res.status(400).json({
        error: "Invalid e-mail or nickname"
      });
    }

    let user = await User.findOne()
      .or([
        {
          email
        },
        {
          nickname
        }
      ])
      .catch(error => {
        return res.status(400).json(error);
      });

    if (!user) {
      user = await User.create({ email, nickname });
    }

    return res.json(user);
  }
};
