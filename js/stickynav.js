
 $(document).ready(function() {

	$(window).scroll(function() {
		 
		if($(window).scrollTop() >= 60) {
			
			$(".sticky_nav").slideDown("slow");
			$(".sticky_nav").addClass("sticky");

		}else {

			$(".sticky_nav").slideUp("slow");
			/*$(".sticky_nav").removeClass("sticky");*/

		}
	});

});


