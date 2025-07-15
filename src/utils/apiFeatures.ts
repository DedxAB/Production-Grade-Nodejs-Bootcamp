import { Query } from 'mongoose';

interface APIFeaturesOptions {
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
  keyword?: string;
}

export class APIFeatures<T> {
  query: Query<T[], T>;
  queryString: APIFeaturesOptions;

  constructor(query: Query<T[], T>, queryString: APIFeaturesOptions) {
    this.query = query;
    this.queryString = queryString;
  }

  search(...fields: string[]) {
    if (this.queryString.keyword) {
      const searchRegex = { $regex: this.queryString.keyword, $options: 'i' };
      const orConditions = fields.map((field) => ({ [field]: searchRegex }));
      this.query = this.query.find({ $or: orConditions });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.queryString } as any;
    ['page', 'sort', 'limit', 'fields', 'keyword'].forEach(
      (el) => delete queryObj[el]
    );
    this.query = this.query.find(queryObj);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page || 1;
    const limit = this.queryString.limit || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
