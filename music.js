// Muzik ile alakalı bilgiler
// Muzik ismi, şarkıcı ismi, dosya yolu vs..

// Music classımızı oluşturalım
class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    // Gösterilen müziğin bilgilerini yazdıralım
    getName() {
        return this.title + " - " + this.singer;
    }

}

// Müzik listemizi oluşturalım
const musicList = [
    new Music("Boşver", "Nilüfer", "1.jpeg", "1.mp3"),
    new Music("Bu Da Geçer Mi Sevgilim", "Yalın", "2.jpeg", "2.mp3"),
    new Music("Aramızda Uçurumlar", "Suat Suna", "3.jpeg", "3.mp3")
]