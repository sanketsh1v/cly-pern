const request = require('supertest');
const app = require('./server'); // Import your Express app

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve('hashedPassword')),
  compare: jest.fn(() => Promise.resolve(true)),
}));

describe('API Endpoints', () => {
  it('should return a 200 status and a message from /api/example', async () => {
    const response = await request(app).get('/api/example');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello, World!');
  });

  // Add more tests as needed
});
