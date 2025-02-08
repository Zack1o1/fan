class Container extends Phaser.Scene{
    constructor(){
        super("Container");
    }
    preload(){
        this.load.image("fan", "./images/fan.png");
        this.load.svg("on", "./images/on.svg");
        this.load.svg("off", "./images/off.svg");
        this.load.audio("audio", "./audio/fan-sound.mp3");
    }
    getFontSize(){
        return Math.max(24, Math.min(window.innerWidth, window.innerHeight) * 0.08);
    }
    getScale(baseSize){
        return (Math.min(window.innerWidth, window.innerHeight) * 0.2) / baseSize ;
    }
    adjustForSmallScreens(img, scale){
        const MOBILE_THRESHOLD = 700;
        if (window.innerWidth < MOBILE_THRESHOLD && window.innerHeight < MOBILE_THRESHOLD) {
            img.setScale(scale);
        }
    }
 
    create(){
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const configFan = {
            x: centerX,
            y: centerY - 50,
            image: "fan",
            baseSize: 240,
        }
        this.audio = this.sound.add("audio", { loop: true, volume: 0 })
        this.fan = this.physics.add.image(configFan.x, configFan.y, configFan.image)
        .setScale(this.getScale(configFan.baseSize))
        .setAngularAcceleration(0)
        .setAngularDrag(20);
        this.adjustForSmallScreens(this.fan, 0.38);
        const configBtn = {
            x: centerX - 40,
            y: centerY + 250,
        }
        
        let onBtn = this.add.image(configBtn.x, configBtn.y, "on").setScale(this.getScale(90)).setInteractive()
        this.adjustForSmallScreens(onBtn, 1.5)
        let offBtn = this.add.image(configBtn.x + 80, configBtn.y, "off").setScale(this.getScale(90))
        this.adjustForSmallScreens(offBtn, 1.5)

        onBtn.on("pointerdown", ()=>{
            this.fan.setAngularAcceleration(50);
            this.audio.play()
            this.audio.setVolume(0.2);
            this.time.delayedCall(10000, ()=>{
                this.audio.setVolume(0.3);
            })
            this.audio.setDetune(-1500);
            onBtn.disableInteractive();
            offBtn.setInteractive();
        })
        offBtn.on("pointerdown", ()=>{
            this.fan.setAngularAcceleration(0);
            this.audio.setDetune(-1500);
            this.time.delayedCall(3000, ()=>{
                this.audio.setVolume(0.2);
                this.time.delayedCall(1000, ()=>{
                    this.audio.setVolume(0.1);
                    this.audio.stop()
                })
            })
            this.audio.setDetune(-1500);
            offBtn.disableInteractive();
            onBtn.setInteractive();
        })
    }


}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#c0c0c0",
    scene: [Container],
    physics: {
        default: 'arcade',
        arcade: { debug: false,}

    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        zoom: 1,  
    },
    autoRound: false
   
};

const game = new Phaser.Game(config);