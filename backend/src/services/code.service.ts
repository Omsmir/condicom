import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { CodeDocument, CodeInput, CodeModel } from '../models/code.model';

class CodeService {
    constructor(private codeModel = CodeModel) {}

    public createCode = async (input: CodeInput) => {
        return await this.codeModel.create(input);
    };
    public findCode = async (query: FilterQuery<CodeDocument>) => {
        return await this.codeModel.findOne(query);
    };

    public getCodes = async (query: FilterQuery<CodeDocument>, limit: number, cursor?: string) => {
        if (cursor) {
            query._id = { $lt: cursor };
        }
        const codes = await this.codeModel
            .find(query)
            .sort({ _id: -1 })
            .limit(4 + 1);

        let nextCursor: string | null = null;
        if (codes.length > +limit) {
            nextCursor = codes[limit - 1]._id as string; // Use the last item's _id as the nextCursor
            codes.pop();
        }

        return { codes, nextCursor };
    };

    public updateCode = async (
        query: FilterQuery<CodeDocument>,
        update: UpdateQuery<CodeDocument>,
        options?: QueryOptions
    ) => {
        return await this.codeModel.findOneAndUpdate(query, update, options);
    };
    

    public deleteCode = async (query: FilterQuery<CodeDocument>) => {
        return await this.codeModel.deleteOne(query);
    };
    
}

export default CodeService