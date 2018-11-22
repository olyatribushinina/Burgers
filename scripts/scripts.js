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



function accordeon(btn) {
	$(btn).on("click", function () {
		let thisBtn = this;

		$(btn).each(function (index, element) {
			let accordItem = $(this).parent();

			if (thisBtn == element) {
				if (accordItem.hasClass("active-js")) {
					accordItem.removeClass("active-js");
				} else {
					accordItem.addClass("active-js");
				}
			} else {
				if (accordItem.hasClass("active-js")) {
					accordItem.removeClass("active-js");
				}
			}
		})
	});
}

accordeon(".accordeon__button");
accordeon(".accordeon__button_vertical");
