{
    let view = {
        el: document.querySelector('ol#lastestMusic'),
        template(song){

            log(song)
            let { id, songName, singer } = song
            let t = `
                <li data-id=${id} class="clearfix">
                    <div class="songWrapper">
                        <div class="songName">${songName}</div>
                        <div>
                            <span class="sq"></span>
                            <span class="singer">${singer}</span>
                        </div>
                    </div>
                    <div class="playButton"></div>
                </li>
            `
            return t
        },
        render(song){
            this.el.insertAdjacentHTML('beforeend', this.template(song))
        }
    }

    let model = {}
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.bindEventHub()
            this.bindEvents()
        },
        bindEventHub(){
            window.eventHub.on('gotSongs', songs => {
                songs.forEach(song => {
                    this.view.render(song)
                })
            })
        },
        bindEvents(){
            this.view.el.addEventListener('click', e => {
                let target = e.target
                if(target.tagName === 'LI'){
                    window.location.href = `./song.html?song-id=${target.getAttribute('data-id')}`
                }
            })
        }
    }
    controller.init(view, model)
}