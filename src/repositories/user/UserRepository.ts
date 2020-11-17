import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserMOdel from './IUserModel';

import VersionableRepository from '../versionable/VersionableRepository';

export default class UserRepository extends VersionableRepository<IUserMOdel, mongoose.Model<IUserMOdel>> {
    constructor() {
        super(userModel);
    }
    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    public find(query, projection ?: any, options ?: any): any {
        return super.find(query, projection, options);
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