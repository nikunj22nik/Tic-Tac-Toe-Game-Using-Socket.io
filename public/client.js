const socket=io();

const boxes=Array.from(document.getElementsByClassName('box'));
const spaces=[null,null,null,null,null,null,null,null,null];
console.log(boxes);
let count=0;

const O_TEXT="0";
const X_TEXT="X";
let currentPlayer=O_TEXT;

const drawBoard=()=>{
    boxes.forEach((box,index)=>{
     
  let styleString='';
  if(index<3){
      styleString+=`border-bottom:3px solid var(--purple);`

  }

  if(index%3==0){
      styleString+=`border-right:3px solid var(--purple);`
  }
  if(index>5){
      styleString+=`border-top:3px solid var(--purple);`
  } 

if(index%3==2){
    styleString+=`border-left:3px solid var(--purple);`
}

box.style=styleString;

box.addEventListener('click',boxclicked);
    })

}
drawBoard();

function boxclicked(e){

let id=e.target.id;
id-=1;

    socket.emit("turn",{
        player:currentPlayer,
        id

    })
}

socket.on("turnPut",(data)=>{
 currentPlayer=data.player;
puttingData(data.id)
})



socket.on("displayPlayer",(data)=>{
    document.getElementById('playText').innerText=`Player ${data.winner} has Won`;
})

function puttingData(id){

if(!spaces[id]){
    spaces[id]=currentPlayer;
    let idfind=id+1;
    document.getElementById(idfind).innerText=currentPlayer;
    
    if(playerHasWon()){
      
      socket.emit("wonPlayer",{
          winner:currentPlayer
      })
        return;
    }
  
    count++;
    if(count==9){
        socket.emit("draw");
    }
    
    if(currentPlayer==O_TEXT){
        currentPlayer=X_TEXT;

    }
    else{
        currentPlayer=O_TEXT;
    }


  

}
}

function playerHasWon(){
    if(spaces[0]==currentPlayer){

  if(spaces[1]==currentPlayer&&spaces[2]==currentPlayer){
    return true;
  }

  if(spaces[3]==currentPlayer&&spaces[6]==currentPlayer){
      return true;
  }
  if(spaces[4]==currentPlayer&&spaces[8]==currentPlayer){
      return true;
  }

}

else if(spaces[8]==currentPlayer){
    if(spaces[6]==currentPlayer&&spaces[7]==currentPlayer){
        return true;
      }
    if(spaces[2]==currentPlayer&&spaces[5]==currentPlayer){
        return true;
     }
 
    }

    else if(spaces[3]==currentPlayer){
        if(spaces[4]==currentPlayer&&spaces[5]==currentPlayer){
            return true;
        }
    }
else if(spaces[1]==currentPlayer){
    if(spaces[4]==currentPlayer&&spaces[7]==currentPlayer){
       
        return true;
    }
}
else if(spaces[2]==currentPlayer){
 
    if(spaces[4]==currentPlayer&&spaces[6]==currentPlayer){
        return true;
    }
}

return false;
}


//for reloading page
document.getElementById("restartBtn").addEventListener("click",()=>{
    socket.emit("restart");
    
})

socket.on("restartfun",()=>{
    location.reload();
})

//display draw

socket.on("drawdisplay",()=>{
    document.getElementById("playText").innerText="Match draw";
})