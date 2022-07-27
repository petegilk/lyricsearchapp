'use strict'

let splitArtist;
let splitSong;

function songSearch() {
  let artist = prompt("Enter an artist");
  let song;
  if (artist) {
    song = prompt("Enter a song name");
  }

  splitArtist = artist.toLowerCase().trim();
  splitSong = song.toLowerCase().trim();
  for (let i=0; i<splitArtist.length; i++) {
    if (splitArtist.indexOf(' ') > -1) {
      splitArtist = splitArtist.replace(' ', '-');
    }

    if (splitSong.indexOf(' ') > -1) {
      splitSong = splitSong.replace(' ', '-');
    }
  }
  console.log(splitArtist, splitSong);
  loadAPIdata(splitArtist, splitSong);
}

// API fetch request for song lyrics
// returns data in JSON format and passes to a function

function loadAPIdata(artist, song) {
  console.log('in API function');

  fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    .then(function(response){
      if (!response.ok) {
        throw Error('Server said no');
      }
      console.log('fetch is done', response);
      return response.json();
    })

    .then(function(data){
      console.log('Retrieved data');
      console.log(data);
      printLyrics(data);

    }).catch(function(error){
      console.log('Something went wrong:', error);
      alert('Song not found');
    })
}

// takes in an object called 'song' and stores key 'lyrics' in 'split' variable
// line breaks in JSON are '\n'
// I used a for loop to find index of each '\n'
//  and replace them with an HTML break,'<br>'
// Then innerHTML of element ID 'lyrics' is set to new replaced string

function printLyrics(song) {

  let h4 = document.getElementById('artist-song');
  let paragraph = document.getElementById('lyrics');
  let split = song.lyrics;
  let find = '\n';
  let replace = '<br>'

  for (let i=0; i<split.length; i++) {
    if (split.indexOf(find) > -1) {
      split = split.replace(find, replace);
    }

    if (splitArtist.indexOf('-') > -1) {
      splitArtist = splitArtist.replace('-', ' ');
    }

    if (splitSong.indexOf('-') > -1) {
      splitSong = splitSong.replace('-', ' ');
    }
  }

  h4.innerHTML = `${splitArtist} - ${splitSong}`;
  paragraph.innerHTML = `<br>${split}`;
  paragraph.style.padding = '30px';
}
