import { getSupportedMimeTypes } from './canvas'

let mediaRecorder : MediaRecorder, recordedBlobs : Blob[] | BlobPart[];

export const startRecorder = () => {
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

    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    return true
}

export const stopRecorder = () => {
    try {
        mediaRecorder.stop()
        // console.log("recorder stoped, blobs ", recordedBlobs)
        return recordedBlobs
    } catch (error) {
        console.error("Error while Stop recorder : " + error)
        return false
    }
}
export const sendPostRequest = (title : string, router : any) => { 
    const fileName = `video-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    const formData = new FormData()
    formData.append('title', title)
    formData.append('fileName', fileName)
   
    const file = new File(recordedBlobs, title + '.mp4')
    // console.log({blobs : blobs.size})
    
    formData.append('video', file)
    formData.append('blobs', `${recordedBlobs.toString()}`)
    formData.append('fileSize', file.size.toString()??'No size available')
    const values = formData.values.toString()
    // window.alert(`
    //   fileName => ${file.name}
    //   fileSize => ${file.size}, 
    //   `)
    router.post('/video', formData)

}
export const getRecordedBlob = () => {
    var blob = new Blob(recordedBlobs, {
        type: 'video/mp4',
        });
    return blob
}

function handleDataAvailable(event : BlobEvent) {
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}


export const downloadRecording = (title : any) =>{
    console.log({downloadTitle: title})
    if(recordedBlobs.length == 0){
        console.log("no blob chunks")
        return
    }
    var blob = new Blob(recordedBlobs, {
        type: 'video/mp4'
    });
  
    var url = URL.createObjectURL(blob);
    var a : any = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = `${title == ''?'canvas_recording': title}.mp4`;
    // const confirm = window.confirm("Do you really want to save the recording ? ")
    // if(confirm)
      a.click();
    window.URL.revokeObjectURL(url);
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
    stopRecorder()
    afterSave()
  }
}, 1000);

}

class MyMediaRecorder{
    mediaRecorder!: MediaRecorder;
    recorderBlobs : Blob[] | BlobPart[] = []

    initialize(){
        recordedBlobs = [];
        var mainCanvas : any = document.querySelector("#myCanvas");
        var stream = mainCanvas.captureStream(30)
        var options = {mimeType: getSupportedMimeTypes()[0]};
        try {
            this.mediaRecorder = new MediaRecorder(stream, options);
            console.log("recorder initialized")
        } catch (e) {
            console.error('Exception while creating MediaRecorder:', e);
        }

        this.mediaRecorder.ondataavailable = this.pushrecorderBlobs
        this.mediaRecorder.start();   
    }
    pushrecorderBlobs(event:BlobEvent){
        if (event.data && event.data.size > 0) {
            console.log("pushing blob chunk")
            this.recorderBlobs.push(event.data);
        }
    }
    
    start(){
        console.log("recorder started")
        // this.mediaRecorder.start();    
    }
    stop(){
        try {
            this.mediaRecorder.stop()
        } catch (error) {
            console.error("Error while Stop recorder : " + error)
        }
    }

    download(){
    if(this.recorderBlobs.length == 0){
        console.log("no blob chunks")
        return
    }
    var blob = new Blob(this.recorderBlobs, {
    type: 'video/mp4'
    });
  
    var url = URL.createObjectURL(blob);
    var a : any = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'canvas_recording.mp4';
    // const confirm = window.confirm("Do you really want to save the recording ? ")
    // if(confirm)
      a.click();
    window.URL.revokeObjectURL(url);
    }

}

export { recordedBlobs }
// export const myMediaRecorder = new MyMediaRecorder()
