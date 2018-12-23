var turn;
var elements = [];
var board = [];

window.onload = function(){
    makeBoard();
    document.getElementById("reset").onclick = function(){
        makeBoard();
    }
}
    
    
function makeBoard(){
   turn = 2;
   elements = [
       document.getElementById("empty"),
       document.getElementById("black"),
       document.getElementById("white")
   ];
		
    for(var i = 0; i < 10; i++){ //matrisin tamamına 0 atar
		board[i] = [];
        for(var j = 0; j < 10; j++){
				board[i][j] = 0;
			}
    }
		
    //baslangicta olacak taslar atanır
	board[4][5] = 1;
    board[5][4] = 1;
	board[4][4] = 2;
	board[5][5] = 2;
    
    //empty black ve white göre board oluşturulur 
    var b = document.getElementById("board"); 
    for(var y = 1; y <= 8; y++){
			for(var x = 1; x <= 8; x++){
				var c = elements[board[x][y]].cloneNode(true);
				b.appendChild(c);
			}
		}
	//sıranın kimde olduğunu gösterecek mesaj oluşturulur. İlk sıra her zaman beyazdan başlar.
    text= "White's move";
    document.getElementById("text").innerHTML = text;
	updateBoard();

}

function updateBoard(){
    var b = document.getElementById("board"); //olan boardun tekrar ekranda oluşmaması için kaldırılır
    while(b.firstChild){
			b.removeChild(b.firstChild);
    }
    
    for(var y = 1; y <= 8; y++){ //board oluşturulur
        for(var x = 1; x <= 8; x++){
            var node = elements[board[x][y]].cloneNode(true);
            b.appendChild(node);
                
            if(board[x][y] == 0){ //boarddaki index boşsa tıklanması durumunda hamle yapılır
					(function(){
						var x2 = x, y2 = y;
						node.onclick = function(){
							if(checkPiece(x2, y2, true)){
								makeMove();
							}
						}
					})();
                }
		}
    }

}
  
function changeTurn(){
	if (turn == 1)
		turn= 2;
	else 
		turn= 1;
}

    
function makeMove(){
	changeTurn(); //hamle yapilmaya baslandigi için önce oyun sırası değiştirilir
	var text;
    if(turn==1){ //ekrana oyun sırası aktarılır
        text="Black's move";
    }else{
        text="White's move";
    }
    
	for(var x = 1; x <= 8; x++){
		for(var y = 1; y <= 8; y++){
			if(board[x][y] == 0 && checkPiece(x, y, false)){ //hamle geçerliyse
				document.getElementById("text").innerHTML = text;
				updateBoard();
				return;
			}
		}
	}
    
    //oyuncunun oynayabilecek hamlesi yoksa oyuncu değişir
	changeTurn();
     
    if(turn==1){
        text += " pass</br> black's move";
    }else{
        text += " pass</br> white's move";
    }
    
    var blacks = 0;
	var whites = 0;
	for(var x = 1; x <= 8; x++){
		for(var y = 1; y <= 8; y++){
			if(board[x][y] == 0 && checkPiece(x, y, false)){
				document.getElementById("text").innerHTML = text;
				updateBoard();
				return;
				}else{                    //yapılabilecek hamle kalmadıysa siyah ve beyazlar hesaplanır
				    if(board[x][y] == 1){
					blacks++;
				}
				if(board[x][y] == 2){
					whites++;
				}
			}
		}
	}      
    checkGameOver(blacks,whites);
}

function checkGameOver(blacks,whites) {
	text = "Black: " + blacks + " - White: " + whites + "</br>";
    if (blacks < whites){
        text += "WHITE WON";
	}else if(blacks > whites){
        text += "BLACK WON";   
    }else{                  
        text += "DRAW";   
    }
    document.getElementById("text").innerHTML = text;
    updateBoard(); 
}

    
function checkPiece(x, y, flip){ //gelen taşın etrafındaki alanları kontrol eder siyahsa 2 beyazsa 1 döndürür
    var ret = 0;
	for(var dx = -1; dx <= 1; dx++){
		for(var dy = -1; dy <= 1; dy++){
			if(dx == 0 && dy == 0){
				continue;
			}
			var nx = x + dx, ny = y + dy, n = 0;
			while(board[nx][ny] == 3 - turn){
				n++;
				nx += dx;
				ny += dy;
			}
			if(n > 0 && board[nx][ny] == turn){
				ret += n;
				if(flip){
					nx = x + dx;
					ny = y + dy;
					while(board[nx][ny] == 3 - turn){
						board[nx][ny] = turn;
						nx += dx;
						ny += dy;
					}
					board[x][y] = turn;
				}
			}
		}
	}
	return ret;
    
}
    

    
    
	
