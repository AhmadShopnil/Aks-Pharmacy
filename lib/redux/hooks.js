import { useDispatch, useSelector } from 'react-redux';

/**
 * Custom Redux hooks for use throughout the application
 * These provide better type safety and consistency
 */

// Use throughout your app instead of plain `useDispatch`
export const useAppDispatch = () => useDispatch();

// Use throughout your app instead of plain `useSelector`
export const useAppSelector = useSelector;
