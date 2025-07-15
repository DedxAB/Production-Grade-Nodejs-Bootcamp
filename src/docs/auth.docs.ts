export const authDocs = {
  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'User Login',
      description: 'Authenticates a user and returns a JWT token',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string' },
              },
              required: ['email', 'password'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: { type: 'string' },
                },
              },
            },
          },
        },
        401: {
          description: 'Invalid credentials',
        },
      },
    },
  },
  '/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'User Registration',
      description: 'Registers a new user and returns a JWT token',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                password: { type: 'string' },
              },
              required: ['name', 'email', 'password'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Registration successful',
          content: {
            'application/json': {},
          },
        },
        400: {
          description: 'Invalid input data',
        },
      },
    },
  },
};
