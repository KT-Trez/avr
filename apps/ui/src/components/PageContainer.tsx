import { Box, Divider, Stack, type SxProps, type Theme } from '@mui/material';
import type { ReactElement, ReactNode } from 'react';
import { WhenLoaded } from './WhenLoaded.tsx';

type PageContainerProps = {
  FooterElement?: ReactElement;
  HeaderElement?: ReactElement;
  children: ReactNode;
  isLoading?: boolean;
  sx?: SxProps<Theme>;
};

export const PageContainer = ({ FooterElement, HeaderElement, children, isLoading, sx }: PageContainerProps) => (
    <>
      <Box paddingInline={4}>
        {HeaderElement && (
            <Stack alignItems='center' direction='row' gap={1} paddingBlock={2} sx={sx}>
              {HeaderElement}
            </Stack>
        )}

        {!!HeaderElement && <Divider/>}

        <WhenLoaded isLoading={!!isLoading}>{children}</WhenLoaded>
      </Box>

      {!isLoading && FooterElement}
    </>
);
