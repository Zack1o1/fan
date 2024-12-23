const on =document.getElementById('on')
const off = document.getElementById('off')
const img = document.getElementById('img')
const speed = document.getElementById('speed')
const audio = document.querySelector('audio')

let is_on = false
audio.volume = .2

function turn_on_fan(){
    is_on = true
    img.classList.add('fan')
    img.classList.remove('fan-paused')
    on.classList.add('green')
    audio.play()
}

function turn_off_fan(){
    is_on = false
    on.classList.remove('green')
    img.classList.replace('fan', 'fan-paused')
    audio.pause()
    audio.currentTime = 0
}

function speed_fan(){
    const user_value = parseInt(speed.value)
    const speedLevel = {
        1: '.7s',
        2: '.5s',
        3: '.1s'
    }
    img.style.animationDuration = speedLevel[user_value] || '.7s'
    const volumeLevel = {
        1: .2,
        2: .6,
        3: 1
    }
    audio.volume = volumeLevel[user_value] || .2

}

function is_on_fan(){
    if(is_on){
        if(Math.floor(audio.currentTime) === 9){
            audio.currentTime = 2
            console.log('reset time')
        }
    }  
}

setInterval(is_on_fan, 2000)


on.addEventListener('click', turn_on_fan)
off.addEventListener('click', turn_off_fan)
speed.addEventListener('change', speed_fan)
