//DATA
let square = {
    a1:'',b1:'',c1:'',
    a2:'',b2:'',c2:'',
    a3:'',b3:'',c3:''
}

let playing = false;

let player = Math.floor(Math.random()*2);

player = player == 0 ? 'X':'O';

let warning = '';


//ARROW FUNCTIONS 
const qS = (el) => document.querySelector(el)
const qSA = (el) => document.querySelectorAll(el)


const startReset = () => {
    playing = true;

    clearSquare();
    renderSquare();
    clearWarning();
    renderWarning();
}

const itemClick = (item) => {
    let itemClicked = item.target.getAttribute('data-item');
    if(playing && square[itemClicked]==''){
        square[itemClicked] = player;
        renderSquare();
        tooglePlayer();
        renderWarning();
        verifyWinner(player);
        
    }
}

const clearWarning = ()=>{
    qS('.warning').innerHTML = '';
}

const renderWarning = ()=>{
    qS('.warning').innerHTML = `É a vez de '${player}' jogar`
}

const tooglePlayer = ()=>{
    player = player == 'X' ? 'O':'X';
}

const clearSquare = ()=>{
    for(let key in square){
        square[key] = '';
    }
}

const renderSquare = ()=>{
    for(let key in square){
        qS(`div[data-item=${key}]`).innerHTML = square[key];
    }
}

const verifyWinner = (player) =>{
    if(verifyTo('X')){
        let champion = player == 'X'? 'O':'X'
        qS('.warning').innerHTML = `'${champion}' Venceu!`
        playing = false;
    }else if (verifyTo('O')){
        let champion = player == 'O'? 'X':'O'
        qS('.warning').innerHTML = `'${champion}' Venceu!`
        playing = false;
    }else if(verifyDraw()){
        console.log('empatou')
        qS('.warning').innerHTML = 'Empatou!'
    }
}

const verifyTo = (player)=>{
    let pos = [
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
    
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
    
        'a1,b2,c3',
        'c1,b2,a3'
    ]
    
    let arrayPos = [];
    
    for (let i in pos){
        arrayPos = pos[i].split(',')
        if(arrayPos.every((item) => square[item] == player)){
            return true;
        }
    }

}

const verifyDraw = ()=>{
    for(let key in square){
        if(square[key]==''){
            return false;
        }
    }
    return true;
}

//EVENTS
qS('.start').addEventListener('click',()=>{
    startReset();

    qS('.start').style.display = 'none';
    qS('.warning').style.display = 'flex';
    qS('.reset').style.display = 'flex';
    qSA('.box').forEach((item)=>{
        item.style.cursor = 'pointer';
    })
});

qS('.reset').addEventListener('click',startReset);

qSA('.box').forEach((item)=>{
    item.addEventListener('click',itemClick);
})


