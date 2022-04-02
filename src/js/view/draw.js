function findHigh(arr){
    let high = 0;
    arr.forEach(val => {
        if(high < val) high = val;
    });

    return high;
}

function findLow(arr){
    let low = 100;
    arr.forEach(val => {
        if(val < low) low = val;
    });

    return low;
}

export function drawReport({wpmList, testTime}){
    const height = 70;
    let pointHeights = [];
    let high = findHigh(wpmList);
    let low = findLow(wpmList);
    let mid = Math.round((high + low) / 2);
    let topMid = Math.round((high + mid) / 2);
    let lowMid = Math.round((low + mid) / 2);

    wpmList.forEach(value => {
        let length = high - low;
        let unitValue = height / length;
        let point = (value - low) * unitValue;
        pointHeights.push(height - point);
    });
    
    console.log(pointHeights);

    let canvas = document.getElementById("log");
    var ctx = canvas.getContext("2d");
    if($('body').hasClass('dark'))ctx.strokeStyle = '#505050';
    else ctx.strokeStyle = '#a0a0a0';

    ctx.moveTo(30, 15);
    ctx.lineTo(500, 15);
    ctx.stroke();

    ctx.moveTo(30, 32.5);
    ctx.lineTo(500, 32.5);
    ctx.stroke();

    ctx.moveTo(30, 50);
    ctx.lineTo(500, 50);
    ctx.stroke();

    ctx.moveTo(30, 67.5);
    ctx.lineTo(500, 67.5);
    ctx.stroke();

    ctx.moveTo(30, 85);
    ctx.lineTo(500, 85);
    ctx.stroke();

    let pointGapRate = Math.round(420/(testTime / 2 - 1));
    for(let i = 0; i < wpmList.length; i++){
        ctx.moveTo(50 + i * pointGapRate, 5);
        ctx.lineTo(50 + i* pointGapRate, 95);
        ctx.stroke();
    }

    
    for(let i = 0; i < wpmList.length; i++){
        ctx.fillText(`${high}`, 10, 15 + 5);
        ctx.fillText(`${topMid}`, 10, 32.5 + 5);
        ctx.fillText(`${mid}`, 10, 50 + 5);
        ctx.fillText(`${lowMid}`, 10, 67.5 + 5);
        ctx.fillText(`${low}`, 10, 85 + 5);

        ctx.font = "12px Arial";

        ctx.beginPath();
        if($('body').hasClass('dark')) ctx.fillStyle = '#05C3DD';
        else ctx.fillStyle = '#FCF55F';
        ctx.arc(i * pointGapRate + 50, pointHeights[i] + 10, 3, 0, 2 * Math.PI, false);

        ctx.lineWidth = 2;
        ctx.lineTo((i+1) * pointGapRate + 50, pointHeights[i + 1] + 10);
        if($('body').hasClass('dark')) ctx.strokeStyle = '#05C3DD';
        else ctx.strokeStyle = '#FCF55F';

        ctx.stroke();
        ctx.fill();
    }
}

export default { drawReport };
