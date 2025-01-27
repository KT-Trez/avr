import { type SxProps, type Theme, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type ContentContainerProps = {
  children: ReactNode;
  hasContent: boolean;
  message?: string;
  sx?: SxProps<Theme>;
};

export const ContentContainer = ({ children, hasContent, message = 'N / A', sx }: ContentContainerProps) => {
  if (hasContent) {
    return children;
  }

  return (
      <Typography sx={{ color: 'text.secondary', mt: 4, userSelect: 'none', ...sx }} variant='body2'>
        {message}
      </Typography>
  );
};
