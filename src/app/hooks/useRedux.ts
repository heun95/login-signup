import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'types';
import { AppDispatch } from 'types/AppDispatch';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
