const request = require('supertest');
const app = require('./server'); // Import the app

describe('API Endpoints', () => {
    afterAll(() => {
        // Close database connections or other resources here if applicable
      });
    
  it('should return a 200 status and a message from /api/example', async () => {
    const response = await request(app).get('/api/example'); // Make sure this route exists in your server
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello, World!'); // Adjust this based on your actual API response
  });

  // Add more tests for different routes as needed
});
