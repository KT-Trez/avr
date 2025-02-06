export const getAlertMessage = (hasSelectedMultiAudio: boolean, hasSelectedMultiVideo: boolean) => {
  if (hasSelectedMultiAudio && hasSelectedMultiVideo) {
    return (
        <>
          <b>audio</b>
          and
          <b>video</b>
        </>
    );
  }

  if (hasSelectedMultiAudio) {
    return <b>audio</b>;
  }

  if (hasSelectedMultiVideo) {
    return <b>video</b>;
  }

  return '';
};