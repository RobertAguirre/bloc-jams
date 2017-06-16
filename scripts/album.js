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
    + '<td class="song-item-number" data-song-number = " ' + songNumber + ' ">' + songNumber + '</td>'
    + '<td class="song-item-title">' + songName + '</td>'
    + '<td class="song-item-duration">' + songLength + '</td>'
    ;

    //return template;
    return $(template);
};

// Global scope elements to populate dynamically
// var albumTitle = document.getElementsByClassName('album-view-title')[0];
// var albumArtist = document.getElementsByClassName('album-view-artist')[0];
// var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
// var albumImage = document.getElementsByClassName('album-cover-art')[0];
// var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

//get corresponding album DOM
var $albumTitle = $('.album-view-title'); //get .album-view-title (class) element.
var $albumArtist = $('.album-view-artist');
var $albumReleaseInfo = $('.album-view-release-info');
var $albumImage = $('.album-cover-art');
var $albumSongList = $('.album-view-song-list');

var setCurrentAlbum = function(album) {
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  $albumSongList.empty();

  for (var i = 0; i < album.songs.length; i++){
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

  // Assigns values to each part of the Album (text, images)
  // albumTitle.firstChild.nodeValue = album.title;
  // albumArtist.firstChild.nodeValue = album.artist;
  // albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  // albumImage.setAttribute('src', album.albumArtUrl);

  // Clear contents of album song list container
  //albumSongList.innerHTML = '';

  // Build list of objects from album JavaScript object
  //   for (var i = 0; i < album.songs.length; i++) {
  //       albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
  //   }
  // };



var findParentByClassName = function(element, targetClass) {
  if (element) {
    var currentParent = element.parentElement;
    while (currentParent.className !== targetClass && currentParent.className !== null) {
      currentParent = currentParent.parentElement;
    }
    return currentParent;
  }

  // if (findParentByClassName(element, targetClass) == null){
  //   alert("No parent Found");
  // } else if (!targetClass) {
  //   alert("No parent foud with that class name");
  // }
};

var getSongItem = function(element){
    switch (element.className) {
      case 'album-song-button':
      case 'ion-play':
      case 'ion-pause':
        return findParentByClassName(element, 'song-item-number');
      case 'album-view-song-item':
        return element.querySelector('.song-item-number');
      case 'song-item-title':
      case 'song-item-duration':
        return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
      case 'song-item-number':
        return element;
      default:
        return;
    }
};

var clickHandler = function(targetElement) {

  var songItem = getSongItem(targetElement);

  if (currentlyPlayingSong === null) {
      songItem.innerHTML = pauseButtonTemplate;
      currentlyPlayingSong = songItem.getAttribute('data-song-number');
  } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
      songItem.innerHTML = playButtonTemplate;
      currentlyPlayingSong = null;
  } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
      var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
      currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
      songItem.innerHTML = pauseButtonTemplate;
      currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }
};

//For storing the selected variable in a table to add a listener for a mouseover event
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

//Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//Store state of playing songs
var currentlyPlayingSong = null;

window.onload = function() {
  setCurrentAlbum(albumPicasso);

  songListContainer.addEventListener('mouseover', function(event){
    //Only target individual song rows during event delegation
    if (event.target.parentElement.className === 'album-view-song-item') {
      //Change the content from the number to the play button's HTML
      event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
      var songItem = getSongItem(event.target);

      if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
        songItem.innerHTML = playButtonTemplate;
      }
    }
  });

  for (var i = 0; i < songRows.length; i++){
    songRows[i].addEventListener('mouseleave', function(event){

    var songItem = getSongItem(event.target);
    var songItemNumber = songItem.getAttribute('data-song-number');

    if (songItemNumber !== currentlyPlayingSong) {
      songItem.innerHTML = songItemNumber;
    }
  });

    songRows[i].addEventListener('click', function(event){
      clickHandler(event.target);
    });
  }

/*  var albumsArray = [albumPicasso, albumMarconi, albumSheeran];
  i = 1;

  albumImage.addEventListener('click', function(x){
    setCurrentAlbum( albumsArray[i] );
    i++;
    if (i == albumsArray.length){
        i = 0;
    }
  })
*/
};
