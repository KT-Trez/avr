# YouTube Downloader
Desktop, electron based app, to download videos from [YouTube](https://www.youtube.com/).

# Download
To download an app, visit [releases](https://github.com/KT-Trez/yt_downloader/releases) page and select adequate installer.

# Usage
### Download Tab
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

### Downloaded Tab
Browse your downloaded audio and video files. You can delete them or play using system build-in media player.  
To view downloads directly in directory, press folder icon next to the `Open in directory` inscription.

# Build from source
1. Install latest version of Node.js
2. In `client` directory 
   1. Install dependencies with `npm install`
   2. Build GUI with `npm run build`
3. In `electron` directory
   1. Install dependencies with `npm install`
   2. Build app with `npm run build`
   3. Move GUI to app's directory with `npm run production-gui`
   4. Create release files with `npm run electron-production`

# Scripts
- `client` directory
  - `npm run build` - React's script; builds .html & .ts files in production mode
  - `npm run start` - React's script; starts React's development server and listens for changes in files
- `electron` directory
  - `npm run build` - compiles typescript files into build directory
  - `npm run build-watch` - compiles typescript files and listens for changes
  - `npm run electron-dev` - starts Electron in development mode; by default, app will try to load GUI from [gui directory](./electron/gui), then it will attempt to listen to http://localhost:3000
  - `npm run electron-production` - builds release files; check **Build from source** section for step-by-step guide
  - `npm run production-gui` - copies GUI from `client`'s [build directory](./client/build) to `electron`'s [gui directory](./electron/gui)