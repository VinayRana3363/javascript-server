import * as mongoose from 'mongoose';
import { Document, Query, DocumentQuery } from 'mongoose';
import * as bcrypt from 'bcrypt';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    protected static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    private model: M;

    constructor(model) {
        this.model = model;
        this.JSON = JSON;
    }

    protected create(data: any): Promise<D> {
        console.log('UserRepository:: create', data.password);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;
        console.log('hash', data.password);
        const id = VersionableRepository.generateObjectId();
        const model = new this.model ({
            _id: id,
            originalId: id,
            ...data,
        });
        return model.save();
    }

    protected count(query): Query<number> {
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.countDocuments(finalQuery);
    }

    protected getAll(query, projection, options): DocumentQuery<D[], D> {
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.find(finalQuery, projection, options);
    }

    protected find(query, projection, options): DocumentQuery<D[], D> {
        console.log('inside versionable repo');
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.find(finalQuery, projection, options);
    }

    protected findOne(query): DocumentQuery<D, D> {
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.findOne(finalQuery);
    }

    public async delete(id: string): Promise<D> {
        const previous = await this.findOne({ originalId: id, deletedAt: undefined });
        console.log('previous data', previous);
        if (previous) {
            await this.invalidate(id);
            return previous;
        }
    }

    protected invalidate(id: string): DocumentQuery<D, D> {
        const query: any = { originalId: id, deletedAt: { $exists: false } };
        const data: any = { deletedAt: Date.now() };
        return this.model.updateOne(query, data);
    }

    protected async update(data): Promise<D> {
        const prev = await this.findOne({originalId: data.originalId, deletedAt: undefined});
        console.log('prev values', prev);
        if (prev) {
            console.log('trying to call invalidate');
            await this.invalidate(data.originalId);
        }
        else {
            return undefined;
        }
        console.log('Data inside update', data);
        if (data.dataToUpdate.password !== undefined) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(data.dataToUpdate.password, salt);
            data.dataToUpdate.password = hash;
        }
        const dataToUpdate = {
            originalId: data.originalId,
            ...data.dataToUpdate
        };
        const newData = Object.assign(JSON.parse(JSON.stringify(prev)), dataToUpdate);
        console.log('new Data', newData);
        newData._id = VersionableRepository.generateObjectId();
        delete newData.deletedAt;
        const model = new this.model(newData);
        return model.save();
    }
}
