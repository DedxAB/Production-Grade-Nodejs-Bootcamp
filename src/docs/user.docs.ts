export const userDocs = {
  '/users/all': {
    get: {
      tags: ['User'],
      summary: 'Get all users',
      description: 'Fetches all registered users',
      responses: {
        200: {
          description: 'List of users',
        },
      },
    },
  },
  '/users/me': {
    get: {
      tags: ['User'],
      summary: 'Get current user',
      description: 'Fetches the currently authenticated user',
      responses: {
        200: {
          description: 'Current user details',
        },
      },
    },
  },
};
