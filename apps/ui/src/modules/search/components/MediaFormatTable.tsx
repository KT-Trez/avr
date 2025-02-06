import HeadsetIcon from '@mui/icons-material/Headset';
import VideocamIcon from '@mui/icons-material/Videocam';
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { type Dispatch, type SetStateAction, useCallback } from 'react';
import type { MediaFormat } from 'types/src/media.ts';
import { LabeledValue } from '../../../components/LabeledValue.tsx';

type MediaFormatTableProps = {
  formats: MediaFormat[];
  selectedFormats: Record<string, MediaFormat>;
  setSelectedFormats: Dispatch<SetStateAction<Record<string, MediaFormat>>>;
};

export const MediaFormatTable = ({ formats, selectedFormats, setSelectedFormats }: MediaFormatTableProps) => {
  const handleRowClick = useCallback(
      (format: MediaFormat) => {
        setSelectedFormats(prev => {
          const newState = { ...prev };
          const isSelected = !!newState[format.id];

          if (isSelected) {
            delete newState[format.id];
          } else {
            newState[format.id] = format;
          }

          return newState;
        });
      },
      [setSelectedFormats],
  );

  return (
      <TableContainer component={Paper} sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Audio/Video</TableCell>
              <TableCell>Bitrate</TableCell>
              <TableCell>Codecs</TableCell>
              <TableCell>Quality</TableCell>
              <TableCell>Itag</TableCell>
              <TableCell sx={{ boxSizing: 'content-box', minWidth: 100 }}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {formats.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box paddingBlock={6}>
                      <Typography align='center' variant='h6'>
                        No formats available
                      </Typography>
                      <Typography align='center' color='textSecondary' variant='body1'>
                        The media is not available in any format
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
            )}

            {formats.map(format => (
                <TableRow key={format.id}>
                  <TableCell>
                    <Stack direction='row' gap={1}>
                      <HeadsetIcon color={format.hasAudio ? undefined : 'disabled'}/>
                      <VideocamIcon color={format.hasVideo ? undefined : 'disabled'}/>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <LabeledValue label='Audio' value={format.bitrateAudio}/>
                    <LabeledValue label='Video' value={format.bitrateVideo}/>
                  </TableCell>
                  <TableCell>
                    <LabeledValue label='Audio' value={format.codecsAudio}/>
                    <LabeledValue label='Video' value={format.codecsVideo}/>
                  </TableCell>
                  <TableCell>
                    <LabeledValue label='Audio' value={format.qualityAudio}/>
                    <LabeledValue label='Video' value={format.qualityVideo}/>
                  </TableCell>
                  <TableCell>{format.itag}</TableCell>
                  <TableCell>
                    <Button
                        color={selectedFormats[format.id] ? 'error' : 'primary'}
                        onClick={() => handleRowClick(format)}
                        variant='contained'
                    >
                      {selectedFormats[format.id] ? 'Remove' : 'Add'}
                    </Button>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};
