const Details = require("../models/Details");

module.exports.addDetails = async (req, res) => {
  const { user_id, outOrIn, reason, amount } = req.body;
  const date = new Date();
  try {
    const logEntry = {
      in: outOrIn === "in" ? amount : 0,
      out: outOrIn === "out" ? amount : 0,
      reason,
      date,
    };

    const detail = await Details.findOneAndUpdate(
      { user_id },
      { $push: { logs: logEntry } },
      { new: true, upsert: true }
    );

    return res.json({
      data: true,
      details: await Details.find().sort({ position: 1 }),
    });
  } catch (err) {
    console.error(err);
    return res.json({ data: false, msg: "Something went wrong" });
  }
};
