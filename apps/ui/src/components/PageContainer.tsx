import { Box, CircularProgress, Divider, Stack, type SxProps, type Theme } from '@mui/material';
import type { ReactElement, ReactNode } from 'react';

type PageContainerProps = {
  HeaderElement?: ReactElement;
  children: ReactNode;
  isLoading?: boolean;
  sx?: SxProps<Theme>;
};

export const PageContainer = ({ HeaderElement, children, isLoading, sx }: PageContainerProps) => {
  return (
      <Box paddingInline={4}>
        {HeaderElement && (
            <Stack alignItems='center' direction='row' gap={1} paddingBlock={2} sx={sx}>
              {HeaderElement}
            </Stack>
        )}

        {!!HeaderElement && <Divider/>}

        {isLoading ? <CircularProgress sx={{ display: 'block', m: 'auto', mt: 5 }}/> : children}
      </Box>
  );
};
