require('dotenv').config();
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');

const removeDuplicates = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const duplicates = await Transaction.aggregate([
      {
        $group: {
          _id: {
            mobile: "$mobile",
            operator: "$operator",
            amount: "$amount",
            planName: "$planName"
          },
          ids: { $push: "$_id" },
          count: { $sum: 1 }
        }
      },
      {
        $match: { count: { $gt: 1 } }
      }
    ]);

    for (let duplicate of duplicates) {
      const idsToRemove = duplicate.ids.slice(1);
      await Transaction.deleteMany({ _id: { $in: idsToRemove } });
      console.log(`Removed ${idsToRemove.length} duplicates`);
    }
    
    console.log('Duplicate removal completed');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

removeDuplicates();