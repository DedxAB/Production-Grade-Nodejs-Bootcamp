import { authDocs } from './auth.docs.js';
import { userDocs } from './user.docs.js';

export const openApiDocs = {
  ...userDocs,
  ...authDocs,
};
