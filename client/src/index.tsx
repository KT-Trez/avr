import AppRoot from './AppRoot';
import React from 'react';
import ReactDOM from 'react-dom';
import IPCRenderer from './services/IPCRenderer';


ReactDOM.render(
    <React.StrictMode>
        <AppRoot/>
    </React.StrictMode>,
    document.getElementById('root')
);

// initialize ipcMain listeners
IPCRenderer.initialize();