# YouTube Downloader
Desktop, electron based app, to download videos from [YouTube](https://www.youtube.com/).

# Download
To download an app, visit [releases](https://github.com/KT-Trez/YouTube-Downloader/releases) page and select adequate
installer.

# Usage

### Search Tab
1. Search for videos using keywords from title ex.: `never gonna give you up`
2. Chose the video and click its download icon to open download menu
   - Simple download
     1. Scroll through the list of available formats and chose one for yourself 
     2. Click on the download button next to your desired format
   - Advanced download
     1. Toggle advanced mode with ⋯ button in the top-right corner of download menu
     2. Chose one audio and one video format that will be merged together. Select them by toggling corresponding sliders
     3. Press `ADVANCED DOWNLAOD` button above formats section

> **Warning**  
> `Advanced download` uses [FFmpeg](https://ffmpeg.org/) to merge audio and video, which is a CPU heavy task.  
> Consider this when downloading more than one video simultaneous or using lower-end computers and laptops.
> 
> Additionally, merging not always is perfect and some de-sync between audio and video may occur.

### Queue Tab
Check progress of videos download.  
Progress consist of three parts, but not all of them must be present on selected format:
- Audio - audio's download progress
- Video - video's download progress
- Merge - merging audio with video progress (_advanced mode function_)

### Downloads Tab
Browse your downloaded audio and video files. You can delete them or play using system build-in media player.  
To view downloads directly in directory, press folder icon next to the `Open in directory` inscription.

# Build from source

1. Install latest version of Node.js
2. Install dependencies with `npm install`
3. Build GUI with `npm run build`
4. Build app's TypeScript files with `npm run build`
5. Build app with `npm run electron-builder`

# Scripts

- `npm run build` - React's script; builds .html & .ts files in production mode
- `npm run build_core` - compiles Electrons' TypeScript files into build directory
- `npm run build_core-watch` - compiles Electrons' TypeScript files and listens for changes
- `npm run electron-builder` - builds an app; check [Build from source](#build-from-source) section for step-by-step
  guide
- `npm run electron-dev` - starts Electron in development mode; by default, app will try to load GUI
  from `http://localhost:3000`, so make sure to start React beforehand
- `npm run start` - React's script; starts React's development server and listens for changes in files