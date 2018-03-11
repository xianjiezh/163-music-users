{
    let view = {
        el: document.querySelector('.disc'),
        render(imgLink) {
            this.el.querySelector('.cover').src = imgLink
        }
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
        init(view, model) {
            this.view = view
            this.model = model
            this.cover = this.view.el.querySelector('.cover')
            this.model.init()
            this.getSong()
            this.audio = document.getElementsByTagName('audio')[0]
        },
        getSong() {
            this.model.fetch().then(song => {
                let id = song.id
                let songName = song.attributes.songName
                let singer = song.attributes.singer
                let link = song.attributes.link
                let imgLink = song.attributes.imgLink
                let lyrics = song.attributes.lyrics
                let o = { id, songName, singer, link, imgLink, lyrics }
                this.beforePlay(link, imgLink)
                this.view.render(imgLink)
                this.playing()
                this.bindEvents()
            })
        },
        beforePlay(link, imgLink) {
            this.audio.src = link
            document.querySelector('.backCover').style['background-image'] = `url(${imgLink})`
        },
        playing() {
            this.audio.play()
            this.cover.style['animation-play-state'] = 'running'
        },
        bindEvents() {
            let isPlaying = true
            this.view.el.addEventListener('click', e => {
                if (isPlaying) {
                    this.audio.pause()
                    this.cover.style['animation-play-state'] = 'paused'
                    isPlaying = !isPlaying
                } else {
                    this.playing()
                    isPlaying = !isPlaying
                }
            })
        }

    }
    controller.init(view, model)

}