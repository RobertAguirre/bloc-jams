var animatePoints = function() {
    var points = document.getElementsByClassName('point');

    var revealPoint = function(index){
      points[index].style.opacity = 1;
      points[index].style.transform = "rotateY(360deg)";
      points[index].style.msTransform = "rotateY(360deg)";
      points[index].style.WebkitTransform = "rotateY(360deg)";
      points[index].style.transitionDuration = "4s";
    };

    for (var i = 0; i < points.length; i++){
      revealPoint(i);
    }
};

animatePoints();


/*"scaleX(1) translateY(0)"*/
