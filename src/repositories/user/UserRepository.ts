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

    public find(query, projection ?: any, options ?: any, skip?: any , limit?: any): any {
        console.log("inside user repo");
        const num = parseInt(skip);
        const num1 = parseInt(limit);
        console.log("parsed successfully");
        return super.find(query, projection, options).skip(num).limit(num1).sort({name : 1});
    }

    public findOne(query): mongoose.DocumentQuery<IUserMOdel, IUserMOdel, {}> {
        return super.findOne(query).lean();
    }

    public create(data: any): Promise<IUserMOdel> {
        console.log('UserRepository:: create', data);
        // const id = UserRepository.generateObjectId();
        // const model = new userModel ({
        //     _id: id,
        //     ...data,
        // });
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