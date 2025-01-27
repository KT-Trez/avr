import AudioFileIcon from '@mui/icons-material/AudioFile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LaunchIcon from '@mui/icons-material/Launch';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import { IconButton, TableCell, TableRow } from '@mui/material';
import moment from 'moment';
import type { YT_DL } from '../../../typings';

interface FileProps {
  metadata: YT_DL.Core.Stats.FileStats;
  setPathOfFileToRemove: (deleteContext: string) => void;
}

function File({ metadata, setPathOfFileToRemove }: FileProps) {
  const removeFile = () => {
    setPathOfFileToRemove(metadata.name);
  };

  const openFile = () => {
    window.coreAPI.openDownloadsFile(metadata.name);
  };

  return (
      <TableRow key={metadata.name}>
        <TableCell>
          {metadata.media === 'mp3' ? (
              <AudioFileIcon color={'disabled'} fontSize={'large'}/>
          ) : (
              <VideoFileIcon color={'disabled'} fontSize={'large'}/>
          )}
        </TableCell>
        <TableCell>{metadata.name}</TableCell>
        <TableCell>{moment(metadata.created).format('DD-MM-YYYY • HH:mm')}</TableCell>
        <TableCell>
          {metadata.size.value} {metadata.size.unit}
        </TableCell>
        <TableCell>
          <IconButton onClick={openFile}>
            <LaunchIcon/>
          </IconButton>
          <IconButton onClick={removeFile}>
            <DeleteForeverIcon color={'error'}/>
          </IconButton>
        </TableCell>
      </TableRow>
  );
}

export default File;
