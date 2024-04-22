import { fabric } from 'fabric'

// Left Right Animation
export const animateLeftRight = (arr = [], canvas, easeType = "easeInOutQuad", duration = 1000, deltaValue = 20, layers = [], isFirst = false) => {
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
      },
    });
  })
  
}

const _animateLeftRight = (arr, canvas, easeType = 'easeInOutQuad', duration = 1000, deltaValue = 20, layers = []) => {
  var temp = 10
  arr.map((i,j) => {
    if(!i.isAnimate){return;}

    temp += deltaValue
    i.animate('left', `-=${temp}`, {
      onChange: canvas.renderAll.bind(canvas),
      duration: duration,
      easing: fabric.util.ease[easeType],
      onComplete: function() {
        fabric.runningAnimations.cancelAll()
        animateLeftRight(arr, canvas, easeType, duration, deltaValue,layers)
      },
    });
    })
  }

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

export const animateOpacity = (arr, canvas, easeType = 'easeInOutQuad', duration = 1000, deltaValue = 20, layers = []) => {
  arr.map((i) => {
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
  arr.map((i) => {
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
  var radius = deltaValue
  var startAngle = fabric.util.getRandomInt(isClockWise ? -180 : 180, 0)
  var endAngle = isClockWise ? startAngle + 359 : startAngle - 359;
  
  function animate(_isFirst = false) {
    fabric.util.animate({
      startValue: startAngle,
      endValue: endAngle,
      duration: duration,
      easing: fabric.util.ease[easeType],
      onChange: function(angle) {
        angle = fabric.util.degreesToRadians(angle);
        var t = 0
        arr.map((a,j) => { 
          t += 10
          if(!a.isAnimate){return;}
          var x =  (radius + t) * Math.cos(angle);
          var y =  (radius + t) * Math.sin(angle);
          a.left = x + a.l
          a.top = y + a.t
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