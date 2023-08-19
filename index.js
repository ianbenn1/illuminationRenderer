let MAZEX = 0;
let MAZEY = 0;
let ENDPOINTX = 0;
let ENDPOINTY = 0;
let STARTTIME = 0;
let TOTAL_RENDER_TIME = 0;
let mazecells = document.getElementsByClassName("maze-block");

const dimmingSteps = 3;//VARIABLE
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
                shadowZones.push(e.target.className);
                e.target.className = e.target.className + " blocked-cell"; 
            }
            
        };
    });
};

document.getElementById('lightOn').onclick = () => {
    
    dimmingSteps;//remember to make this variable

    //Find all walls/blocked cells and generate shadow zones for them [TODO!: fix shadows so they only affect the light they're drawn from]
    lightSources.forEach(light => {
        console.log("For each shadow in relation to each light source")
        let coords = light.substring(light.indexOf(' cell') + 5);
        let lightVerticalCoord = coords.substring(0, coords.indexOf('-'));
        let lightHorizontalCoord = coords.substring(coords.indexOf('-')+1);

        shadowZones.forEach(wall => {
            console.log("For each wall:");
            let shadCoords = wall.substring(wall.indexOf(' cell') + 5);
            let shadVerticalCoord = shadCoords.substring(0, shadCoords.indexOf('-'));
            let shadHorizontalCoord = shadCoords.substring(shadCoords.indexOf('-')+1);

            if(Number(shadVerticalCoord) > Number(lightVerticalCoord)) {
                console.log('shad1');
                console.log(`shadVert: ${shadVerticalCoord}  lightVert: ${lightVerticalCoord}`);
                if(Number(shadHorizontalCoord) == Number(lightHorizontalCoord)) {
                    for(let i = (Number(shadVerticalCoord)+1); i < MAZEX; i++) {
                        console.log(`gettin cell${i} ${shadHorizontalCoord}`);
                        document.getElementsByClassName(`maze-block cell${i}-${shadHorizontalCoord}`)[0].className += " shadow-cell";
                        document.getElementsByClassName(`maze-block cell${i}-${shadHorizontalCoord}`)[0].dataset.taken = "true";
                        console.log("adding shadow cell going straight up");
                    }
                } else if(Number(shadHorizontalCoord) > Number(lightHorizontalCoord)) {
                    //bottom right corner.
                    let i = (Number(shadVerticalCoord));
                    let j = (Number(shadHorizontalCoord));

                    if((Number(shadHorizontalCoord) - Number(lightHorizontalCoord)) > (Number(shadVerticalCoord) - Number(lightVerticalCoord))) {
                        j += 1;
                    } else {
                        i += 1;
                    }

                    let imax = ((Number(shadVerticalCoord) - Number(lightVerticalCoord)));
                    let jmax = (Number(shadHorizontalCoord) - Number(lightHorizontalCoord));
                    let icurrent = imax;
                    let jcurrent = jmax;
                    while(Number(i) < Number(MAZEY) && Number(j) < Number(MAZEX)) {
                        console.log(`doing i${i} j${j}`);
                        if(Number(jcurrent) > 0) {
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].className += " shadow-cell";
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].dataset.taken = "true";
                            j++;
                            jcurrent--;
                            if(Number(j) == Number(MAZEX)) {
                                console.log('now done');
                                break;
                            }
                        }
                        if (Number(icurrent) > 0) {
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].className += " shadow-cell";
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].dataset.taken = "true";
                            i++;
                            icurrent--;
                            if(Number(i) == Number(MAZEY)) {
                                console.log('now done 2');
                                break;
                            }
                        }
                        if(Number(icurrent) == 0 && Number(jcurrent) == 0) {
                            icurrent = imax;
                            jcurrent = jmax;
                        }
                    }
                } else if (Number(shadHorizontalCoord) < Number(lightHorizontalCoord)) {
                    //bottom left corner
                    console.log('findme');
                    let i = (Number(shadVerticalCoord));
                    let j = (Number(shadHorizontalCoord));

                    if((Number(lightHorizontalCoord) - Number(shadHorizontalCoord)) > (Number(shadVerticalCoord) - Number(lightVerticalCoord))) {
                        j -= 1;
                    } else {
                        i += 1;
                    }

                    let imax = ((Number(shadVerticalCoord) - Number(lightVerticalCoord)));
                    let jmax = ((Number(lightHorizontalCoord) - Number(shadHorizontalCoord)));
                    let icurrent = imax;
                    let jcurrent = jmax;
                    console.log(`mazey: ${MAZEY} mazeX: ${MAZEX}`)
                    while(Number(i) < Number(MAZEX) && Number(j) >= 0) {
                        console.log(`now on i${i} j${j}`);
                        if(Number(jcurrent) > 0) {
                            console.log(`doing j for cell${i}-${j}`);
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].className += " shadow-cell";
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].dataset.taken = "true";
                            j--;
                            jcurrent--;
                            if(Number(j) < 0) {
                                console.log('1 now done');
                                break;
                            }
                        }
                        if (Number(icurrent) > 0) {
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].className += " shadow-cell";
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].dataset.taken = "true";
                            i++;
                            icurrent--;
                            if(Number(i) == Number(MAZEY)) {
                                console.log('1 now done 2');
                                break;
                            }
                        }
                        if(Number(icurrent) == 0 && Number(jcurrent) == 0) {
                            icurrent = imax;
                            jcurrent = jmax;
                        }
                    }
                }
            } else if (Number(shadVerticalCoord) < Number(lightVerticalCoord)) {
                console.log('shad2');
                if(Number(shadHorizontalCoord) == Number(lightHorizontalCoord)) {
                    for(let i = (Number(shadVerticalCoord)-1); i >= 0; i--) {
                        document.getElementsByClassName(`maze-block cell${i}-${shadHorizontalCoord}`)[0].className += " shadow-cell";
                        document.getElementsByClassName(`maze-block cell${i}-${shadHorizontalCoord}`)[0].dataset.taken = "true";
                        
                        console.log("adding shadow cell going straight up");
                    }
                }

                else if(Number(shadHorizontalCoord) > Number(lightHorizontalCoord)) {
                    //top right corner.
                    console.log('top right corner?')
                    let i = (Number(shadVerticalCoord));
                    let j = (Number(shadHorizontalCoord));

                    if((Number(shadHorizontalCoord) - Number(lightHorizontalCoord)) > (Number(lightVerticalCoord) - Number(shadVerticalCoord))) {
                        j += 1;
                    } else {
                        i -= 1;
                    }

                    let imax = ((Number(lightVerticalCoord) - Number(shadVerticalCoord)));
                    let jmax = (Number(shadHorizontalCoord) - Number(lightHorizontalCoord));
                    let icurrent = imax;
                    let jcurrent = jmax;
                    while(Number(i) >= 0 && Number(j) < Number(MAZEX)) {
                        if(Number(jcurrent) > 0) {
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].className += " shadow-cell";
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].dataset.taken = "true";
                            j++;
                            jcurrent--;
                            if(Number(j) == Number(MAZEX)) {
                                console.log('now done');
                                break;
                            }
                        }
                        if (Number(icurrent) > 0) {
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].className += " shadow-cell";
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].dataset.taken = "true";
                            i--;
                            icurrent--;
                            if(Number(i) < 0) {
                                console.log('now done 2');
                                break;
                            }
                        }
                        if(Number(icurrent) == 0 && Number(jcurrent) == 0) {
                            icurrent = imax;
                            jcurrent = jmax;
                        }
                    }
                }

                else if(Number(shadHorizontalCoord) < Number(lightHorizontalCoord)) {
                    //top left corner.
                    console.log('top left corner?')
                    let i = (Number(shadVerticalCoord));
                    let j = (Number(shadHorizontalCoord));

                    if((Number(shadHorizontalCoord) - Number(lightHorizontalCoord)) > (Number(lightVerticalCoord) - Number(shadVerticalCoord))) {
                        j -= 1;
                    } else {
                        i -= 1;
                    }

                    let imax = ((Number(lightVerticalCoord) - Number(shadVerticalCoord)));
                    let jmax = (Number(lightHorizontalCoord) - Number(shadHorizontalCoord));
                    let icurrent = imax;
                    let jcurrent = jmax;
                    let escape = 0;
                    while(Number(i) >= 0 && Number(j) >= 0) {
                        console.log(`doing i${i} j${j}`);
                        if(Number(jcurrent) > 0) {
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].className += " shadow-cell";
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].dataset.taken = "true";
                            j--;
                            jcurrent--;
                            if(Number(j) < 0) {
                                console.log('now done');
                                break;
                            }
                        }
                        if (Number(icurrent) > 0) {
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].className += " shadow-cell";
                            document.getElementsByClassName(`maze-block cell${i}-${j}`)[0].dataset.taken = "true";
                            i--;
                            icurrent--;
                            if(Number(i) < 0) {
                                console.log('now done 2');
                                break;
                            }
                        }
                        if(Number(icurrent) == 0 && Number(jcurrent) == 0) {
                            icurrent = imax;
                            jcurrent = jmax;
                        }
                        escape++;
                        if (escape == 2000) {
                            alert('emergency anit-bork.');
                            break;
                        }
                    }
                }


            } else if (Number(shadVerticalCoord) == Number(lightVerticalCoord)) {
                console.log("shadow vertical is equal to light vertical");
                if(Number(shadHorizontalCoord) > Number(lightHorizontalCoord)) {
                    for(let i = (Number(shadHorizontalCoord)+1); i < MAZEX; i++) {
                        document.getElementsByClassName(`maze-block cell${shadVerticalCoord}-${i}`)[0].className += " shadow-cell";
                        document.getElementsByClassName(`maze-block cell${shadVerticalCoord}-${i}`)[0].dataset.taken = "true";
                        console.log("adding shadow cell going straight right");
                    }
                } else if (Number(shadHorizontalCoord) < Number(lightHorizontalCoord)) {
                    for(let i = (Number(shadHorizontalCoord)-1); i >= 0; i--) {
                        console.log(`setting: maze-block cell${shadVerticalCoord}-${i}`);
                        document.getElementsByClassName(`maze-block cell${shadVerticalCoord}-${i}`)[0].className += " shadow-cell";
                        document.getElementsByClassName(`maze-block cell${shadVerticalCoord}-${i}`)[0].dataset.taken = "true";
                        console.log("adding shaddow cell going straight left");
                    }
                }
            } else {
                alert("This shouldnt happen");
            }
        });

    });
    console.log("Done with shadows");
    lightSources.forEach(light => {
        console.log('light source: ' + light);
        let coords = light.substring(light.indexOf(' cell') + 5);
        let verticalCoord = coords.substring(0, coords.indexOf('-'));
        let horizontalCoord = coords.substring(coords.indexOf('-')+1);
        console.log(verticalCoord + ' ' + horizontalCoord);


        for (let i = dimmingSteps; i >= 1; i--) {
            //Maybe what I can do is instead of setting a dimmness value based on distance
            //I can just do a pass through for each cell, and do something like layers 3-1 get 1 dimmness marker, layers 2-1 get 1 dimmness marker, layer 1 gets one dimness marker
            //Then do the math on the cumulative amount of dimmness markers for colour.
            //This would mean that two intersecting light sources could add their dimmness values up regardless of source and get a more realistic spread
            //conditions: No value can be more 'bright' than source brigtness (ie dimmness 3?), so stop there/round down.

            for(let j = Number(verticalCoord)-Number(i); j <= Number(verticalCoord)+Number(i); j++) {
                for(let k = Number(horizontalCoord)-Number(i); k <= Number(horizontalCoord)+Number(i); k++) {

                    if( (j >= 0) && (j <= MAZEY) && (k >= 0) && (k <= MAZEX) &&
                        !(document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className.indexOf('light-cell') >= 0) &&
                        !(document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className.indexOf(' shadow-cell') >= 0) &&
                        !(document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className.indexOf(' blocked-cell') >= 0)) {
                    

                            if(document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className.indexOf('dimmness') >= 0) {
                                //replace dimmness
                                document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className = 
                                    document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className.substring(
                                        0, document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className.indexOf('dimmness')+8) + i;
                            } else {
                                document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].className += (' dimmness' + i);
                                document.getElementsByClassName(`maze-block cell${j}-${k}`)[0].dataset.taken = true;
                            }
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