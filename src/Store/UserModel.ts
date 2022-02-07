import { Action, action} from "easy-peasy";
import { User } from 'firebase/auth';

export interface IUserModel {
    userInstance: User | null;
    setUserInstance: Action<IUserModel, User | null>;
}

export const UserModel: IUserModel = {
    userInstance: null,
    setUserInstance: action((state, payload) => {
        state.userInstance = payload;
    })
}
