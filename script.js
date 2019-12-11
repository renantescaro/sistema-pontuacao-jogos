var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 450 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var atirar = false;
var velocidade = 10;
var alvo;
var bolinha;
var player;
var cursors;
var esquerda = false;

function preload(){

    this.load.image('alvo', 'assets/alvo.png');
    this.load.image('bolinha', 'assets/bolinha.png');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 49, frameHeight: 137 });
}

function create(){

    // alvo = this.add.image(400, 100, 'alvo');
    // bolinha = this.add.image(400, 500, 'bolinha')

    alvo = this.physics.add.staticGroup();
    bolinha = this.physics.add.staticGroup();

    alvo.create(400,  100, 'alvo');
    bolinha.create(400, 500, 'bolinha');

    player = this.add.image(400,  500, 'player');

    this.physics.add.overlap(bolinha, alvo, acertouAlvo, null, this);

    cursors = this.input.keyboard.createCursorKeys();
}

function update(){

    if (cursors.space.isDown){

        atirar = true;
    }

    if(atirar == true){
        
        bolinha.y -= 10;
    }

    if(bolinha.y <= 0){

        bolinha.y = 500;
        atirar = false;
    }

    if(alvo.x >= 790){

        esquerda = true;
        velocidade = gerarVelocidade();

    }else if(alvo.x <= 10){

        esquerda = false;
        velocidade = gerarVelocidade();
    }

    /*
    if(alvo.x == bolinha.x && alvo.y == bolinha.y){

        acertouAlvo();
    }
    */

    if(esquerda == true){

        alvo.x -= velocidade;
    }else{
        alvo.x += velocidade;
    }
}

function acertouAlvo(){

    console.log('teste');
}

function gerarVelocidade(){

    return Math.floor(Math.random() * 30 + 10);
}