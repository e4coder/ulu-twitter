import { IUserModel, UserModel } from './UserModel';

export interface IStoreModel {
    user: IUserModel;
}

export const StoreModel: IStoreModel = {
    user: UserModel,
};