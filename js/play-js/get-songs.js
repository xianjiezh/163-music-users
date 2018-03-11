{
    let view = {

    }

    let model = {
        init() {
            let APP_ID = 'hIYCCR1IrJDOFPV1WgEftfS0-gzGzoHsz'
            let APP_KEY = 'WXIq5lFROJGSxBpkeTeqx25U'
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        fetch() {
            let id = window.location.search.split('=')[1]
            let query = new AV.Query('Playlist')
            return query.get(id)
        },
        song: {}
    }
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.model.init()
            this.getSong()
        },
        getSong(){
            this.model.fetch().then(song => {
                let id = song.id
                let songName = song.attributes.songName
                let singer = song.attributes.singer
                let link = song.attributes.link
                let imgLink = song.attributes.imgLink
                let lyrics = song.attributes.lyrics
                let o = { id, songName, singer, link, imgLink, lyrics}
                log(o)
                this.paly(o.link)
            })
        },
        paly(src){
            let audio = document.getElementsByTagName('audio')[0]
            audio.src = src
            audio.play()
        }
    }
    controller.init(view, model)

}