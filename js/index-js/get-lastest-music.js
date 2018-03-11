
{
    let view = {
        el: document.querySelector('section.lastestMusic')
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
            let query = new AV.Query('Playlist')
            return query.find()
        },
        songs: []
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.model.init()
            this.getSongs()
        },
        getSongs() {
            this.model.fetch().then(songs => {
                songs.forEach(song => {
                    let id = song.id
                    let { singer, songName, link, imgLink, lyrics } = song.attributes
                    let o = {id, singer, songName, link, imgLink, lyrics }
                    this.model.songs.push(o)
                })
                this.bindEventHub()
                this.view.el.querySelector('#lastestMusicLoading').remove()
            })
        },
        bindEventHub() {
            log(this.model.songs)
            window.eventHub.emit('gotSongs', this.model.songs)
        },

    }
    controller.init(view, model)

}