var body = document.querySelector('body');
var tracks = document.querySelectorAll('.track');
var playButtons = document.querySelectorAll('.play-button');
var bgBars = document.querySelectorAll('.bg-bar');
var progressBars = document.querySelectorAll('.progress-bar');
var progressKnobs = document.querySelectorAll('.progress-knob');
var musicPlayer = document.getElementById('music-player');
var songLengths = document.querySelectorAll('.song-length');





//See all audio elements in the browser
function findAudioElements() {
  var audio = document.querySelectorAll('audio');
  return audio;
}





//Object with song sources
var playlist = {
    "track_1": {
      song: "sing & talk",
      artist: "allen odell",
      src: "audio/sing & talk (mix 1.5).wav"
    },
  // "track_1": {
  //   song: "Road Demo",
  //   artist: "allen odell",
  //   src: "audio/Road Official Demo.mp3"
  // },
  // "track_2": {
  //   song: "Eyes Demo",
  //   artist: "allen odell",
  //   src: "audio/Eyes first demo.mp3"
  // },
  // "track_3": {
  //   song: "Unstable Demo",
  //   artist: "allen odell",
  //   src: "audio/Unstable one take.mp3"
  // },
  // "track_4": {
  //   song: "Darling Demo",
  //   artist: "allen odell",
  //   src: "audio/Darling.mp3"
  // },
  "track_2": {
    song: "Brand New",
    artist: "allen odell",
    src: "audio/BrandNew.mp3"
  },
  "track_3": {
    song: "Distant Memory",
    artist: "allen odell",
    src: "audio/distant memory.mp3"
  },
  "track_4": {
    song: "Petrie",
    artist: "allen odell",
    src: "audio/petrie.mp3"
  }

}





//Give play buttons an ID based on song name (text in the browser)
function identifyPlayButtons() {
  for (var i = 0; i < tracks.length; i++) {
    tracks[i].childNodes[3].firstElementChild.firstElementChild.id = tracks[i].firstElementChild.textContent;
  }
}

identifyPlayButtons();





// Put srcs into an array
function srcToArr(playlistObj) {
  var arr = [];
  for (var i = 0; i < Object.keys(playlistObj).length; i++) {
    arr.push(playlistObj[Object.keys(playlistObj)[i]].src);
  }
  return arr;
}

playlistSrcs = srcToArr(playlist);





// Put song names into an array
function songsToArr(playlistObj) {
  var arr = [];
  for (var i = 0; i < Object.keys(playlistObj).length; i++) {
    arr.push(playlistObj[Object.keys(playlistObj)[i]].song);
  }
  return arr;
}

playlistSongs = songsToArr(playlist);

// These two arrays might be unnecessary, but as of now I'm not sure how to iterate through an object, which I am going to have to do when I assign the audio elements and their correct srcs.





//Assign audio elements and srcs
playButtons.forEach(function(button, index) {
  var audioElement = document.createElement('audio');
  button.append(audioElement);
    if (button.id === playlistSongs[index]) {
      button.firstChild.src = playlistSrcs[index];
    }
})





//Play and Pause
playButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
        if (this.firstChild.paused) {
            this.firstChild.play();
            this.classList.remove('play-button');
            this.classList.add('pause-button');
        } else if (!this.firstChild.paused) {
            this.firstChild.pause();
            this.classList.remove('pause-button');
            this.classList.add('play-button');
        }
    })
})





//Convert time in seconds to minutes:seconds format
function secondsToMinutes(duration) {
  var minutes = Math.floor(duration / 60);
  var seconds = (duration - minutes * 60).toFixed();
  if (seconds < 10) {
    seconds = '0'+seconds;
  }
  return minutes+':'+seconds;
}




function multipliedArr(length, factor) {
    arr = [];
    for (var i = 0; i <= length; i++) {
        arr.push(i * factor);
    }
    return arr;
}


function findTimeDisplayers() {
  var timeDisplayers = document.querySelectorAll('.time-displayer');
  return timeDisplayers;
}


// Forward and Rewind (Click on bg-bar to change currentTime).
bgBars.forEach(function(bar, index, array) {
    //Lil' div to show current time based on where you be hoverin'/mousemovin'
    var showCurrentTime = document.createElement('div');
    bar.append(showCurrentTime);
    showCurrentTime.classList.add('time-displayer');


  bar.addEventListener('mouseup', function(e) {
    //Percentage of position where clicked in order to update the progress bar pixel width
    var goHere = ((e.clientX - this.offsetLeft)/this.clientWidth*100).toFixed(2)+'%';
    //Create a decimal fraction of the position clicked to multiply with the duration of the song and update the current time.
    var songTimeChanger = ((e.clientX - this.offsetLeft)/this.clientWidth);
    //Relative song of each bar
    var relativeSong = playButtons[index].firstElementChild;
    this.firstElementChild.style.width = goHere;
    relativeSong.currentTime = relativeSong.duration * songTimeChanger;
    progressKnobs[index].style.left = e.clientX+'px';
    showCurrentTime.style.display = 'none';
  })


  //Show the current time in the lil' div.
  bar.addEventListener('mousemove', function(e) {
      showCurrentTime.style.display = 'block';
      if (e.clientX - this.offsetLeft > -1) {
          var songTimeChanger = ((e.clientX - this.offsetLeft)/this.clientWidth);
          var relativeSong = playButtons[index].firstElementChild;
          var actualCurrentTime = relativeSong.duration * songTimeChanger;
          showCurrentTime.textContent = secondsToMinutes(actualCurrentTime);

          var mousePosition = (songTimeChanger*100).toFixed(2);

          if (mousePosition >= 50) {
              showCurrentTime.style.left = e.clientX-50+'px';
              showCurrentTime.classList.add('show-current-time-flip');
              showCurrentTime.classList.remove('show-current-time');
          } else {
              showCurrentTime.style.left = e.clientX+'px';
              showCurrentTime.classList.remove('show-current-time-flip');
              showCurrentTime.classList.add('show-current-time');
          }

        //   var mousePositionInt = parseInt((songTimeChanger*100).toFixed(0));
        //   var mousePositionIntLessFifty = mousePositionInt - 50;
        //   var bringItDown = multipliedArr(100, 4);
        //   if (mousePositionInt === 50 + mousePositionIntLessFifty) {
        //       if (mousePositionInt < 50) {
        //           console.log((mousePositionInt/50).toFixed(4));
        //           showCurrentTime.style.transition = 'left ' + (mousePositionInt/50).toFixed(4) + 's';
        //       } else {
        //           console.log(((mousePositionInt - bringItDown[mousePositionIntLessFifty])/50).toFixed(4));
        //           showCurrentTime.style.transition = 'left ' + ((mousePositionInt - bringItDown[mousePositionIntLessFifty])/50).toFixed(4) + 's';
        //       }
        //   }

      }
  })


  bar.addEventListener('mouseleave', function(e) {
          showCurrentTime.style.display = 'none';
  })


  window.addEventListener('scroll', function() {
      setTimeout(function() {
          showCurrentTime.style.display = 'none';
      }, 500)
  })
})




//Update the progress bar. Set Interval contantly runs here. Maybe there's a better way without having the browser to run this non-stop?
setInterval(function() {

    for (var i = 0; i < findAudioElements().length; i++) {
        progressBars[i].style.width = (findAudioElements()[i].currentTime/findAudioElements()[i].duration*100).toFixed(2)+'%';

        progressKnobs[i].style.left = progressBars[i].offsetLeft + progressBars[i].offsetWidth+'px';

        songLengths[i].textContent = secondsToMinutes(findAudioElements()[i].currentTime);

    }

  for (var i = 0; i < findAudioElements().length; i++) {
      if (findAudioElements()[i].ended === true) {
          findAudioElements()[i].parentNode.classList.remove('pause-button');
          findAudioElements()[i].parentNode.classList.add('play-button');
      }
  }
}, 100);




//Drag progress-knob
progressKnobs.forEach(function(knob, index, array) {
    knob.addEventListener('mousedown', function(e) {
        // console.log(e);
    })
})






//That Got Heavy (lol)
var tghBtn = document.querySelector('.that-got-heavy');
var loma = document.querySelector('.loma');

loma.addEventListener('mouseenter', function(e) {
    tghBtn.style.maxWidth = '1000px';
})

loma.addEventListener('mouseout', function(e) {
    tghBtn.style.maxWidth = '0';
})
