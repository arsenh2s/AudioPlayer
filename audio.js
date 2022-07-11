var data = {
    title: [
        'X Ambassadors - BOOM',
        "Denzel Curry, Gizzle & Bren Joy – Dynasties & Dystopia",
        "Imagine Dragons - Bones"
    ],
    song: [
        'music/x_ambassadors-boom.mp3',
        "music/Denzel_Curry_Gizzle_Bren_Joy_-_Dynasties_Dystopia-MIDEVIBEZ.COM.mp3",
        "music/Imagine Dragons - Bones.mp3"
    ],
    poster: [
        "images/artworks-uiU4db5kZypo-0-t500x500.jpg",
        "images/Dynasties-Dystopia-Lyrics-Denzel-Curry.jpg",
        "images/httpsimages.genius.com8d236f6a9d082ec8c30c8928dd84a91b.1000x1000x1.png"
    ]
}
var song = new Audio()
var playBtn = document.querySelector("#play")
let playBtnIcon = document.querySelector("#playBtnIcon")
let track = document.querySelector(".track")
let currentTimeN = document.querySelector('#currentTime')
let songDuration = document.querySelector("#duration")
let prev = document.querySelector("#pre")
let next = document.querySelector("#next")
let volumeMenu = document.querySelector(".volumeMenu")
let volumeBar = document.querySelector(".volumeBar")
let volHandle = document.querySelector(".volHandle")
let volIcnContainer = document.querySelector(".volIcnContainer")
let volumeBtnG = document.querySelectorAll("#volumeBtn g path")
var currentSong = 0

song.volume = 0.5

window.onload = function () {
    playSong()
}
console.log(volumeBtnG);

playBtn.onclick = () => {
    if (song.paused == true) {
        song.play()
    }
    else if (song.paused == false) {
        song.pause()
    }
}



function prevMusic() {
    if (currentSong > 0) currentSong -= 1
    else if (currentSong == 0) currentSong = data.song.length - 1
    playSong()
}
prev.onclick = prevMusic

function nextMusic() {
    if (currentSong < data.song.length - 1) currentSong += 1
    else if (currentSong == data.song.length - 1) currentSong = 0
    playSong()
}
next.onclick = nextMusic


function time() {
    let timeStamp = song.currentTime / song.duration * 100
    track.value = timeStamp
    track.style.backgroundSize = `${timeStamp}% 100%`
    let a1 = Math.floor(song.currentTime / 60) < 10 ? '0' + Math.floor(song.currentTime / 60) : Math.floor(song.currentTime / 60)
    let a2 = Math.floor(song.currentTime % 60) < 10 ? '0' + Math.floor(song.currentTime % 60) : Math.floor(song.currentTime % 60)
    let b1 = Math.floor(song.duration / 60) < 10 ? '0' + Math.floor(song.duration / 60) : Math.floor(song.duration / 60)
    let b2 = Math.floor(song.duration % 60) < 10 ? '0' + Math.floor(song.duration % 60) : Math.floor(song.duration % 60)
    currentTimeN.innerHTML = a1 + ':' + a2
    songDuration.innerHTML = b1 + ':' + b2
    volHandle.style.backgroundSize = `${volHandle.value}% 100%`

    if(song.volume < 0.75) volumeBtnG[2].style.opacity = 0 
    else volumeBtnG[2].style.opacity = 1
    if(song.volume < 0.50) volumeBtnG[1].style.opacity = 0 
    else volumeBtnG[1].style.opacity = 1
    if(song.volume < 0.25) volumeBtnG[0].style.opacity = 0 
    else volumeBtnG[0].style.opacity = 1
    requestAnimationFrame(time)
}
time()

function playSong() {
    song.src = data.song[currentSong];
    let songTitle = document.querySelector(".songTitle");
    songTitle.textContent = data.title[currentSong];
    let img = document.getElementById("row1");


    img.style.backgroundImage = "url(" + data.poster[currentSong] + ")";
    let main = document.getElementById("main")
    main.style.backgroundImage = "url(" + data.poster[currentSong] + ")";
}


let volIcnContainerAct = false
volIcnContainer.onclick = () => {
    if(volIcnContainerAct){
        volumeMenu.style.height = "50px"
        volIcnContainerAct = false
        volHandle.style.display = "none"
        volumeBar.style.display = "none"
    }
    else{
        volumeMenu.style.height = "200px"
        volIcnContainerAct = true
        volHandle.style.display = "flex"
        volumeBar.style.display = "flex"
    }
}


volHandle.value = song.volume * 100

volHandle.onchange = (e) => {
    song.volume = e.target.value / 100
}
