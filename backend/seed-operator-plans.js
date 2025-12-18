require('dotenv').config();
const mongoose = require('mongoose');
const Plan = require('./models/Plan');

const operators = ['airtel', 'jio', 'vi', 'bsnl'];

const planTemplates = {
  topup: [
    { name: "Basic Topup", price: 10, validity: "No validity", data: "No data", description: "₹10 balance topup" },
    { name: "Quick Topup", price: 20, validity: "No validity", data: "No data", description: "₹20 balance topup" },
    { name: "Standard Topup", price: 50, validity: "No validity", data: "No data", description: "₹50 balance topup" },
    { name: "Premium Topup", price: 100, validity: "No validity", data: "No data", description: "₹100 balance topup" },
    { name: "Super Topup", price: 200, validity: "No validity", data: "No data", description: "₹200 balance topup" }
  ],
  data: [
    { name: "Daily Data", price: 19, validity: "1 day", data: "1GB", description: "1GB data for 1 day" },
    { name: "Weekly Data", price: 65, validity: "7 days", data: "6GB", description: "6GB data for 7 days" },
    { name: "Monthly Data", price: 199, validity: "28 days", data: "25GB", description: "25GB data for 28 days" },
    { name: "Unlimited Data", price: 399, validity: "28 days", data: "Unlimited", description: "Unlimited data" },
    { name: "Night Data", price: 29, validity: "30 days", data: "1GB", description: "1GB night data (12AM-6AM)" }
  ],
  prepaid: [
    { name: "Smart Plan", price: 149, validity: "28 days", data: "1GB/day", description: "Daily 1GB + unlimited calls" },
    { name: "Popular Plan", price: 199, validity: "28 days", data: "1.5GB/day", description: "Daily 1.5GB + unlimited calls" },
    { name: "Value Plan", price: 299, validity: "28 days", data: "2GB/day", description: "Daily 2GB + unlimited calls" },
    { name: "Premium Plan", price: 449, validity: "56 days", data: "2GB/day", description: "Daily 2GB + unlimited calls" },
    { name: "Long Term Plan", price: 719, validity: "84 days", data: "1.5GB/day", description: "Daily 1.5GB + unlimited calls" }
  ],
  postpaid: [
    { name: "Basic Postpaid", price: 399, validity: "30 days", data: "40GB", description: "40GB monthly + unlimited calls" },
    { name: "Standard Postpaid", price: 599, validity: "30 days", data: "75GB", description: "75GB monthly + unlimited calls" },
    { name: "Premium Postpaid", price: 999, validity: "30 days", data: "150GB", description: "150GB monthly + unlimited calls" },
    { name: "Family Postpaid", price: 1499, validity: "30 days", data: "200GB", description: "200GB shared + 4 connections" },
    { name: "Business Postpaid", price: 1999, validity: "30 days", data: "Unlimited", description: "Unlimited + business benefits" }
  ]
};

const operatorPricing = {
  airtel: { multiplier: 1.0, bonus: "Airtel Thanks benefits" },
  jio: { multiplier: 0.9, bonus: "JioTV & JioCinema" },
  vi: { multiplier: 1.1, bonus: "Vi Movies & TV" },
  bsnl: { multiplier: 0.8, bonus: "BSNL Tunes" }
};

async function seedOperatorPlans() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    await Plan.deleteMany({});
    console.log('🗑️ Cleared existing plans');

    const allPlans = [];

    for (const operator of operators) {
      for (const [planType, templates] of Object.entries(planTemplates)) {
        for (const template of templates) {
          const operatorConfig = operatorPricing[operator];
          const adjustedPrice = Math.round(template.price * operatorConfig.multiplier);
          
          const plan = {
            name: `${template.name} - ${operator.toUpperCase()}`,
            type: planType,
            price: adjustedPrice,
            validity: template.validity,
            data: template.data,
            description: template.description,
            operator: operator,
            features: [
              template.description,
              operatorConfig.bonus,
              planType === 'topup' ? 'Balance topup' : 'Full benefits'
            ]
          };
          
          allPlans.push(plan);
        }
      }
    }

    const insertedPlans = await Plan.insertMany(allPlans);
    console.log(`✅ Successfully added ${insertedPlans.length} plans`);

    // Group by operator and type
    const plansByOperator = insertedPlans.reduce((acc, plan) => {
      if (!acc[plan.operator]) acc[plan.operator] = {};
      if (!acc[plan.operator][plan.type]) acc[plan.operator][plan.type] = [];
      acc[plan.operator][plan.type].push(plan);
      return acc;
    }, {});

    Object.keys(plansByOperator).forEach(operator => {
      console.log(`\n📱 ${operator.toUpperCase()} PLANS:`);
      Object.keys(plansByOperator[operator]).forEach(type => {
        console.log(`  ${type}: ${plansByOperator[operator][type].length} plans`);
      });
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding plans:', error.message);
    process.exit(1);
  }
}

seedOperatorPlans();