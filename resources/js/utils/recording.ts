import { downloadCanvas, getSupportedMimeTypes } from './canvas'

let mediaRecorder : any, recordedBlobs : any;

export const startRecording = () => {
    recordedBlobs = [];
    var mainCanvas : any = document.querySelector("#myCanvas");

    var stream = mainCanvas.captureStream(30)
var options = {mimeType: getSupportedMimeTypes()[0]};
try {
    mediaRecorder = new MediaRecorder(stream, options);
} catch (e) {
    console.error('Exception while creating MediaRecorder:', e);
    return false;
}

mediaRecorder.onstop = (event : any) => {
    downloadCanvas(recordedBlobs)
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    return true
}

export function saveRecording(){
    try {
        mediaRecorder.stop()
    } catch (error) {
        console.error("Error while Stop recorder : " + error)
        return false
    }
    return true
}

function handleDataAvailable(event : any) {
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}


export function autoSave(saveIn = 1000, afterSave : any){
    var date = new Date().getTime() + saveIn
var x = setInterval(function() {
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = date - now;
    
  // Time calculations for days, hours, minutes and seconds
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  //@ts-ignore
  document.getElementById("demo").innerHTML = seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    // document.getElementById("demo").innerHTML = "EXPIRED";
    saveRecording()
    afterSave()
  }
}, 1000);

}