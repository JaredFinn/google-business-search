// netlify/functions/googleMapsProxy.js
const axios = require('axios');
const { Handler } = require('@netlify/functions');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const handler = async (event) => {
  const path = event.queryStringParameters.path;
  const params = { ...event.queryStringParameters, key: GOOGLE_MAPS_API_KEY };
  delete params.path; // Remove the path parameter from the query parameters

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/${path}/json`, {
      params,
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all domains
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};

module.exports = { handler };
