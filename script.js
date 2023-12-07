//DATA
let square = {
    a1:'',b1:'',c1:'',
    a2:'',b2:'',c2:'',
    a3:'',b3:'',c3:''
}

let playing = false;
let player = 'X';

//ARROW FUNCTIONS
const qS = (el) => document.querySelector(el)
const qSA = (el) => document.querySelectorAll(el)


const startReset = () => {
    playing = true;
    clearSquare();
    renderSquare();

}

const itemClick = (item) => {
    let itemClicked = item.target.getAttribute('data-item');
    if(playing){
        square[itemClicked] = player;
        renderSquare();
    }
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