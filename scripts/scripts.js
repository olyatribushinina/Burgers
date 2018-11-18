const $hamburger = $(".js-open-menu");
const $fixedMenu = $(".js-fixed-menu");
const $closeMenu = $(".js-close-menu"); 


$hamburger.on("click", function() {
	$fixedMenu.fadeIn().addClass("fixed-menu--open");
	$("body").addClass("blocked-scroll");
});

$(".hamburger-menu-btn").on("click", function(e) {
	$(this).addClass("hamburger-menu-btn--active");
});

$closeMenu.on("click", function () {
	$fixedMenu.fadeOut().removeClass("fixed-menu--open");
	$("body").removeClass("blocked-scroll");
});

