import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserMOdel from './IUserModel';

import VersionableRepository from '../versionable/VersionableRepository';
import { parse } from 'dotenv/types';

export default class UserRepository extends VersionableRepository<IUserMOdel, mongoose.Model<IUserMOdel>> {
    constructor() {
        super(userModel);
    }
    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    public find(query, projection ?: any, options ?: any, skip?: any , limit?: any, type?: any): any {
        console.log('inside user repo');
        return super.find(query, projection, options);
    }

    public findOne(query): mongoose.DocumentQuery<IUserMOdel, IUserMOdel, {}> {
        return super.findOne(query).lean();
    }

    public create(data: any): Promise<IUserMOdel> {
        console.log('UserRepository:: create', data);
        return super.create(data);
    }

    public count(query) {
        return super.count(query);
    }

    public update(data: any): Promise<IUserMOdel> {
        console.log('UserRepository:: update', data);
        return super.update(data);
    }
}