$(function () {
    var playerTrack = $("#player-track"),
        albumName = $('#album-name'),
        singerName = $('#singerName'),
        albumArt = $('#album-art'),
        sArea = $('#s-area'),
        seekBar = $('#seek-bar'),
        trackTime = $('#track-time'),
        insTime = $('#ins-time'),
        sHover = $('#s-hover'),
        playPreviousTrackButton = $('#play-previous'),
        playPauseButton = $("#play-pause-button"),
        playNextTrackButton = $('#play-next'),
        i = playPauseButton.find('i'),
        tProgress = $('#current-time'),
        tTime = $('#track-length'),
        curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
        tFlag = false,
        currIndex = -1,
        musicList = [
            { albums: '不是因为寂寞才想你', singerName: '1个球', coverUrl: 'imgs/1.jpg', trackUrl: 'audio/1.m4a' },
            { albums: '我的楼兰', singerName: '云朵', coverUrl: 'imgs/2.jpg', trackUrl: 'audio/2.m4a' },
            { albums: 'My Stupid Heart', singerName: 'Walk off the Earth / Luminati Suns', coverUrl: 'imgs/3.jpg', trackUrl: 'audio/3.m4a' },
            { albums: 'Diamond Cut Diamond', singerName: 'Worry Free Studios / Grimmmz / United Idol', coverUrl: 'imgs/4.jpg', trackUrl: 'audio/4.m4a' },
            { albums: 'How Do You Do', singerName: 'beFour', coverUrl: 'imgs/5.jpg', trackUrl: 'audio/5.m4a' },
            { albums: '猜', singerName: '顾峰 / 斯琴高丽', coverUrl: 'imgs/6.jpg', trackUrl: 'audio/6.m4a' }
        ]

    function playPause() {
        setTimeout(function () {
            if (audio.paused) {
                playerTrack.addClass('active')
                albumArt.addClass('active')
                i.attr('class', 'fas fa-pause')
                audio.play()
            } else {
                playerTrack.removeClass('active')
                albumArt.removeClass('active')
                i.attr('class', 'fas fa-play')
                audio.pause()
            }
        }, 0)
    }

    function updateCurrTime() {
        nTime = new Date()
        nTime = nTime.getTime()

        if (!tFlag) {
            tFlag = true
            trackTime.addClass('active')
        }

        curMinutes = Math.floor(audio.currentTime / 60)
        curSeconds = Math.floor(audio.currentTime - curMinutes * 60)

        durMinutes = Math.floor(audio.duration / 60)
        durSeconds = Math.floor(audio.duration - durMinutes * 60)

        playProgress = (audio.currentTime / audio.duration) * 100

        if (curMinutes < 10)
            curMinutes = '0' + curMinutes
        if (curSeconds < 10)
            curSeconds = '0' + curSeconds

        if (durMinutes < 10)
            durMinutes = '0' + durMinutes
        if (durSeconds < 10)
            durSeconds = '0' + durSeconds

        if (isNaN(curMinutes) || isNaN(curSeconds))
            tProgress.text('00:00')
        else
            tProgress.text(curMinutes + ':' + curSeconds)

        if (isNaN(durMinutes) || isNaN(durSeconds))
            tTime.text('00:00')
        else
            tTime.text(durMinutes + ':' + durSeconds)

        if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds))
            trackTime.removeClass('active')
        else
            trackTime.addClass('active')


        seekBar.width(playProgress + '%')

        if (playProgress == 100) {
            i.attr('class', 'fa fa-play')
            seekBar.width(0)
            tProgress.text('00:00')
        }
    }

    function selectTrack(flag) {
        if (flag == 0 || flag == 1)
            ++currIndex
        else
            --currIndex

        if (currIndex === musicList.length) {
            currIndex = 0
        }

        if (currIndex === -1) {
            currIndex = musicList.length - 1
        }

        if ((currIndex > -1) && (currIndex < musicList.length)) {
            if (flag == 0)
                i.attr('class', 'fa fa-play')
            else {
                i.attr('class', 'fa fa-pause')
            }

            seekBar.width(0)
            trackTime.removeClass('active')
            tProgress.text('00:00')
            tTime.text('00:00')

            const baseUrl = 'https://image-1258911198.cos.ap-guangzhou.myqcloud.com/cc-space/'

            audio.src = baseUrl + musicList[currIndex].trackUrl

            nTime = 0
            bTime = new Date()
            bTime = bTime.getTime()

            if (flag != 0) {
                audio.play()
                playerTrack.addClass('active')
                albumArt.addClass('active')
            }

            albumName.text(musicList[currIndex].albums)
            singerName.text(musicList[currIndex].singerName)
            albumArt.find('img').addClass('active').attr('src', baseUrl + musicList[currIndex].coverUrl)
        } else {
            if (flag == 0 || flag == 1)
                --currIndex
            else
                ++currIndex
        }
    }

    function initPlayer() {
        audio = new Audio()
        selectTrack(0)
        audio.loop = false
        $(audio).on('ended', () => selectTrack(1))
        playPauseButton.on('click', playPause)
        $(audio).on('timeupdate', updateCurrTime)
        playPreviousTrackButton.on('click', () => selectTrack(-1))
        playNextTrackButton.on('click', () => selectTrack(1))
    }

    initPlayer()
})