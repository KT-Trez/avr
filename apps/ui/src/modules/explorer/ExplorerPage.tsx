import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { ContentContainer } from '../../components/ContentContainer.tsx';
import { PageContainer } from '../../components/PageContainer.tsx';
import { FileCard } from './components/FileCard.tsx';
import { useDownloadsDirFetch } from './hooks/useDownloadsDirFetch.ts';

export const ExplorerPage = () => {
  const { dirContents, fetchDownloadsDir, isLoading } = useDownloadsDirFetch();

  const handleOpen = useCallback(() => {}, []);

  const handleRemove = useCallback(() => {}, []);

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
        <ContentContainer hasContent={dirContents.length > 0} message='No files'>
          <Stack gap={1}>
            {dirContents.map(file => (
                <FileCard info={file} key={file.uid} onOpen={handleOpen} onRemove={handleRemove}/>
            ))}
          </Stack>
        </ContentContainer>
      </PageContainer>
  );
};
