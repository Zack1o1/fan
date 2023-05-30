const on =document.getElementById('on')
const off = document.getElementById('off')
const img = document.getElementById('img')
const speed = document.getElementById('speed')

function turn_on_fan(){
    img.classList.add('fan')
    on.classList.add('green')
}
function turn_off_fan(){
    img.classList.remove('fan')
    on.classList.remove('green')
}

function speed_fan(){
    const user_value = speed.value
    img.style.animationDuration = user_value + 's'
}

on.addEventListener('click', turn_on_fan)
off.addEventListener('click', turn_off_fan)
speed.addEventListener('change', speed_fan)