$('[hero-animation]').on('tap', function(e){
	var element= $(this);
	setTimeout(function(){
		element.parent().siblings().css("transition","opacity 200ms cubic-bezier(0.420, 0.000, 0.580, 1.000)");
		element.parent().siblings().css("opacity","0.3");		
	},1);

	var offset = element.offset();

	var $overlay= $('<div/>').attr("fit",".").css({
		"-webkit-transition":"-webkit-transform 200ms ease-in",
		"transition":"transform 200ms ease-in"
	}).on('tap', function(){
		element.children().css("opacity","1");
		element.parent().parent().children().css("opacity","1");
		$overlay.remove();
	}).on('swipeLeft', function(){

		$overlay.css("-webkit-transform","translate(-100%,0)");
        $overlay.css("transform","translate(-100%,0)");

        element.children().css("opacity","1");
        element.parent().parent().children().css("opacity","1");
        setTimeout(function(){
        	//Enable scrolling on main content again.
            //$('#content').css("overflow","scroll");
            //$('#content').css("-webkit-overflow-scrolling", "touch");
            $overlay.remove();
        }, 200);		
	}).on('swipeRight', function(){
		$overlay.css("-webkit-transform","translate(100%,0)");
		$overlay.css("transform","translate(100%,0)");
		element.children().css("opacity","1");
		element.parent().parent().children().css("opacity","1");
        setTimeout(function(){
        	//Enable scrolling on main content again.
            //$('#content').css("overflow","scroll");
            //$('#content').css("-webkit-overflow-scrolling", "touch");                   
            $overlay.remove();
        }, 200);
	}).on('swipeUp', function(){
		$overlay.css("-webkit-transform","translate(0,-100%)");
		$overlay.css("transform","translate(0,-100%)");
        element.children().css("opacity","1");
        element.parent().parent().children().css("opacity","1");
        setTimeout(function(){
        	//Enable scrolling on main content again.
            //$('#content').css("overflow","scroll");
            //$('#content').css("-webkit-overflow-scrolling", "touch");                   
            $overlay.remove();

        }, 200);
	}).on('swipeDown', function(){
		$overlay.css("-webkit-transform","translate(0,100%)");
		$overlay.css("transform","translate(0,100%)");
        element.children().css("opacity","1");
        element.parent().parent().children().css("opacity","1");		
        setTimeout(function(){
        	//Enable scrolling on main content again.
            //$('#content').css("overflow","scroll");
            //$('#content').css("-webkit-overflow-scrolling", "touch");                   
            $overlay.remove();
        }, 200);
	});
	var container = $('<div/>');
	$overlay.append(container)

	
	$('body').append($overlay);
	
	animateInRow(offset.top-64,element.children(), container);

});
function animateInRow(top,items,parent,count){
	if (items.length == count || (top < 0 && count == -1)) {
		//items.last().css("box-shadow", "0 4px 2px -2px gray");

		return;
	};
	if (count == null) {
		if (top < 0){
			count = items.length - 1;
		}else{
			count = 0;
		}
	}
	//TODO if top is negative, then we need to reverse the order in which the items are animated.
	//that means, start with items.length and make counter go down.
	var percentSpeed = top / $(window).height();
	var animateTime = 300 * percentSpeed;
	if (animateTime < 100) animateTime = 100;
	setTimeout(function(){

		animateToTop(top,items.eq(count),parent);
		if (top < 0){
			count--;
		} else {
			count++;	
		}
		
		animateInRow(top,items,parent,count);
	},animateTime);
};
function animateToTop(relativePx, item,parent){
	var translateLeft = 0;
	var percentSpeed = relativePx / $(window).height();
	var animateTime = 700 * percentSpeed;
	if (animateTime < 200) animateTime = 200;



	var animatee = item.clone();

	translateLeft = (item.closest('[container]').width() - item.width()) / 2;
	if (item.offset().left > (item.closest('[container]').width() / 2)){
		translateLeft = translateLeft * -1;
	}
	animatee.offset(item.offset());
	animatee.css({
		"width": item.css("width"), 
		"position":"absolute",
		"background":"white",
		"-webkit-transition":"-webkit-transform " + animateTime + "ms ease-in",
		"transition":"transform " + animateTime + "ms ease-in"
	});
	
	if (item.attr("hidden")) {
		console.log('hidden element');
		item.removeAttr("hidden");
		animatee.css({"width": item.css("width")});
		relativePx =  $(window).height() - (item.offset().top - relativePx);
		animatee.offset({top: $(window).height(), left:item.offset().left})
		animatee.removeAttr("hidden");
		translateLeft = (item.closest('[container]').width() - item.width()) / 2;
		if (item.offset().left > (item.closest('[container]').width() / 2)){
			translateLeft = translateLeft * -1;
		}		
		item.attr("hidden","");
	}

	//item.css("opacity","0.3");

	
	console.log(animateTime);

	
	setTimeout(function(){
		parent.append(animatee);
	},1);
	
	
	setTimeout(function(){
		animatee.css({
			"-webkit-transform":"translate(" + translateLeft + "px," + relativePx * -1 + "px)",
			"transform":"translate(" + translateLeft + "px," + relativePx * -1 + "px)",
			"opacity":"1"
		});
		item.css("opacity","0.1");
	}, 150);
}