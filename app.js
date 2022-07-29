// diğer js dosyalarını işlevsel hale getirip kullanmak

// İşimize yarayacak HTML elemanlarını alalım
const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const audio = document.querySelector("#audio");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volumeBar = document.querySelector("#volume-bar");
const volume = document.querySelector("#volume");
const uL = document.querySelector("ul");

 

// --------------------------------------------------------


// Bir MusicPlayer objesi oluşturalım ve ona "music.js"'teki musicList arrayini parametre olarak yollayalım
const player = new MusicPlayer(musicList);

// MusicPlayer üzerinden gelen müzik bilgilerini sayfa üzerine direkt yansıtabiliriz
window.addEventListener("load", () => {
// Index numarasına göre elde ettiğimiz müziğin bilgilerini bir variable'da tutalım ki her seferinde player.getMusic() yazmak zorunda kalmayalım
let music = player.getMusic();
displayMusic(music);
displayMusicList(player.musicList);
isPlayingNow();
});

// İlgili DOM elementlerine, ilgili atamalar yapılsın
function displayMusic(music){
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
} 

// Müziğimiz tıklayınca çalışsın
play.addEventListener("click", () => {
    // Eğer ilgili elementte "playing" classı var mı yok mu kontrol et, boolean return et
    const isMusicPlay = container.classList.contains("playing");
    // Eğer music çalıyor ise durdur, çalmıyor ise çal
    isMusicPlay ? pauseMusic() : playMusic();
});

// Müziğimizi durduran fonksiyon
function pauseMusic() {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}

// Müziğimizi çaldıran fonksiyon
function playMusic () {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}

// Bir önceki müziğe geçirttiren fonksiyon
function prevMusic() {
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

// Bir sonraki müziğe geçirttiren fonksiyon
function nextMusic() {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

// Geri butonu ile bir önceki müziğe dönme eventi
prev.addEventListener("click", () => {
    prevMusic();
});

// İleri butonu ile sıradaki müziğe geçmece
next.addEventListener("click", () => {
    nextMusic();
});

// Müziğimizin toplam saniyesini ve dakikasını düzgünce gösterebilmek için Math işlemleri yapalım
const calculateTime = (seconds) => { 
    const minute = Math.floor(seconds/60);
    const second = Math.floor(seconds%60);
    const result = second < 10 ? `${minute}:0${second}` : `${minute}:${second}`;
    return result;
}

// Loadedmetadata ile bir audio eventi oluşturalım ki audio ile müziğin ilişkilendirildiğine emin olalım
// Bunu bir eventlistenersız yapmaya çalışsaydık, "loaded" olmadan audio bilgisine erişmeye çalışacağı için bunun üzerinde işlemler yapamayacaktık
audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

// Süre cubugumuz uzerınde geçen süreyi gösterelim
// Timeupdate, her geçen saniyede işleme sokar
audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

// Kullanıcı, süre barı üzerinden müziği istediği saniyeye ilerletebilsin
// İnput eventi olmasının sebebi, işlemin bir input üzerine focus olunduğunda gerçekleşmesinden dolayıdır
progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

// audio.addEventListener("loadedmetadata", () => {
//     audio.addEventListener("timeupdate", () => {
//         let map = (((audio.currentTime)/(audio.duration))*100);
//         let color = 'linear-gradient(90deg, rgb(0,0,255)' + map +'%, rgb(211,211,211)' + map + '%)';
//         progressBar.style.background = color;
//     });
// });

// Ses düzeyimizin kontrolünü sağlayalım, kullanıcı değiştirebilsin
var muteState = "unmuted";

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 1) {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark"; 
    } else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
    }
});


var tmpValue;
volume.addEventListener("click", () => {
    if(muteState === "unmuted") {
        tmpValue = audio.volume;
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark"; 
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = tmpValue*100;
        console.log(volumeBar.value);
        audio.volume = tmpValue;
    }
});

// Muzik listemizi dinamik olarak kullanıcının yüklediği dosyalara göre oluşturalım
const displayMusicList = (list) => {
    for(let i = 0; i < list.length; i++) {
        let liTag = `
            <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill">3:40</span>
                <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>`;

            uL.insertAdjacentHTML("beforeend", liTag);

            let liAudioDuration = uL.querySelector(`#music-${i}`);
            let liAudioTag = uL.querySelector(`.music-${i}`);

            liAudioTag.addEventListener("loadeddata", () => {
                liAudioDuration.innerText = calculateTime(liAudioTag.duration);
            });
    }
}

const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}

const isPlayingNow = () => {
    for(let li of uL.querySelectorAll("li")) {
        if(li.classList.contains("playing")) {
            li.classList.remove("playing");
        }

        if(li.getAttribute("li-index") == player.index) {
            li.classList.add("playing");
        }
    }
}

audio.addEventListener("ended", () => {
    nextMusic();
})