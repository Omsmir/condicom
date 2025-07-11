import { FilterQuery, QueryOptions, SchemaTypeOptions, UpdateQuery } from 'mongoose';
import UserModel, { UserDocument, UserInput } from '../models/user.model';
import { omit } from 'lodash';

class UserService {
    constructor(private userModel = UserModel) {}

    public createUser = async (input: UserInput) => {
        const user = await this.userModel.create(input);

        return omit(user.toJSON(), 'password');
    };

    public updateUser = async (
        query: FilterQuery<UserDocument>,
        update: UpdateQuery<UserDocument>,
        options?: QueryOptions
    ) => {
        return await this.userModel.findOneAndUpdate(query, update, options);
    };

    public findUser = async (query: FilterQuery<UserDocument>) => {
        return await this.userModel.findOne(query).lean();
    };
    public getAllUsers = async (query?: FilterQuery<UserDocument>) => {
        return await this.userModel.find(query ? query : {});
    };
    public deleteUser = async (query: FilterQuery<UserDocument>) => {
        return await this.userModel.findOneAndDelete(query);
    };

    public validatePassword = async ({ email, password }: { email: string; password: string }) => {
        try {
            const user = await this.userModel.findOne({ email });

            if (!user) {
                return false;
            }
            const isValid = await user.comparePassword(password);

            if (!isValid) {
                return false;
            }

            return omit(user.toJSON(), 'password');
        } catch (error: any) {
            throw new Error(`validate service error ${error.message}`);
        }
    };
}

export default UserService;
