import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { ContentContainer } from '../../components/ContentContainer.tsx';
import { PageContainer } from '../../components/PageContainer.tsx';
import { MediaCard } from './components/MediaCard.tsx';
import { useMediaSearchFetch } from './hooks/useMediaSearchFetch.ts';

export const SearchPage = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const { isLoading, media } = useMediaSearchFetch(searchPhrase);

  return (
      <PageContainer
          HeaderElement={
            <TextField
                disabled={isLoading}
                label='Search'
                onChange={event => setSearchPhrase(event.target.value)}
                placeholder='ex.: never gonna give you up'
                slotProps={{
                  input: {
                    endAdornment: (
                        <InputAdornment position='end'>
                          <SearchIcon/>
                        </InputAdornment>
                    ),
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
                value={searchPhrase}
            />
          }
          isLoading={isLoading}
      >
        <ContentContainer hasContent={media.length > 0} message='No items found'>
          <Stack gap={2}>
            {media.map(medium => (
                <MediaCard info={medium} key={medium.id}/>
            ))}
          </Stack>
        </ContentContainer>
      </PageContainer>
  );
};
