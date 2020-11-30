
function _(elem)
{
    return document.getElementById(elem);
}

var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L','M','M','N','N','O','O','P','P','Q','Q','R','R'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;

var sound = new Audio();

Array.prototype.memory_tile_shuffle = function () {
    var i = this.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function flipTile( tile, val )
{

    if (tile.innerHTML == "" && memory_values.length < 2) {

        sound.src = 'sfx/click.mp3';
        sound.play();
        
        tile.style.background = '#fff';
        tile.innerHTML = val;

        if ( memory_values.length == 0 ) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        }
        else if ( memory_values.length == 1 ) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            if ( memory_values[0] == memory_values[1] ) {
                tiles_flipped += 2;
                memory_values = []; //reset
                memory_tile_ids = [];

                sound.src = 'sfx/correct.mp3';
                sound.play();

                if (tiles_flipped == memory_array.length) {
                    // Applause Sound
                    sound.src = 'sfx/applause.mp3';
                    sound.play();

                    alert("Good Job! Start new game?")
                    _('gameboard').innerHTML = '';
                    newBoard();
                }

            }
            else {
                setTimeout(function () { 
                    sound.src = 'sfx/wrong.mp3';
                    sound.play();
                    var tile_1 = _(memory_tile_ids[0]);
                    var tile_2 = _(memory_tile_ids[1]);
                    tile_1.style.background = 'green';
                    tile_1.innerHTML = '';
                    tile_2.style.background = 'green';
                    tile_2.innerHTML = '';
                    memory_values = [];
                    memory_tile_ids = [];
                }, 700);
            }
        }

    }

}

function newBoard()
{
    tiles_flipped = 0;
    var output = '';
    memory_array.memory_tile_shuffle();
    for (var i = 0; i < memory_array.length; i++ ) {
        output += '<div id="tile_'+i+'" onclick="flipTile(this, \''+memory_array[i]+'\')" ></div>';
    }
    _('gameboard').innerHTML = output;
}

