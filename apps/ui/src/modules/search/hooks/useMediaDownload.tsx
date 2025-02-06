import { Alert, AlertTitle, DialogContent, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MediaFormat } from 'types/src/media.ts';
import { useConfirmationDialog } from '../../../components/ConfirmationDialog/useConfirmationDialog.ts';
import { useSnackbar } from '../../../components/Snackbar/useSnackbar.tsx';
import { getAlertMessage } from '../utils.tsx';

export const useMediaDownload = () => {
  const { close, open } = useConfirmationDialog();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const openDownloadDialog = useCallback(
      (formats: MediaFormat[]) => {
        const downloadText = formats.length > 1 ? 'Download and merge' : 'Download';
        const formatsText = formats.length > 1 ? 'formats' : 'format';

        const hasSelectedMultiAudio = formats.filter(({ hasAudio }) => hasAudio).length > 1;
        const hasSelectedMultiVideo = formats.filter(({ hasVideo }) => hasVideo).length > 1;
        const hasMultiFormat = hasSelectedMultiAudio || hasSelectedMultiVideo;

        open({
          confirmButtonText: 'Download',
          content: (
              <DialogContent>
                {hasMultiFormat && (
                    <Alert severity='warning' sx={{ marginBottom: 2 }}>
                      <AlertTitle>Warning</AlertTitle>
                      You are about to download multiple {getAlertMessage(hasSelectedMultiAudio,
                        hasSelectedMultiVideo)}{' '}
                      formats. our download will be merged into one file and may have unexpected results.
                    </Alert>
                )}

                <Typography>
                  You are about to {downloadText.toLowerCase()} the following {formatsText}:
                </Typography>

                <ul>
                  {formats.map(({ id }) => (
                      <li key={id}>
                        <Typography fontWeight='bold'>{id}</Typography>
                      </li>
                  ))}
                </ul>

                <Typography mt={2}>Do you want to proceed?</Typography>
              </DialogContent>
          ),
          onConfirm: () => {
            window.electronAPI.downloadMedia(formats);
            enqueueSnackbar('Download added to the queue');
            close();

            navigate('/search');
          },
          title: `${downloadText} ${formatsText}`,
        });
      },
      [close, enqueueSnackbar, navigate, open],
  );

  return {
    openDownloadDialog,
  };
};
