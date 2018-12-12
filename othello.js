var board = [];
var turn = "white";
var rows = 8;
var columns = 8;

window.onload = function(){ 
	var boardElem = document.getElementById('board');
	boardElem.addEventListener("click", makeMove, false);
	makeBoard();
};


function index(r,c){ // elementin tahta üzerindeki indexini bulur
	if (r<1)
		return null;
	if (c<1)
		return null;
	var arrayIndex = (r-1)*columns+c-1;
	return arrayIndex;
}

function getRowColFromIndex(index){
	var row = Math.ceil((index+1)/rows);
	var col = (index+1)%columns;
	if (col == 0)
		col = 8;
	return [row, col];
}


function getOtherPlayer(){
	if (turn == 'white')
		return 'black';
	else 
		return 'white';
}

function makeBoard(){
	for (var i=1; i<=rows; i++){
		$('tbody').append('<tr></tr>');
		for (var j=1; j<=columns; j++){
			board[index(i,j)] = null;
			$('tbody tr:nth-child('+i+')').append('<td><div class="square"></div></td>');
		}
	}
    
	board[index(4,4)]='w';
	board[index(4,5)]='b';
	board[index(5,4)]='b';
	board[index(5,5)]='w';

	$('#turn-text').text('Turn: '+turn);
    	updateBoard();
	return 0;
}

function updateBoard(){
	for (var i=1; i<=rows; i++){
		for (var j=1; j<=columns; j++){
			if (board[index(i,j)]=="b"){
				$('tbody tr:nth-child('+i+') :nth-child('+j+') :nth-child(1)').html('<div class="black piece"></div>');
			}
			if (board[index(i,j)]=="w"){
				$('tbody tr:nth-child('+i+') :nth-child('+j+') :nth-child(1)').html('<div class="white piece"></div>');
			}
		}
	}
	return 0;
}


function makeMove(e){
    var x = e.clientX;
    var y = e.clientY;
    var validMove = false;

    var elementClicked = document.elementFromPoint(x, y);
    var index = $('.square').index(elementClicked);

    var square = getRowColFromIndex(index);
    var row = square[0];
    var col = square[1];

    if (board[index]!= null){
    }
    else{

    	if (isValid(row,col))
    		validMove = true;
    	
        
    	//if (validMove){
    		board[index]=turn;
    		updateBoard();
    		turn = getOtherPlayer();
    		$('#turn-text').text('Turn: '+turn);
    	//}
    	//else{
    	//	alert('Invalid move!')
    	//}
        
        
    }
}
function isValid(row, col){
    
}

function reset(){
    makeBoard();
}

