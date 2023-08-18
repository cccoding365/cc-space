import Swiper from 'swiper/bundle'
const imgUrls = [
    '/pic00.png',
    '/pic01.jpg',
    '/pic03.jpg',
    '/pic04.png',
    '/pic05.png',
    '/pic06.jpeg',
    '/pic07.png',
    '/pic08.jpg',
    '/pic09.jpeg',
    '/pic10.jpg'
]

const swiper = document.createElement('div')
swiper.className = 'swiper'
const swiperWrapper = document.createElement('div')
swiperWrapper.className = 'swiper-wrapper'

const baseUrl = 'https://image-1258911198.cos.ap-guangzhou.myqcloud.com/cc-space/imgs/'

imgUrls.forEach(url => {
    const swiperSlide = document.createElement('div')
    swiperSlide.className = 'swiper-slide'
    const img = document.createElement('img')
    img.setAttribute('src', baseUrl + url)
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
    // preloadImages: true,
})