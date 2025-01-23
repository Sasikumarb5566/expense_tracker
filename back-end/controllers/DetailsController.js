const Details = require("../models/Details");
const User = require("../models/Summary");

module.exports.addDetails = async (req, res) => {
  const { user_id, outOrIn, reason, amount } = req.body;
  const date = new Date();
  try {
    const logEntry = {
      in: outOrIn === "in" ? Number(amount) : 0,
      out: outOrIn === "out" ? Number(amount) : 0,
      reason,
      date,
    };

    await Details.findOneAndUpdate(
      { user_id },
      { $push: { logs: logEntry } },
      { new: true, upsert: true }
    );

    const totals = await Details.aggregate([
      { $match: { user_id } },
      { $unwind: "$logs" },   
      {
        $group: {
          _id: "$user_id",
          totalCashIn: { $sum: "$logs.in" },
          totalCashOut: { $sum: "$logs.out" },
          balance: { $sum: { $subtract: ["$logs.in", "$logs.out"] } },
        },
      },
    ]);
    await User.findByIdAndUpdate(user_id, {
      cashIn: totals[0].totalCashIn,
      cashOut: totals[0].totalCashOut,
      balance: totals[0].balance
    })
    
    return res.json({
      data: true,
      details: await Details.find().sort({ position: 1 }),
      totals: await User.find().sort({position: 1}), 
    });
  } catch (err) {
    console.error(err);
    return res.json({ data: false, msg: "Something went wrong" });
  }
};
