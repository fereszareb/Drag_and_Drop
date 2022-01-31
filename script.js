const fills = document.querySelectorAll(".fill")
const contents = document.querySelectorAll(".content");
var selector ;

for (const fill of fills){
    fill.addEventListener('dragstart',drapFillStart);
    fill.addEventListener('dragend',drapFillEnd);
}


for (const content of contents){
    content.addEventListener('dragover',dragover);
    content.addEventListener('dragenter',dragenter);
    content.addEventListener('dragleave',dragleave);
    content.addEventListener('drop',drop);
}




function drapFillStart(){
    this.className += ' border';
    selector = this ;
    setTimeout(()=> this.className += ' displaynone')
}

function drapFillEnd(){
    this.className = 'fill'
}



function dragover(e){
    e.preventDefault();
}
function dragenter(e){
    e.preventDefault();

    this.className += ' enter';
}
function dragleave(){
    this.className = 'content';
}
function drop(){
    this.className = 'content';
    this.append(selector);
}

let video=null;
let canvas=null;
let context= null;
function start(){
    canvas=document.getElementById("canvaCamera");
    context = canvas.getContext("2d")
    canvas.hight= window.innerHeight;
    canvas.width= window.innerWidth;
    let promise=navigator.mediaDevices.getUserMedia({video:true});
    promise.then(function(signal){
        video = document.createElement("video");
        video.srcObject=signal;
        video.play();
        video.onloadeddata=function(){
            updateCanavas();
        }
    }).catch(function(e){
        alert("camera not working");
    })
}

function updateCanavas(){
    context.drawImage(video,0,0);
    window.requestAnimationFrame(updateCanavas);
}