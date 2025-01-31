import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton, Paper, Stack, Typography } from '@mui/material';
import type { FileInfo } from 'types/src/fileInfo.ts';
import { formatDate } from 'utils/src/formatDate.ts';

type FileCardProps = {
  info: FileInfo;
  onOpen: (uid: string) => void;
  onRemove: (uid: string) => void;
};

export const FileCard = ({ info, onOpen, onRemove }: FileCardProps) => {
  const formattedCreatedAt = formatDate(info.createdAt);
  const formattedModifiedAt = formatDate(info.modifiedAt);
  const sizeMB = (info.size / 1000).toFixed(1);

  return (
      <Paper sx={{ paddingInline: 2, paddingBlock: 1 }}>
        <Stack alignItems='center' direction='row' gap={1} justifyContent='space-between'>
          <Typography overflow='hidden' fontWeight='bold' textOverflow='ellipsis' whiteSpace='nowrap'>
            {info.filename}
          </Typography>

          <Stack alignItems='center' direction='row' gap={1} justifyContent='space-around'>
            <Typography color='text.secondary' ml={2} variant='body2'>
              Created:
            </Typography>
            <Typography minWidth={160} textAlign='right'>
              {formattedCreatedAt}
            </Typography>

            <Typography color='text.secondary' ml={2} variant='body2'>
              Modified:
            </Typography>
            <Typography minWidth={160} textAlign='right'>
              {formattedModifiedAt}
            </Typography>

            <Typography minWidth={100} ml={2} textAlign='right'>
              {sizeMB} MB
            </Typography>

            <Stack direction='row' gap={1} ml={2}>
              <IconButton onClick={() => onOpen(info.uid)}>
                <LaunchIcon/>
              </IconButton>

              <IconButton onClick={() => onRemove(info.uid)}>
                <DeleteForeverIcon color='error'/>
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
  );
};
