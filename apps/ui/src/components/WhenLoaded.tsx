import { CircularProgress } from '@mui/material';
import type { PropsWithChildren } from 'react';

export const WhenLoaded = ({ children, isLoading }: PropsWithChildren<{ isLoading: boolean }>) => {
  return isLoading ? <CircularProgress sx={{ display: 'block', m: 'auto', mt: 5 }}/> : children;
};
