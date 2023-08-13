import Swiper from 'swiper/bundle'
const imgUrls = [
    '/imgs/pic00.png',
    '/imgs/pic01.jpg',
    '/imgs/pic03.jpg',
    '/imgs/pic04.png',
    '/imgs/pic05.png',
    '/imgs/pic06.jpeg',
    '/imgs/pic07.png',
    '/imgs/pic08.jpg',
    '/imgs/pic09.jpeg',
    '/imgs/pic10.jpg'
]

const swiper = document.createElement('div')
swiper.className = 'swiper'
const swiperWrapper = document.createElement('div')
swiperWrapper.className = 'swiper-wrapper'

imgUrls.forEach(url => {
    const swiperSlide = document.createElement('div')
    swiperSlide.className = 'swiper-slide'
    const img = document.createElement('img')
    img.setAttribute('src', url)
    swiperSlide.appendChild(img)
    swiperWrapper.appendChild(swiperSlide)
})
swiper.appendChild(swiperWrapper)
document.getElementById('photoContainer').appendChild(swiper)

new Swiper('.swiper', {
    effect: 'flip',
    autoplay: true,
    direction: 'horizontal',
    loop: true,
    speed: 1000,
    preloadImages: true,
})