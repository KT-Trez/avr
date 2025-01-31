import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton, Stack, Typography } from '@mui/material';
import { ContentContainer } from '../../components/ContentContainer.tsx';
import { PageContainer } from '../../components/PageContainer.tsx';
import { useDownloadsDirFetch } from './hooks/useDownloadsDirFetch.ts';

export const ExplorerPage = () => {
  const { dirContents, fetchDownloadsDir, isLoading } = useDownloadsDirFetch();

  return (
      <PageContainer
          HeaderElement={
            <>
              <Typography variant='h6'>Downloads</Typography>
              <Stack alignItems='center' direction='row' gap={1}>
                <IconButton onClick={window.electronAPI.openDownloadsDir}>
                  <FolderOpenIcon/>
                </IconButton>
                <IconButton onClick={fetchDownloadsDir}>
                  <RefreshIcon/>
                </IconButton>
              </Stack>
            </>
          }
          isLoading={isLoading}
          sx={{ justifyContent: 'space-between' }}
      >
        <ContentContainer hasContent={dirContents.length !== 0} message='No files'>
          {dirContents.map(file => (
              <Typography key={file.name}>{file.name}</Typography>
          ))}
        </ContentContainer>
      </PageContainer>
  );
};
