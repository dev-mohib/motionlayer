import { fabric } from 'fabric'

// Left Right Animation
export const animateLeftRight = (arr = [], canvas, easeType = "easeInOutQuad", duration = 1000, deltaValue = 20, layers = [], isFirst = false) => {
  const cw = canvas.getWidth() / 2
  var temp = 10
  
  arr.map((i, j) => {
    if(!i.isAnimate){return;}
    temp += deltaValue
    i.animate('left', `+=${isFirst ? temp / 2 : temp}`, {
      onChange: canvas.renderAll.bind(canvas),
      duration: duration,
      easing: fabric.util.ease[easeType],
      onComplete: function() {
        fabric.runningAnimations.cancelAll()
        _animateLeftRight(arr, canvas, easeType, duration, deltaValue,layers)
        // i.center()
      },
    });
  })
  
}

const _animateLeftRight = (arr, canvas, easeType = 'easeInOutQuad', duration = 1000, deltaValue = 20, layers = []) => {
  var temp = 10
  // const cw = canvas.width / 2
  arr.map((i,j) => {
    // if(!layers[j].animate){return;}
    if(!i.isAnimate){return;}

    temp += deltaValue
    i.animate('left', `-=${temp}`, {
      onChange: canvas.renderAll.bind(canvas),
      duration: duration,
      easing: fabric.util.ease[easeType],
      onComplete: function() {
        fabric.runningAnimations.cancelAll()
        animateLeftRight(arr, canvas, easeType, duration, deltaValue,layers)
        // i.center()
      },
    });
    })
  }

  // Top Bottom Animation
export const animateTopBottom = (arr, canvas, easeType = 'easeInOutQuad', duration = 1000, deltaValue = 20, layers = [],isFirst = false) => {
  var temp = 10
  arr.map((i,j) => {
    if(!i.isAnimate){return;}
    temp += deltaValue
    i.animate('top', `-=${isFirst ? temp / 2 : temp}`, {
      onChange: canvas.renderAll.bind(canvas),
      duration: duration,
      easing: fabric.util.ease[easeType],
      onComplete: function() {
        fabric.runningAnimations.cancelAll()
        _animateTopBottom(arr, canvas, easeType, duration, deltaValue,layers)
      },
    });
  })
}
const _animateTopBottom = (arr, canvas, easeType = 'easeInOutQuad', duration = 1000, deltaValue = 20, layers = []) => {
  var temp = 10
  arr.map((i,j) => {
    if(!i.isAnimate){return;}
    temp += deltaValue
    i.animate('top', `+=${temp}`, {
      onChange: canvas.renderAll.bind(canvas),
      duration: duration,
      easing: fabric.util.ease[easeType],
      onComplete: function() {
        fabric.runningAnimations.cancelAll()
        animateTopBottom(arr, canvas, easeType, duration, deltaValue,layers)
      },
    });
  })
  
}



// Opacity Animation
export const animateOpacity = (arr, canvas, easeType = 'easeInOutQuad', duration = 1000, deltaValue = 20, layers = []) => {
  arr.map((i,j) => {
    if(!i.isAnimate){return;}

    i.animate('opacity', '0', {
      onChange: canvas.renderAll.bind(canvas),
      duration: duration,
      easing: fabric.util.ease[easeType],
      onComplete: function() {
        fabric.runningAnimations.cancelAll()
        _animateOpacity(arr, canvas, easeType, duration, deltaValue,layers)
      },
    });
  })
}
const _animateOpacity = (arr, canvas, easeType = 'easeInOutQuad', duration = 1000, deltaValue = 20, layers = []) => {
  arr.map((i,j) => {
    if(!i.isAnimate){return;}
    i.animate('opacity', '1', {
      onChange: canvas.renderAll.bind(canvas),
      duration: duration,
      easing: fabric.util.ease[easeType],
      onComplete: function() {
        fabric.runningAnimations.cancelAll()
        animateOpacity(arr, canvas, easeType,1000,20,layers)
      },
    });
  })
  
}

export const animateCircle = (arr, canvas, easeType = "easeInOutQuad", duration = 1000, deltaValue = 20, layers=[], isClockWise = true) => {
  const cx = canvas.getWidth()/2
  const cy = canvas.getHeight()/2
  var radius = deltaValue
  var startAngle = fabric.util.getRandomInt(isClockWise ? -180 : 180, 0)
  var endAngle = isClockWise ? startAngle + 359 : startAngle - 359;
  
  function animate(_isFirst = false) {
    // arr[0].set({ left : cx - (arr[0].width/2), top : cy - (arr[0].height/2)}).setCoords()

    fabric.util.animate({
      startValue: startAngle,
      endValue: endAngle,
      duration: duration,
      easing: fabric.util.ease[easeType],//function(t, b, c, d) { return c*t/d + b; },
      onChange: function(angle) {
        angle = fabric.util.degreesToRadians(angle);
        var t = 0
        var left,top
        arr.map((a,j) => { 
          t += 10
          if(!a.isAnimate){return;}

          var x =  (radius + t) * Math.cos(angle);
          var y =  (radius + t) * Math.sin(angle);
          // left = x
          // top = y
          // a.set({ left, top}).setCoords()
          a.left = x + a.iw
          a.top = y + a.ih
        })
          canvas.renderAll();
      },
      onComplete: () =>  {animate(false)}
    });
  }
  animate(true)
}


export const getObjectById = (canvas, id) => {
return canvas.forEachObject(obj => {
    if(obj.layerId == id)
        return obj
  })
}