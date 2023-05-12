import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux';
import type { RootState, Dispatch } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => Dispatch;
export const useCustomDispatch: DispatchFunc = useDispatch;
export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;
