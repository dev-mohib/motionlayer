

function getSupportedMimeTypes() {
    // const possibleTypes = [
    //   'video/webm;codecs=vp9,opus',
    //   'video/webm;codecs=vp8,opus',
    //   'video/webm;codecs=h264,opus',
    //   'video/mp4;codecs=h264,aac',
    // ];
    const possibleTypes = [
      "video/mp4",
      "video/quicktime",
      "video/3gpp",
      "video/h264"
    ]
    return possibleTypes.filter(mimeType => {
      return MediaRecorder.isTypeSupported(mimeType);
    });
  }



  function downloadCanvasRecording(recordedBlobs : Blob[]) {
    if(!recordedBlobs)
    return
    var blob = new Blob(recordedBlobs, {
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


  export {getSupportedMimeTypes, downloadCanvasRecording}