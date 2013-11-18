
 $(document).ready(function() {
	 
	$(".sticky_nav").slideUp("slow");

	$(window).scroll(function() {
		
		var downscroll = false;
		 
		if($(window).scrollTop() >= 60) {
			
			$(".sticky_nav").slideDown("slow")
			$(".sticky_nav").addClass("sticky");

		}else {

			$(".sticky_nav").slideUp("slow");
			/*$(".sticky_nav").removeClass("sticky");*/

		}
	});

});


