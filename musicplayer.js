// music.js'yi yönetmek, yeni müzik getirmek, önceki müziğe geçiş yapmak, sonraki müziğe geçmek

class MusicPlayer {
    constructor(musicList) {
        this.musicList = musicList; // Muzik listemiz "music.js"'teki gibi bir arrayde değil de, objemizin içinde bulunsun ki classımızın içindeki fonksiyonlar sayesinde daha rahat erişip başka noktalara aktarabilelim.
        this.index = 0; // listeden gelen ilk müziğin indexi'nin 0 olduğunu belirtmeliyiz ki playerdan ileri-geri yaptığımızda kolaylık olsun
                        // Böylece her seferinde music.js içerisindeki musicList'ten bir müzik getirebilicez
        
    }

// İndex numarasına göre müziği bize getiren bir fonksiyonumuz olsun
    getMusic() {
        return this.musicList[this.index];
    }
// İlgili butona tıklandığında sıradaki şarkıya geçmek için bir fonksiyonumuz olsun
    next() {
        // Listedeki sonuncu müzikte değilsek
        if(this.index + 1 < this.musicList.length)
        // Sıradaki müziğe geç
        {
            this.index++;
        // Sonuncu müzikteysek en başa dön
        } else {
            this.index = 0;
        }
    }

    // İlgili butona tıklandığında geçmiş şarkıya dönmek için bir fonksiyonumuz olsun
    previous() {
        // Listedeki ilk müzikte değilsek
        if(this.index != 0) {
        // Bir önceki müziğe geç
            this.index--;
        // Listedeki İlk Müzikteysek en sona geç
        } else {
            this.index = this.musicList.length - 1;
        }
    }

}