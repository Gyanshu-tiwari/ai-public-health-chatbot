// Simple API key authentication middleware
// Protects sensitive health endpoints (records, telemedicine, insurance, etc.)

export const apiKeyAuth = (req, res, next) => {
  const configuredKey = process.env.GEMINI_API_KEY;

  if (!configuredKey) {
    return res.status(500).json({
      error: 'Server auth not configured. Please set API_KEY in environment.'
    });
  }

  const clientKey = req.header('x-api-key');

  if (!clientKey || clientKey !== configuredKey) {
    return res.status(401).json({
      error: 'Unauthorized. Missing or invalid API key.'
    });
  }

  return next();
};





