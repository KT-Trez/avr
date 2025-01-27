import { Box, Divider, Stack } from '@mui/material';

interface TitleBarProps {
  children: JSX.Element | JSX.Element[];
}

function TitleBar({ children }: TitleBarProps) {
  return (
      <Box>
        <Stack alignItems={'center'} direction={'row'} sx={{ height: 64, p: 1, pt: 2 }}>
          {children}
        </Stack>
        <Divider/>
      </Box>
  );
}

export default TitleBar;
