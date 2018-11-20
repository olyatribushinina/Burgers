const $hamburger = $(".js-open-menu");
const $fixedMenu = $(".js-fixed-menu")

$hamburger.on("click", function() {
	$(this).toggleClass("js-open-menu--active");
	if ($hamburger.hasClass("js-open-menu--active")) {
		$fixedMenu.fadeIn().addClass("fixed-menu--open");
		$("body").addClass("blocked-scroll");
	}else {
		$fixedMenu.fadeOut().removeClass("js-fixed-menu--open"); 
		$("body").removeClass("blocked-scroll");
	}
});


