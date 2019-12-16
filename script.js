var config = {
    type: Phaser.AUTO,
    width: window.innerWidth-10,
    height: window.innerHeight-20,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
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
var esquerda = false;
var score = 0;
var velocidade = 10;
var alvo;
var bolinha;
var cursors;
var player;
var scoreText;
var tempo = 30;
var tempoText;

function preload(){

    this.load.image('alvo', 'assets/alvo.png');
    this.load.image('bolinha', 'assets/bolinha.png');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 49, frameHeight: 137 });
}

function create(){

    // colisão entre imagens
    alvo = this.physics.add.image((window.innerWidth2), 100, 'alvo');
    bolinha = this.physics.add.image((window.innerWidth/2), 500, 'bolinha');
    player = this.add.image((window.innerWidth/2), 500, 'player');

    alvo.setCollideWorldBounds(true);
    bolinha.setCollideWorldBounds(true);

    // overlap
    this.physics.add.overlap(alvo, bolinha, acertouAlvo, null, this);

    cursors = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(10, 10, 'Pontos: ' + score, { fontSize: '32px', fill: '#999' });
    tempoText = this.add.text(window.innerWidth-220, 10, 'Tempo: ' + tempo, { fontSize: '32px', fill: '#999' });

    setInterval(function(){ 
        
        tempo--;

        tempoText.setText('Tempo: ' + tempo);

        if(tempo == 0){

            document.getElementById('tituloPontuacao').textContent += score + ' pontos!';

            document.getElementsByTagName('canvas')[0].style.display = 'none';

            document.getElementById('dvPontos').style.display = '';
        }

    }, 1000);
}

function update(){

    if (cursors.space.isDown){

        atirar = true;
    }

    if(atirar == true){
        
        bolinha.y -= 10;
    }

    if(bolinha.y <= 0){

        bolinha.y = 490;
        atirar = false;
    }

    if(alvo.x >= (window.innerWidth - 40)){

        esquerda = true;
        velocidade = gerarVelocidade();

    }else if(alvo.x <= 30){

        esquerda = false;
        velocidade = gerarVelocidade();
    }

    if(esquerda == true){

        alvo.x -= velocidade;
    }else{
        alvo.x += velocidade;
    }
}

function acertouAlvo(){

    score++;

    scoreText.setText('Pontos: ' + score);
}

function gerarVelocidade(){

    return Math.floor(Math.random() * 30 + 10);
}
