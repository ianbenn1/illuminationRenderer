let MAZEX = 0;
let MAZEY = 0;
let ENDPOINTX = 0;
let ENDPOINTY = 0;
let STARTTIME = 0;
let TOTAL_RENDER_TIME = 0;
let mazecells = document.getElementsByClassName("maze-block");

const dimmingSteps = 4;//VARIABLE
const lightSources = [];
const shadowZones = [];

document.getElementById('build').onclick = () => {
    let x = document.getElementById('maze-height').value;
    let y = document.getElementById('maze-width').value;
    MAZEX = x;
    MAZEY = y;
    console.log(`X:${x} Y:${y}`);
    mazeBuilder(x, y);
    [].forEach.call(mazecells, (el) => {
        el.onclick = (e) => {
            let clickMode = document.getElementById('lightrb').checked;
            if(clickMode) {
                console.log('clicked cell, current insert mode is light');
                e.target.dataset.taken = "true";
                lightSources.push(e.target.className)
                e.target.className = e.target.className + " light-cell";
            } else {
                console.log('clicked cell, current insert mode is wall');
                e.target.dataset.taken = "true";
                e.target.className = e.target.className + " blocked-cell"; 
            }
            
        };
    });
};

document.getElementById('lightOn').onclick = () => {
    
    dimmingSteps;//remember to make this variable

    lightSources.forEach(light => {
        console.log('light source: ' + light);
        let coords = light.substring(light.indexOf(' cell') + 5);
        let verticalCoord = coords.substring(0, coords.indexOf('-'));
        let horizontalCoord = coords.substring(coords.indexOf('-')+1);
        console.log(verticalCoord + ' ' + horizontalCoord);

        for (let i = dimmingSteps; i >= 1; i--) {

            for(let j = Number(verticalCoord)-Number(i); j <= Number(verticalCoord)+Number(i); j++) {
                for(let k = Number(horizontalCoord)-Number(i); k <= Number(horizontalCoord)+Number(i); k++) {

                    if(document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className.indexOf('light-cell') >= 0) {
                        continue;
                    }
                    if(document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className.indexOf('blocked-cell') >= 0) {
                        shadowZones.push(`maze-block cell${j}-${k}`);
                        for(let q = )
                    }

                    if(document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className.indexOf('dimmness') >= 0) {
                        console.log('replacing dimmness on ' + j + '-' + k);
                        //replace dimmness
                        document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className = 
                            document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className.substring(
                                0, document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className.indexOf('dimmness')+8) + i;
                    } else {
                        console.log('adding initial dimmness on ' + j + '-' + k);
                        document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className += (' dimmness' + i);
                        document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].dataset.taken = true;
                    }
                }

            }
        }

    });
    
};



async function mazeBuilder(x, y) {
    let field = document.getElementsByClassName('field')[0];
    field.innerHTML = "";
    for(let i = 0; i < x; i++)
    {
        //console.log("Creating row " + i);
        let rowElement = document.createElement("div");
        rowElement.className = "maze-line line" + i;
        field.appendChild(rowElement);
        let row = document.getElementsByClassName('line' + i)[0];

        for(let j = 0; j < y; j++)
        {
            //console.log("Creating cell " + j + " in row " + i);
            let cell = document.createElement("div");
            if(i == 0 && j == 0)
            {
                //First Cell
                //cell.className = "maze-block starting-cell cell" + i + "-" + j;
                //cell.dataset.taken = "true";
            }
            else if (i == (x-1) && j == (y-1))
            {
                //last cell
                //cell.className = "maze-block ending-cell cell" + i + "-" + j;
                //cell.dataset.taken = "true";
                ENDPOINTX = i;
                ENDPOINTY = j;
            }
            //else {
                cell.className = "maze-block cell" + i + "-" + j;
                cell.dataset.taken = "false";
            //}
            row.appendChild(cell);
        }
    }
}




//Helper functions
async function sleep(ms) {
    await setTimeout(()=>{}, ms);
}

function getRandomInt(min, max) {
    let x = 1
    min = Math.ceil(min);
    max = Math.floor(max);
    if(max == 1) x = 200;
    return (Math.floor(Math.random() * (max - min + 1)) + min) * x;
}