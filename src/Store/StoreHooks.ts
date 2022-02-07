import { createTypedHooks } from 'easy-peasy';
import { IStoreModel } from './StoreModel';

const typedHooks = createTypedHooks<IStoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
