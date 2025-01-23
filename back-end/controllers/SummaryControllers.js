const User = require("../models/Summary");
const Details = require("../models/Details");

module.exports.addSummaryUser = async (req, res) => {
  const { user } = req.body;
  try {
    const exist = await User.findOne({ name: user });
    if (exist) {
      return res.json({ data: false, msg: "This name already exist" });
    } else {
      const newUser = new User({ name: user });
      await newUser.save();
      const newDetails = new Details({user_id: newUser._id});
      await newDetails.save();
      return res.json({ data: true });
    }
  } catch (err) {
    console.log("Error in backend part");
    return res.json({ data: false, msg: "Something went wrong" });
  }
};

module.exports.getAllUsers = async(req, res) => {
  try {
    const users = await User.find().sort({ position: 1 });
    return res.json({data: true, user: users});
  } catch(err) {
    return res.json({data: false, msg: "Something went wrong"})
  }
}

module.exports.getIndividualDetails = async(req, res) => {
  const {user_id} = req.query;
  try {
    const details = await Details.findOne({ user_id });
    const users = await User.findById(user_id);
    return res.json({data: true, detail: details, user: users})
  } catch(err) {
    return res.json({data: false, msg:"Something went wrong"})
  }
}