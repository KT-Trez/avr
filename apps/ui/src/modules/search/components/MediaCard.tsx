import { Box, Card, CardContent, CardHeader, CardMedia, Link, Stack, Typography, useTheme } from '@mui/material';
import type { Media } from 'types/src/media.ts';
import { LabeledValue } from '../../../components/LabeledValue.tsx';

type MediaCardProps = {
  info: Media;
};

export const MediaCard = ({ info }: MediaCardProps) => {
  const { spacing } = useTheme();

  const formattedViews = Intl.NumberFormat('en-GB', { notation: 'compact' }).format(info.views);
  // todo: add download dialog

  return (
      <Card>
        <CardHeader subheader={info.published} title={info.title}/>

        <Stack direction='row'>
          <Box flex={1} sx={{ position: 'relative' }}>
            <CardMedia
                alt={`${info.title} thumbnail`}
                component='img'
                image={info.thumbnail}
                sx={{ '&.MuiCardMedia-root': { borderRadius: `0 0 0 ${spacing(1)}` } }}
            />

            <Typography
                border='1px solid rgba(255, 255, 255, 0.5)'
                borderRadius={1}
                bottom={8}
                color='white'
                padding={1}
                position='absolute'
                right={8}
                sx={{ backgroundColor: 'rgb(0, 0, 0, 0.8)' }}
            >
              {info.timestamp}
            </Typography>
          </Box>

          <CardContent sx={{ flex: 1 }}>
            <LabeledValue label='Author' value={info.author}/>
            <LabeledValue ValueComponent={Link} label='Link' value={info.url}/>
            <LabeledValue label='Views' value={formattedViews}/>
          </CardContent>
        </Stack>
      </Card>
  );
};
