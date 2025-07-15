import { authDocs } from './auth.docs';
import { userDocs } from './user.docs';

export const openApiDocs = {
  ...userDocs,
  ...authDocs,
};
