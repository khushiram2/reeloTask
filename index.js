import Customer from "./customerModel.js";
import connectDb from "./dbconnection.js";
await connectDb()
const Answer2 = async () => {
  const result = await Customer.aggregate([
    {
      $lookup: {
        from: "transaction",
        localField: "_id",
        foreignField: "customerId", 
        as: "transactions"
      }
    },
    {
      $unwind: "$transactions"
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        email: { $first: "$email" },
        phone: { $first: "$phone" },
        avgSpent: { $avg: "$transactions.amount" },
        totalvisit: { $sum: 1 },
        lastVist: { $max: "$transactions.createdAt" },
        totalSpent: { $sum: "$transactions.amount" } 
      }
    },
    {
      $match: { totalvisit: { $gt: 5 } } 
    },
    {
      $sort: { totalvisit: -1 } 
    },
    {
      $limit: 10
    },
    {
      $project: {
        _id: 0,
        customerId: "$_id",
        name: 1,
        email: 1,
        phone: 1,
        totalSpent: 1,
        totalvisit: 1,
        lastVist: 1,
        avgSpent: 1
      }
    }
  ]);

  return result;
};

