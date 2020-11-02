const { ipcRenderer } = require('electron');
const { $ } = require('./help');
const path = require('path')
let musicFilesPath = [];

$('select-music-button').addEventListener('click', () => {
  ipcRenderer.send('open-music-file');
})
$('add-music-button').addEventListener('click', () => {
  musicFilesPath.length > 0 && ipcRenderer.send('add-tracks', musicFilesPath)
})

const renderListHTML = (paths) => {
  const musicList = $('musicList')
  const musicItemsHTML = paths.reduce((html, music) => {
    html += `<li class="list-group-item">${path.basename(music)}</li>`
    return html
  }, '')
  musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`
}
ipcRenderer.on('selected-file', (event, path) => {
  if (Array.isArray(path)) {
    musicFilesPath = musicFilesPath.concat(path)
    musicFilesPath.length > 0 && renderListHTML(musicFilesPath)
  }
});

