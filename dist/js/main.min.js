document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.article-video__iframe').forEach(el => {
        if (document.documentElement.clientWidth >= 768) {
            el.style.backgroundImage = `url('http://i.ytimg.com/vi/${el.id}/hqdefault.jpg')`;
            el.addEventListener('click', () => {
                el.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${el.id}?autoplay=1" ></iframe>`
            })
        } else {
            el.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${el.id}?autoplay=1" ></iframe>`
        }
    })
});