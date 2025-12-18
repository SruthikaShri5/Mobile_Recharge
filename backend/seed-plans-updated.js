require('dotenv').config();
const mongoose = require('mongoose');
const Plan = require('./models/Plan');

const plans = [
  // Topup Plans (5 plans)
  {
    name: "Basic Topup",
    type: "topup",
    price: 10,
    validity: "No validity",
    data: "No data",
    description: "₹10 balance topup",
    features: ["₹10 talktime", "No validity extension"]
  },
  {
    name: "Quick Topup",
    type: "topup", 
    price: 20,
    validity: "No validity",
    data: "No data",
    description: "₹20 balance topup",
    features: ["₹20 talktime", "No validity extension"]
  },
  {
    name: "Standard Topup",
    type: "topup",
    price: 50,
    validity: "No validity", 
    data: "No data",
    description: "₹50 balance topup",
    features: ["₹50 talktime", "No validity extension"]
  },
  {
    name: "Premium Topup",
    type: "topup",
    price: 100,
    validity: "No validity",
    data: "No data", 
    description: "₹100 balance topup",
    features: ["₹100 talktime", "No validity extension"]
  },
  {
    name: "Super Topup",
    type: "topup",
    price: 200,
    validity: "No validity",
    data: "No data", 
    description: "₹200 balance topup",
    features: ["₹200 talktime", "No validity extension"]
  },

  // Data Plans (6 plans)
  {
    name: "Daily Data Pack",
    type: "data",
    price: 19,
    validity: "1 day",
    data: "1GB",
    description: "1GB data for 1 day",
    features: ["1GB high-speed data", "Valid for 24 hours", "No calling benefits"]
  },
  {
    name: "Weekly Data Pack", 
    type: "data",
    price: 65,
    validity: "7 days",
    data: "6GB",
    description: "6GB data for 7 days",
    features: ["6GB high-speed data", "Valid for 7 days", "No calling benefits"]
  },
  {
    name: "Monthly Data Pack",
    type: "data", 
    price: 199,
    validity: "28 days",
    data: "25GB",
    description: "25GB data for 28 days",
    features: ["25GB high-speed data", "Valid for 28 days", "No calling benefits"]
  },
  {
    name: "Unlimited Data Pack",
    type: "data",
    price: 399,
    validity: "28 days", 
    data: "Unlimited",
    description: "Unlimited data for 28 days",
    features: ["Unlimited high-speed data", "Valid for 28 days", "Fair usage policy applies"]
  },
  {
    name: "Night Pack",
    type: "data",
    price: 29,
    validity: "30 days",
    data: "1GB",
    description: "1GB night data (12AM-6AM)",
    features: ["1GB data for night hours", "Valid 12AM to 6AM only", "30 days validity"]
  },
  {
    name: "Weekend Pack",
    type: "data", 
    price: 49,
    validity: "4 weekends",
    data: "4GB",
    description: "4GB weekend data pack",
    features: ["4GB data for weekends", "Valid on Saturdays & Sundays", "4 weekends validity"]
  },

  // Prepaid Plans (5 plans)
  {
    name: "Smart Prepaid",
    type: "prepaid",
    price: 149,
    validity: "28 days",
    data: "1GB/day",
    description: "Daily 1GB data + unlimited calling",
    features: ["1GB data per day", "Unlimited voice calls", "100 SMS/day", "28 days validity"]
  },
  {
    name: "Popular Prepaid",
    type: "prepaid", 
    price: 199,
    validity: "28 days",
    data: "1.5GB/day",
    description: "Daily 1.5GB data + unlimited calling",
    features: ["1.5GB data per day", "Unlimited voice calls", "100 SMS/day", "28 days validity"]
  },
  {
    name: "Value Prepaid",
    type: "prepaid",
    price: 299,
    validity: "28 days",
    data: "2GB/day", 
    description: "Daily 2GB data + unlimited calling",
    features: ["2GB data per day", "Unlimited voice calls", "100 SMS/day", "28 days validity"]
  },
  {
    name: "Premium Prepaid",
    type: "prepaid",
    price: 449,
    validity: "56 days",
    data: "2GB/day",
    description: "Daily 2GB data + unlimited calling for 56 days",
    features: ["2GB data per day", "Unlimited voice calls", "100 SMS/day", "56 days validity"]
  },
  {
    name: "Long Term Prepaid",
    type: "prepaid",
    price: 719,
    validity: "84 days", 
    data: "1.5GB/day",
    description: "Daily 1.5GB data + unlimited calling for 84 days",
    features: ["1.5GB data per day", "Unlimited voice calls", "100 SMS/day", "84 days validity"]
  },

  // Postpaid Plans (5 plans)
  {
    name: "Basic Postpaid",
    type: "postpaid",
    price: 399,
    validity: "30 days",
    data: "40GB",
    description: "40GB monthly data + unlimited calling",
    features: ["40GB monthly data", "Unlimited voice calls", "100 SMS/day", "Bill payment"]
  },
  {
    name: "Standard Postpaid",
    type: "postpaid",
    price: 599,
    validity: "30 days",
    data: "75GB",
    description: "75GB monthly data + unlimited calling",
    features: ["75GB monthly data", "Unlimited voice calls", "100 SMS/day", "Netflix included"]
  },
  {
    name: "Premium Postpaid",
    type: "postpaid",
    price: 999,
    validity: "30 days",
    data: "150GB",
    description: "150GB monthly data + unlimited calling",
    features: ["150GB monthly data", "Unlimited voice calls", "100 SMS/day", "Amazon Prime included"]
  },
  {
    name: "Family Postpaid",
    type: "postpaid",
    price: 1499,
    validity: "30 days",
    data: "200GB",
    description: "200GB shared data + 4 connections",
    features: ["200GB shared data", "4 connections", "Unlimited voice calls", "Disney+ Hotstar included"]
  },
  {
    name: "Business Postpaid",
    type: "postpaid",
    price: 1999,
    validity: "30 days",
    data: "Unlimited",
    description: "Unlimited data + business benefits",
    features: ["Unlimited data", "Priority network", "Business support", "All OTT platforms"]
  }
];

async function seedPlans() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Clear existing plans
    await Plan.deleteMany({});
    console.log('🗑️ Cleared existing plans');

    // Insert new plans
    const insertedPlans = await Plan.insertMany(plans);
    console.log(`✅ Successfully added ${insertedPlans.length} plans:`);
    
    // Group by type for display
    const plansByType = insertedPlans.reduce((acc, plan) => {
      if (!acc[plan.type]) acc[plan.type] = [];
      acc[plan.type].push(plan);
      return acc;
    }, {});

    Object.keys(plansByType).forEach(type => {
      console.log(`\n📱 ${type.toUpperCase()} PLANS (${plansByType[type].length}):`);
      plansByType[type].forEach(plan => {
        console.log(`  • ${plan.name} - ₹${plan.price} (${plan.validity})`);
      });
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding plans:', error.message);
    process.exit(1);
  }
}

seedPlans();