var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points) {
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

window.onload = function() {
    //Automatically animate the points on a tall screen where scrolling can't trigger the animation.
    if (window.innerHeight > 950){
        animatePoints(pointsArray);
    }

    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

    window.addEventListener("scroll", function(event) {
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animatePoints(pointsArray);
        }
    });
}


/*"scaleX(1) translateY(0)"*/
