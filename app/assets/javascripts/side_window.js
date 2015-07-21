$(document).on('ready page:load', function () {
  // Actions to do

	$(document).ready(function(){

		$("a.js-show-outline").click(function(){
			$paragraph = getCurrentViewingParagraph();
			showSideWindow($paragraph);
			var itemid = $(this).attr("data-itemid");
			showOutline(itemid);
		});
		$("a.js-close-side-window").click(function(){
			$paragraph = getCurrentViewingParagraph();
			hideSideWindow($paragraph);
		});
		$("a.js-minimize-side-window").click(function(){
			$paragraph = getCurrentViewingParagraph();
			minimizeSideWindow($paragraph);
		});
		$("a.js-maximize-side-window").click(function(){
			$paragraph = getCurrentViewingParagraph();
			maximizeSideWindow($paragraph);
		});
		$("a.js-show-paragraph-variants").click(function(){
			event.preventDefault();
			var itemid = $(this).attr("data-itemid");
			var pid = $(this).attr("data-pid");
			$paragraph = $("p#" + pid);
			showSideWindow($paragraph);
			showParagraphVariants(itemid, pid);
		});

	});
});

$(document).on("mouseover", ".lbp-side-window-variant", function(event){
			var lem_ref = $(this).attr("data-lem-ref");
			console.log(lem_ref);
			$(this).css({backgroundColor: "yellow"});
			$("span#" + lem_ref).css({backgroundColor: "yellow"});
		});
$(document).on("mouseout", ".lbp-side-window-variant", function(event){
			var lem_ref = $(this).attr("data-lem-ref");
			console.log(lem_ref);
			$(this).css({backgroundColor: "transparent"});
			$("span#" + lem_ref).css({backgroundColor: "transparent"});
		});


var scrollToParagraph = function(element){
	if (element.length > 0) {
	    $('html, body')
            .stop()
            .animate({
                scrollTop: element.offset().top - 100
            }, 1000);
   }

}

var getCurrentViewingParagraph = function(){
	var $paragraphs = $('p.plaoulparagraph');
	var viewerMidPoint = $(window).height()/2;
	console.log(viewerMidPoint);
	$paragraph = ($paragraphs.nearest({y: $(window).scrollTop() + viewerMidPoint, x: 0})); 
	console.log($paragraphs.nearest({y: $(window).scrollTop() + viewerMidPoint, x: 0}));
	return $paragraph;
}

var showSideWindow = function(element){
	
	$("div#lbp-text-body").animate({"width": "50%", "margin-left": "45%"}, function(){
		$("div#lbp-side-window").css("display", "block").promise().done(function(){
			$("div#lbp-side-window").animate({"width": "40%"}, scrollToParagraph(element));
		});
	});
	
};

var hideSideWindow = function(element){
	
	$("li#lbp-max-side-window").css("display", "none").promise().done(function(){
		$("li#lbp-min-side-window").css("display", "block").promise().done(function(){
			$("div#lbp-side-window").animate({"width": "0"}, function(){
				$("div#lbp-side-window").css("display", "none").promise().done(function(){
					$("div#lbp-text-body").css({"margin-left": "auto"}).promise().done(function(){
						$("div#lbp-text-body").css({"width": "60%"}).promise().done(scrollToParagraph(element));
					});
				});
			});
		});
	});
};

var minimizeSideWindow = function(element){
	
	$("li#lbp-max-side-window").css("display", "block").promise().done(function(){
		$("li#lbp-min-side-window").css("display", "none").promise().done(function(){
			$("div#lbp-side-window").animate({"width": "100px"}, function(){
				$("div#lbp-text-body").css({"margin-left": "auto"}).promise().done(function(){
					$("div#lbp-text-body").css({"width": "60%"}).promise().done(scrollToParagraph(element));	
				}); 
			}); 
		});
	});
};
var maximizeSideWindow = function(element){
	$("li#lbp-min-side-window").css("display", "block").promise().done(function(){
			$("li#lbp-max-side-window").css("display", "none").removeClass("js-maximize-side-window").promise().done(showSideWindow(element));	
		});
};

var showOutline = function(itemid){
	$("#lbp-side-window-container").load("/text/toc/" + itemid + " #lbp-toc-container", function( response, status, xhr) {
		console.log(status);
  	if ( status == "error" ) {
    	var msg = "<h3>Sorry but an outline for this text is not yet available.</h3>";
    	$("#lbp-side-window-container").html( msg);
    		console.log(xhr.status + " " + xhr.statusText);
    }	

	});
}

var showParagraphVariants = function(itemid, pid){
	$("#lbp-side-window-container").load("/paragraphs/variants/" + itemid + "/" + pid + "#lbp-" + pid + "-variant-list", function( response, status, xhr) {
		console.log(status);
  	if ( status == "error" ) {
    	var msg = "<h3>Sorry, but there are no variants for this paragraph.</h3>";
    	$("#lbp-side-window-container").html( msg);
    		console.log(xhr.status + " " + xhr.statusText);
    }	
	});
}
