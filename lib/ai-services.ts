// AI Services Integration - 10 Features
import { GoogleGenerativeAI } from '@google/generative-ai';

// Feature 1: Lead Scoring with AI
export async function scoreLeadWithAI(leadData: any) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Score this lead from 0-100 based on probability of conversion:
  Name: ${leadData.name}
  Budget: ${leadData.budget}
  Source: ${leadData.source}
  Previous Bookings: ${leadData.previousBookings}
  Travel Type: ${leadData.travelType}
  
  Return ONLY a number between 0-100.`;
  
  const result = await model.generateContent(prompt);
  const score = parseInt(result.response.text());
  return Math.max(0, Math.min(100, score));
}

// Feature 2: Automated Invoice Generation from Booking
export async function generateInvoiceAI(bookingData: any) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Generate invoice details for this booking:
  Customer: ${bookingData.customerName}
  Services: ${bookingData.services}
  Total Cost: ${bookingData.totalCost}
  GST (17%): ${(bookingData.totalCost * 0.17).toFixed(2)}
  
  Generate a professional invoice description.`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// Feature 3: Smart Booking Recommendations
export async function getBookingRecommendations(customerHistory: any) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Based on this customer travel history, recommend 3 tour packages:
  Previous Destinations: ${customerHistory.previousDestinations?.join(', ')}
  Budget Range: ${customerHistory.budgetMin}-${customerHistory.budgetMax}
  Travel Style: ${customerHistory.travelStyle}
  
  Return JSON array with recommendations.`;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}

// Feature 4: Dynamic Pricing Based on Demand
export async function calculateDynamicPrice(tourData: any) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Calculate dynamic price for this tour:
  Base Price: ${tourData.basePrice}
  Current Bookings: ${tourData.currentBookings}
  Available Spots: ${tourData.availableSpots}
  Demand Level: ${tourData.demandLevel}
  Season: ${tourData.season}
  
  Return only the suggested price as a number.`;
  
  const result = await model.generateContent(prompt);
  return parseFloat(result.response.text());
}

// Feature 5: Visa Document Requirement Analysis
export async function analyzeVisaRequirements(visaData: any) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `List all required documents for ${visaData.visaType} visa to ${visaData.destination}:
  Nationality: ${visaData.nationality}
  Purpose: ${visaData.purpose}
  Stay Duration: ${visaData.duration}
  
  Return as JSON array with document names and descriptions.`;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}

// Feature 6: Itinerary Optimization
export async function optimizeItinerary(itineraryData: any) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Optimize this itinerary for ${itineraryData.duration} days:
  Destination: ${itineraryData.destination}
  Activities: ${itineraryData.activities?.join(', ')}
  Budget: ${itineraryData.budget}
  Travel Style: ${itineraryData.travelStyle}
  
  Return optimized day-by-day itinerary as JSON.`;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}

// Feature 7: Smart Notifications & Alerts
export async function generateNotificationContent(eventData: any) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Generate a professional notification for this event:
  Event: ${eventData.eventType}
  Customer: ${eventData.customerName}
  Details: ${eventData.details}
  
  Keep it concise and actionable (under 100 chars).`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// Feature 8: Expense Categorization & Analysis
export async function categorizeExpense(expense: any) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Categorize and analyze this expense:
  Description: ${expense.description}
  Amount: ${expense.amount}
  Date: ${expense.date}
  
  Return category and if it seems abnormal for a travel business.`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// Feature 9: Customer Support AI Chatbot
export async function generateAIResponse(query: string, context: any) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `You are a travel ERP customer support assistant for ${context.companyName}.
  Customer Question: ${query}
  Company Info: ${JSON.stringify(context.companyInfo)}
  
  Provide a helpful, professional response.`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// Feature 10: Revenue Forecasting
export async function forecastRevenue(businessData: any) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Forecast next 3 months revenue based on:
  Current Month Revenue: ${businessData.currentRevenue}
  Growth Rate: ${businessData.growthRate}%
  Seasonal Factors: ${businessData.seasonalFactors}
  Upcoming Promotions: ${businessData.promotions}
  
  Return forecast as JSON with monthly breakdown.`;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}
