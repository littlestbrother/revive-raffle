function getNames(json) {
    let playerList = [];
    json.forEach(element => {
        playerList.push(element.whatIsYourGamerTag);
    });
    return playerList
}

function pickName(playerList) {
    let int = Math.floor(Math.random() * playerList.length);
    return playerList[int];
}

function removeName(playerName, playerList) {
    let index = playerList.indexOf(playerName);
    if (index > -1) {
        playerList.splice(index, 1);
    }
    console.log(playerList);
    return playerName;
}

function createTimeInt(requestedTime, timeType) {
    let timeInt = null;
    requestedTime = parseInt(requestedTime);
    switch (timeType) {
        case 'hours':
            timeInt = requestedTime * 3600000;
            break;
        case 'minutes':
            timeInt = requestedTime * 60000;
            break;
        case 'seconds':
            timeInt = requestedTime * 1000;
            break;
        default:
            timeInt = 60000;
            break;
    }
    return timeInt;
}

$(document).ready(function () {
    let requestedTime = $('input#requested-time').val('1');
    let json = null;
    let playerList = [];
    let stopped = false;

    // convert button
    $('button#convert-button').click(function () {
        // data processing
        json = JSON.parse($('input#json-text').val());
        playerList = getNames(json);
        console.log(playerList);
        // ui
        $('p#remaining').html(`<em>${(playerList.toString()).replaceAll(',', ', ')}</em>`);
        $('div#convert').toggle();
        $('div#raffle').toggle();
    });

    //manual button
    $('button#pick-button').click(function () {
        let playerName = pickName(playerList);
        $('h1#picked-player').text(removeName(playerName, playerList));
        //ui
        $('p#remaining').html(`<em>${(playerList.toString()).replaceAll(',', ', ')}</em>`);
    });

    $('button#start-button').click(function () {
        stopped = false;
        let timeType = $('input[name="time"]:checked').val();
        let requestedTime = $('input#requested-time').val();
        let timeInt = createTimeInt(requestedTime, timeType);
        console.log(timeInt);
        autoPick();

        function autoPick() {
            if (playerList.length > 0 && stopped === false) {
                clock = setTimeout(function () {
                    let playerName = pickName(playerList);
                    console.log(removeName(playerName, playerList));
                    //ui
                    $('p#remaining').html(`<em>${(playerList.toString()).replaceAll(',', ', ')}</em>`);
                    $('h1#picked-player').text(removeName(playerName, playerList));
                    autoPick();
                }, timeInt);
            }
        }
    });

    $('button#stop-button').click(function(){
        //figure out clear time out!
        stopped = true;
    });
});