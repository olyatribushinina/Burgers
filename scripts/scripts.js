const $hamburger = $(".js-open-menu");


$hamburger.on("click", function(e) {
	$(this).toggleClass(".js-open-menu--active");
	if ($hamburger.hasClass(".js-open-menu--active")) {
		$hamburger.fadeIn().addClass("fixed-menu--open");
		$("body").addClass("blocked-scroll");
	}else {
		$hamburger.fadeOut().removeClass.addClass("fixed-menu--open"); 
		$("body").removeClass("blocked-scroll");
	}
});


