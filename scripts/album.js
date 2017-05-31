//Example Album
var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [
    {title: 'Blue', duration: '4:26'},
    {title: 'Green', duration: '3:14'},
    {title: 'Red', duration: '5:01'},
    {title: 'Pink', duration: '3:21'},
    {title: 'Magenta', duration: '2:15'},
  ]
};

//Another Example Album
var albumMarconi = {
  title: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs: [
    { title: 'Hello, Operator?', duration: '1:01' },
    { title: 'Ring, ring, ring', duration: '5:01' },
    { title: 'Fits in your pocket', duration: '3:21'},
    { title: 'Can you hear me now?', duration: '3:14' },
    { title: 'Wrong phone number', duration: '2:15' }
  ]
};

//Third Album Example
var albumSheeran = {
  title: 'Divide',
  artist: 'Ed Sheeran',
  label: 'Atlanic Reocrds UK',
  year: '2017',
  albumArtUrl: 'assets/images/album_covers/Divide_cover.png',
  songs: [
    { title: 'Eraser', duration: '3:48' },
    { title: 'Castle on the Hill', duration: '4:21' },
    { title: 'Dive', duration: '3:59' },
    { title: 'Shape of You', duration: '3:54' },
    { title: 'Perfect', duration: '4:23' },
    { title: 'Galway Girl', duration: '2:51' },
    { title: 'Happier', duration: '3:28' },
    { title: 'New Man', duration: '3:09' },
    { title: 'Hearts Dont Break Around here', duration: '4:09' },
    { title: 'What Do I know?', duration: '3:57' },
    { title: 'How Would You Feel', duration: '4:41' },
    { title: 'Supermarket Flowers', duration: '3:41' },
    { title: 'Barcelona', duration: '3:11' },
    { title: 'Bibia Be Ye Ye', duration: '2:57' },
    { title: 'Nancy Mulligan', duration: '3:00' },
    { title: 'Save Myself', duration: '4:07' }
  ]
};

var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
    + '<td class="song-item-number">' + songNumber + '</td>'
    + '<td class="song-item-title">' + songName + '</td>'
    + '<td class="song-item-duration">' + songLength + '</td>'
    ;

    return template;
};

// Global scope elements to populate dynamically
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
  // Assugb values to each part of the Album (text, images)
  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);

  // Clear contents of album song list container
  albumSongList.innerHTML = '';

  // Build list of objects from album JavaScript object
  for (var i = 0; i < album.songs.length; i++) {
      albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
  }
};

window.onload = function() {
  setCurrentAlbum(albumPicasso);
  var albumsArray = [albumPicasso, albumMarconi, albumSheeran];
  i = 1;

  albumImage.addEventListener('click', function(x){
    setCurrentAlbum( albumsArray[i] );
    i++;
    if (i == albumsArray.length){
        i = 0;
    }
  })
};
