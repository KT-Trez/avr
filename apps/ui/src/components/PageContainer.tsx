import { Box, CircularProgress, Divider } from '@mui/material';
import type { ReactElement, ReactNode } from 'react';

type PageContainerProps = {
  HeaderElement?: ReactElement;
  children: ReactNode;
  isLoading?: boolean;
};

export const PageContainer = ({ HeaderElement, children, isLoading }: PageContainerProps) => {
  return (
      <Box paddingInline={4}>
        {HeaderElement}

        {!!HeaderElement && <Divider/>}

        {isLoading ? <CircularProgress sx={{ display: 'block', m: 'auto', mt: 5 }}/> : children}
      </Box>
  );
};
