{

    let view = {
        el: document.querySelector('.lyric .lines'),
        template(line){
            let t = `<li>${line}</li>`
            return t
        },
        render(line){
            this.el.insertAdjacentElement('beforeend', this.template(line))
        }
    }
    let model = {
        lyrics: null,
        fetch(){
            window.eventHub.on('playing', data => {
                this.lyrics = data.lyrics
            })
        }
    }
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.model.fetch()
        } 
    }

}