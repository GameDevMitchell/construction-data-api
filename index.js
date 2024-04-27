const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000; // Define PORT here

// Sample data for building materials and prices
const materials = [
  { name: 'cement', price: 50 },
  { name: 'bricks', price: 10 },
  { name: 'concrete Blocks', price: 15 },
  { name: "steel", "price": 100},
  { name : "wood", "price": 30},
  { name: "doors", "price": 150},
  { name: "windows", "price": 200}, 
  { name: "nails", "price": 5},
  { name: "screws", "price": 2},
  { name: "plumbing pipes", "price": 70},
  { name: "electrical Wiring", "price": 60},
  { name: "tiles", "price": 20},
  { name: "insulation", "price": 25},
  { name: "sand", "price": 20},
  { name: "granite", "price": 40},
  { name: "steel Bars", "price": 120},
  { name: "paint", "price": 40},
  { name: "glass", "price": 100},
  { name: "gypsum Board", "price": 15},
  { name: "fittings", "price": 30},
  { name: "tar", "price": 25},
  { name: "waterproofing membrane", "price": 35},
  { name: "concrete mix", "price": 60},
  { name: "brick mortar", "price": 25},
  { name: "gravel", "price": 25},
  { name: "steel Mesh", "price": 80},
  { name: "asphalt", "price": 70},
  { name: "plywood", "price": 35},
  { name: "scaffolding", "price": 200},
  { name: "lumber", "price": 40},
  { name: "gutters", "price": 30},
  { name: "drainage pipes", "price": 60},
  { name: "fiber cement board", "price": 45},
  { name: "mortar mix", "price": 30},
  { name: "roofing Sheets", "price": 80},
  // Rest of the materials...
];

// Sample data for building types, construction estimates, and required tools with their estimated prices
const buildings = [
    {
    type: 'F1 racetrack',
    estimate: 50000000,
    tools: [
      { name: 'crash barriers', price: 10000 },
      { name: 'timing system', price: 5000 },
      { name: "grandstand seating", "price": 1000},
      { name: "drill", "price": 50},
      { name: "paint sprayer", "price": 150},
      { name: "concrete blocks", "price": 15},
      { name: "steel", "price": 100},
      { name: "wood", "price": 30},
      // Rest of the tools...
    ],
  },
  // Rest of the buildings...
  {
    type: "bungalow",
    estimate: 100000,
    tools: [
        {name: "concrete mixer", "price": 500},
        {name: "cement trowel", "price": 20},
        {name: "brick hammer", "price": 30},
        {name: "drill", "price": 50},
        {name: "paint sprayer", "price": 150},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80},
    ]
  },
  {
    type: "skyscraper",
    estimate: 10000000,
    tools: [
        {name: "cranes", "price": 50000},
        {name: "concrete Pump", "price": 20000},
        {name: "steel cutter", "price": 1000},
        {name: "welding machine", "price": 200},
        {name: "scaffolding", "price": 200},
        {name: "excavator", "price": 10000},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80},
    ]
  },
  {
    type: "apartment building",
    estimate: 5000000,
    tools: [
        {name: "concrete mixer", "price": 500},
        {name: "brick saw", "price": 100},
        {name: "nail gun", "price": 200},
        {name: "paint sprayer", "price": 150},
        {name: "scaffolding", "price": 200},
        {name: "excavator", "price": 10000},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80}
    ]
  },
  {
    type: "office building",
    estimate: 2000000,
    tools: [
        {name: "cranes", "price": 50000},
        {name: "concrete mixer", "price": 500},
        {name: "steel cutter", "price": 1000},
        {name: "drill", "price": 50},
        {name: "paint sprayer", "price": 150},
        {name: "scaffolding", "price": 200},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80},
    ]
  },
  {
    type: "townhouse",
    estimate: 300000,
    tools: [
        {name: "concrete mixer", "price": 500},
        {name: "brick saw", "price": 100},
        {name: "nail gun", "price": 200},
        {name: "paint sprayer", "price": 150},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80},
    ]
  },
  {
    type: "warehouse",
    estimate: 1500000,
    tools: [
        {name: "forklift", "price": 5000},
        {name: "pallet jack", "price": 200},
        {name: "steel cutter", "price": 1000},
        {name: "drill", "price": 50},
        {name: "scaffolding", "price": 200},
        {name: "excavator", "price": 10000},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80},
    ]
},
{
    type: "retail store",
    estimate: 500000,
    tools: [
        {name: "cash Register", "price": 1000},
        {name: "shelving units", "price": 500},
        {name: "display cases", "price": 200},
        {name: "drill", "price": 50},
        {name: "paint sprayer", "price": 150},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80},
    ]
},
{
    type: "school building",
    estimate: 1000000,
    tools: [
        {name: "whiteboard", "price": 200},
        {name: "desks", "price": 100},
        {name: "projector", "price": 500},
        {name: "drill", "price": 50},
        {name: "paint sprayer", "price": 150},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80}
    ]
},
{
    type: "hospital",
    estimate: 5000000,
    tools: [
        {name: "MRI machine", "price": 200000},
        {name: "operating table", "price": 10000},
        {name: "defibrillator", "price": 1000},
        {name: "drill", "price": 50},
        {name: "paint sprayer", "price": 150},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80},
    ]
},
{
    type: "hotel",
    estimate: 3000000,
    tools: [
        {name: "beds", "price": 500},
        {name: "linens", "price": 50},
        {name: "reception Desk", "price": 2000},
        {name: "drill", "price": 50},
        {name: "paint sprayer", "price": 150},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80},
    ]
  },
  {
    type: "university",
    estimate: 10000000,
    tools: [
        {name: "library shelves", "price": 1000},
        {name: "lab equipment", "price": 5000},
        {name: "lecture hall seating", "price": 200},
        {name: "drill", "price": 50},
        {name: "paint sprayer", "price": 150},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80},
    ]
  },
  {
    type: "2 story building",
    estimate: 500000,
    tools: [
        {name: "concrete mixer", "price": 500},
        {name: "brick saw", "price": 100},
        {name: "nail gun", "price": 200},
        {name: "paint sprayer", "price": 150},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80},
    ]
  },
  {
    type: "3 story building",
    estimate: 700000,
    tools: [
        {name: "concrete mixer", "price": 500},
        {name: "brick saw", "price": 100},
        {name: "nail gun", "price": 200},
        {name: "paint sprayer", "price": 150},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80},
    ]
  },
  {
    type: "4 story building",
    estimate: 900000,
    tools: [
        {name: "concrete mixer", "price": 500},
        {name: "brick saw", "price": 100},
        {name: "nail gun", "price": 200},
        {name: "paint sprayer", "price": 150},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80},
    ]
  },
  {
    type: "museum",
    estimate: 2000000,
    tools: [
        {name: "display cases", "price": 200},
        {name: "art lighting", "price": 100},
        {name: "security cameras", "price": 500},
        {name: "drill", "price": 50},
        {name: "paint sprayer", "price": 150},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
        {name: "roofing Sheets", "price": 80},
    ]
  },
  {
    type: "F1 racetrack",
    estimate: 50000000,
    tools: [
        {name: "crash barriers", "price": 10000},
        {name: "timing system", "price": 5000},
        {name: "grandstand seating", "price": 1000},
        {name: "drill", "price": 50},
        {name: "paint sprayer", "price": 150},
        {name: "concrete blocks", "price": 15},
        {name: "steel", "price": 100},
        {name: "wood", "price": 30},
    ]
  }
];

// Endpoint to get all materials and prices
app.get('/materials', (req, res) => {
  res.json(materials);
});

// Endpoint to get price of a specific material
app.get('/materials/:type', (req, res) => {
    const { type } = req.params;
    const building = buildings.find(building => building.type.toLowerCase() === type.toLowerCase());
    if (building) {
        res.json(building.tools);
    } else {
        res.status(404).json({ message: 'Building not found' });
    }
});


// Endpoint to get all buildings and their construction estimates
app.get('/buildings', (req, res) => {
  res.json(buildings);
});

// Endpoint to get construction estimate and required tools of a specific building type
app.get('/buildings/:buildingType', (req, res) => {
    const buildingType = req.params.buildingType.toLowerCase();
    const building = buildings.find(bldg => bldg.type.toLowerCase() === buildingType);
    
    if (building) {
      // Calculate total cost estimate
      const totalCost = building.estimate;
      
      // Extract tool prices
      const toolPrices = building.tools.reduce((acc, tool) => {
        acc[tool.name] = tool.price;
        return acc;
      }, {});
      
      // Format the response
      const formattedResponse = {
        building_type: buildingType,
        total_cost_estimate: totalCost,
        ...toolPrices
      };
      
      res.json(formattedResponse);
    } else {
      res.status(404).json({ message: 'Building not found' });
    }
  });
  

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });