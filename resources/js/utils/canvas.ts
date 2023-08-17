

function getSupportedMimeTypes() {
    const possibleTypes = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/mp4;codecs=h264,aac',
    ];
    return possibleTypes.filter(mimeType => {
      return MediaRecorder.isTypeSupported(mimeType);
    });
  }



  function downloadCanvas(recordedBlobs : any) {
    console.log("Data to download", recordedBlobs)
    var blob = new Blob(recordedBlobs, {
    type: 'video/mp4'
    });
  
    var url = URL.createObjectURL(blob);
    var a : any = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'canvas_recording.mp4';
    const confirm = window.confirm("Do you really want to save the recording ? ")
    if(confirm)
      a.click();
    window.URL.revokeObjectURL(url);
  }


  export {getSupportedMimeTypes, downloadCanvas}