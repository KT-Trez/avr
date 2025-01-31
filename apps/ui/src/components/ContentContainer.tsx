import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type ContentContainerProps = {
  children: ReactNode;
  hasContent: boolean;
  message?: string;
};

export const ContentContainer = ({ children, hasContent, message = 'N / A' }: ContentContainerProps) => {
  if (hasContent) {
    return <Box paddingBlock={2}>{children}</Box>;
  }

  return (
      <Typography color='text.secondary' mt={4} sx={{ userSelect: 'none' }} textAlign='center' variant='body2'>
        {message}
      </Typography>
  );
};
