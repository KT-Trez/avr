import { Alert, AlertTitle, Box, Button, Collapse, Paper, Stack } from '@mui/material';
import { useMemo, useState } from 'react';
import { type Location, useLocation } from 'react-router-dom';
import type { MediaFormat } from 'types/src/media.ts';
import { PageContainer } from '../../components/PageContainer.tsx';
import { MediaFormatTable } from './components/MediaFormatTable.tsx';
import { useMediaDownload } from './hooks/useMediaDownload.tsx';
import { useMediaFormatsFetch } from './hooks/useMediaFormatsFetch.ts';
import { getAlertMessage } from './utils.tsx';

export const DownloadPage = () => {
  const { state } = useLocation() as Location<string>;
  const { openDownloadDialog } = useMediaDownload();
  const { formats, isLoading } = useMediaFormatsFetch(state);
  const [selectedFormatsMap, setSelectedFormatsMap] = useState<Record<string, MediaFormat>>({});

  const selectedFormats = useMemo<MediaFormat[]>(() => Object.values(selectedFormatsMap), [selectedFormatsMap]);

  const hasSelectedMultiAudio = selectedFormats.filter(({ hasAudio }) => hasAudio).length > 1;
  const hasSelectedMultiVideo = selectedFormats.filter(({ hasVideo }) => hasVideo).length > 1;

  return (
      <PageContainer
          FooterElement={
            <Paper
                elevation={24}
                square={true}
                sx={{
                  borderTop: 1,
                  borderTopColor: 'grey.500',
                  bottom: 0,
                  paddingBlock: 1.5,
                  paddingInline: 4,
                  position: 'sticky',
                }}
            >
              <Stack direction='row'>
                <Button
                    disabled={selectedFormats.length === 0}
                    onClick={() => openDownloadDialog(selectedFormats)}
                    variant='contained'
                >
                  Download
                </Button>
              </Stack>
            </Paper>
          }
          isLoading={isLoading}
      >
        <Box paddingBlock={2}>
          <Collapse in={hasSelectedMultiAudio || hasSelectedMultiVideo}>
            <Alert severity='warning' sx={{ marginBlock: 2 }}>
              <AlertTitle>Warning</AlertTitle>
              You have selected multiple {getAlertMessage(hasSelectedMultiAudio, hasSelectedMultiVideo)} formats. Your
              download will be merged into one file and may have unexpected results.
            </Alert>
          </Collapse>

          <MediaFormatTable
              formats={formats}
              selectedFormats={selectedFormatsMap}
              setSelectedFormats={setSelectedFormatsMap}
          />
        </Box>
      </PageContainer>
  );
};
