import { UserDocument } from '../../models/user.model';

declare module 'express' {
  interface Request {
    user?: UserDocument;
  }
}
