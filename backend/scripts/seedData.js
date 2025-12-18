require('dotenv').config();
const mongoose = require('mongoose');
const Plan = require('../models/Plan');

const samplePlans = [
  {
    name: 'Basic Prepaid',
    type: 'prepaid',
    price: 99,
    validity: '14 days',
    data: '1GB/day',
    description: '50 SMS/day, Unlimited calls',
    operator: 'Airtel'
  },
  {
    name: 'Standard Prepaid',
    type: 'prepaid',
    price: 199,
    validity: '28 days',
    data: '1.5GB/day',
    description: '100 SMS/day, Unlimited calls',
    operator: 'Jio'
  },
  {
    name: 'Premium Prepaid',
    type: 'prepaid',
    price: 299,
    validity: '56 days',
    data: '2GB/day',
    description: 'Unlimited calls and SMS',
    operator: 'Vi'
  },
  {
    name: 'Super Prepaid',
    type: 'prepaid',
    price: 399,
    validity: '84 days',
    data: '2.5GB/day',
    description: 'Unlimited calls + SMS + Disney+ Hotstar',
    operator: 'Airtel'
  },
  {
    name: 'Annual Prepaid',
    type: 'prepaid',
    price: 599,
    validity: '365 days',
    data: '1.5GB/day',
    description: 'Annual plan with unlimited benefits',
    operator: 'Jio'
  },
  {
    name: 'Basic Postpaid',
    type: 'postpaid',
    price: 499,
    validity: '30 days',
    data: '25GB',
    description: 'Unlimited calls + SMS + Netflix Basic',
    operator: 'Vi'
  },
  {
    name: 'Premium Postpaid',
    type: 'postpaid',
    price: 699,
    validity: '30 days',
    data: '50GB',
    description: 'Premium benefits + Amazon Prime',
    operator: 'Airtel'
  },
  {
    name: 'Enterprise Postpaid',
    type: 'postpaid',
    price: 999,
    validity: '30 days',
    data: '100GB',
    description: 'Enterprise plan with all OTT platforms',
    operator: 'Jio'
  },
  {
    name: '1GB Data Pack',
    type: 'data',
    price: 19,
    validity: '1 day',
    data: '1GB',
    description: 'High-speed data for 1 day',
    operator: 'Airtel'
  },
  {
    name: '5GB Data Pack',
    type: 'data',
    price: 75,
    validity: '7 days',
    data: '5GB',
    description: 'High-speed data for 7 days',
    operator: 'Jio'
  },
  {
    name: '10GB Data Pack',
    type: 'data',
    price: 149,
    validity: '30 days',
    data: '10GB',
    description: 'High-speed data for 30 days',
    operator: 'Vi'
  },
  {
    name: 'Talktime ₹10',
    type: 'topup',
    price: 10,
    validity: '0 days',
    data: 'No data',
    description: 'Main balance topup',
    operator: 'Airtel'
  },
  {
    name: 'Talktime ₹50',
    type: 'topup',
    price: 50,
    validity: '0 days',
    data: 'No data',
    description: 'Main balance topup',
    operator: 'Jio'
  },
  {
    name: 'Talktime ₹100',
    type: 'topup',
    price: 100,
    validity: '0 days',
    data: 'No data',
    description: 'Main balance topup',
    operator: 'Vi'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Clearing existing plans...');
    await Plan.deleteMany({});
    
    console.log('Inserting sample plans...');
    const insertedPlans = await Plan.insertMany(samplePlans);
    
    console.log(`Successfully seeded ${insertedPlans.length} plans to the database`);
    console.log('Database seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();