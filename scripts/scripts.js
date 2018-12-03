// гамбургер

const $hamburger = $(".js-open-menu");
const $fixedMenu = $(".js-fixed-menu");

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


// аккордеон

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


// слайдер

$(function () {

	$(".slider-controls__next").on("click", function(e) {
		e.preventDefault();

		var $this = $(this),
			container = $this.closest(".slider");
			items = container.find(".slide"),
			activeSlide = items.filter(".active"),
			reqItem = activeSlide.next(),
			reqIndex = reqItem.index(),
			list = container.find(".slidewrapper"),
			duration = 500;

		if (reqItem.length) {
				list.animate( {
				"left" : -reqIndex * 100 + "%"
			}, duration, function () {
				activeSlide.removeClass("active");
				reqItem.addClass("active");
			});
		}	

	});

	$(".slider-controls__prev").on("click", function(e) {
		e.preventDefault();

		var $this = $(this),
			container = $this.closest(".slider");
			items = container.find(".slide"),
			activeSlide = items.filter(".active"),
			reqItem = activeSlide.prev(),
			reqIndex = reqItem.index(),
			list = container.find(".slidewrapper"),
			duration = 500;

		if (reqItem.length) {
				list.animate( {
				"left" : -reqIndex * 100 + "%"
			}, duration, function () {
				activeSlide.removeClass("active");
				reqItem.addClass("active");
			});
		}	
	});

});



	// форма
	const myForm = document.querySelector(".form");
	const sendButton = document.querySelector(".order_form");

	sendButton.addEventListener("click", function(event) {
		event.preventDefault();

		if(validateForm(myForm)) {
			const data = {
				name: myForm.elements.name.value,
				phone: myForm.elements.phone.value,
				street: myForm.elements.street.value,
				house: myForm.elements.house.value,
				house_number: myForm.elements.house_number.value,
				floor: myForm.elements.floor.value,
				comment: myForm.elements.comment.value,
				ansver_cash: myForm.elements.answer.checked,
				no_recall: myForm.elements.no_recall.checked,
			}
		}
			
		const xhr = new XMLHttpRequest();
		xhr.responseType = "json";
		xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
		xhr.send(JSON.stringify(data));
		xhr.addEventListener("load", function() {
			if(xhr.response.status) {
				console.log("Все ok!");
			}
			
		});

});	
		
	function validateForm(form) {
		let valid = true;

		if (!validateField(form.elements.name)) {
			valid = false;
		}

		if (!validateField(form.elements.phone)) {
			valid = false;
		}

		if (!validateField(form.elements.street)) {
			valid = false;
		}

		if (!validateField(form.elements.house)) {
			valid = false;
		}

		if (!validateField(form.elements.house_number)) {
			valid = false;
		}

		if (!validateField(form.elements.apartment)) {
			valid = false;
		}

		if (!validateField(form.elements.floor)) {
			valid = false;
		}

		if (!validateField(form.elements.ansver_cash)) {
			valid = false;
		}

		if (!validateField(form.elements.ansver_card)) {
			valid = false;
		}

		return valid;
	}

	function validateField(field) {
		if(!field.checkValidity()) {
			field.nextElementSibling.textContent = field.validationmessage;

			return false;
		}else {
			field.nextElementSibling.textContent = "";

			return true;
		}
	}


//модальное окно

const $popup = $(".reviews-popup");
const $itemText = $(".popup-text")
const $close = $(".close");



function reviewBtn(btn) {
	$(btn).on("click", function() {
		let thisBtn = this;

		$(btn).each(function (index, element) {
			let reviewItem = $(this).parent();
		
			if (thisBtn == element) {
				itemText = reviewItem.find(".popup-text");
				
				for (var i = 0; i < itemText.length; i++) {
				var $text = $this.textContent;
				$popup.innerText = $text;
			}

			$popup.css("display", "block");

			}
			
		});
	}); 
};


$close.on("click", function() {
	$popup.css("display", "none");
});

$("window").on("click", e => {
	if(e.target == $popup) {
		$popup.css("display", "none");
	}
});

reviewBtn(".btn-learn-more");
reviewBtn(".btn-learn-more--phone");


// one scroll page

const sections = $(".section");
const display = $(".maincontent");
let inScroll = false;
const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const setActiveMenuItem = itemEq => {
	$(".points__item")
	.eq(itemEq)
	.addClass("active")
	.siblings()
	.removeClass("active");
}

const performTransition = sectionEq => {
	const position = "${sectionEq * -100}%";
	const mouseInertionIsFinished = 300;
	const transitionIsFinished = 1000;

	if (inScroll === false) {
		inScroll = true;
	

	display.css({
		transform: "translateY(${position})"
	}); 
		sections
		.eq(sectionEq)
		.addClass(".active")
		.siblings()
		.removeClass(".active");

		setTimeout(() => {
			inScroll = false;
			setActiveMenuItem(sectionEq);
		}, transitionIsFinished + mouseInertionIsFinished);
	}
};

const scrollToSection = direction => {
	const activeSection = sections.filter(".active");
	const prevSection = activeSection.prev();
	const nextSection = activeSection.next();

	if (direction === "up" && prevSection.length) {
		performTransition(prevSection.index());
	}

	if (direction === "down" && nextSection.length) {
		performTransition(nextSection.index());
	}
};

$(document).on( {

	wheel: e => {
	const deltaY = e.originalEvent.deltaY;

	const direction = deltaY > 0 ? "down" : "up";
		scrollToSection("direction");
		
	},
	keydown: e => {

		switch(e.keyCode) {
		case 40:
		scrollToSection('down');
		break;
		case 38:
		scrollToSection("up");
		break;
	}

	},
	touchmove: e => e.preventDefault
});

$(document).on("keydown", e => {
	console.log(e.keyCode);

});

$("[data-scroll-to]").on("click", e => {
	e.preventDefault();

	const target = $(e.currentTarget).attr("data-scroll-to");

	performTransition(target);
});


if (isMobile) {
	$(document).swipe( {
	swipe:function(event, direction, distance, duration, fingerCount, fingerData) {

		const scrollDirection = direction ==="down" ? "up" : "down"
		scrollToSection(scrollDirection)
	}
});

};


// player

let player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player("yt-player", {
		height: "405",
		width: "660",
		videoId: "M7lc1UVf-VE",
		playerVars: {
			controls: 0,
			disablekb: 0,
			modestbranding: 0,
			rel: 0,
			autoplay: 0,
			showinfo: 0
		},
		events: {
			onReady: onPlayerReady,
			onStateChange: onPlayerStateChange
		}
	});
}

function onPlayerStateChange(event) {

	switch(event.data) {
		case 1:
			$(".player__start").addClass("paused");
			$(".player__wrapper").addClass("active");
			break;
		case 2:
			$(".player__start").removeClass("paused");
	}
}

function onPlayerReady () {
	const duration = player.getDuration();
	let interval;
	$(".player").removeClass("hidden");

	console.log(duration);

	clearInterval(interval);
	interval = setInterval(() => {
		const completed = player.getCurrentTime();
		const percent = (completed / duration) * 100;
		updateTimer();

	changeButtonPosition(percent)
	}, 1000);
}

function updateTimer() {
	$(".player__duration-completed").text(formatTime( player.getCurrentTime() ));
	$(".player__duration-estimate").text(formatTime( player.getDuration() ));
}

function formatTime(time) {
	const roundTime = Math.round(time);

	const minutes = Math.floor(roundTime / 60);
	const seconds = roundTime - minutes * 60;
	const formattedSeconds = seconds < 10 ? "0${seconds}" : seconds;

	return minutes + ":" + formattedSeconds;

}

$(".player__start").on("click", e => {

	// -1 - воспроизведение видео не началось
	// 0 - воспроизведение видео завершено
	// 1 - воспроизведение
	// 2 - пауза
	// 3 - буферизация
	// 4 - видео находится в череди

	const playerStatus = player.getPlayerState();
	if (playerStatus !== 1) {
		player.playVideo();
	}else {
		player.pauseVideo();
	}
	
});

$(".player__playback").on("click", e => {
	const bar = $(".currentTarget");
	const newButtonPosition = e.pageX - bar.offset().left;
	const clickedPercent = (newButtonPosition / bar.width()) * 100;
	const newPlayerTime = (player.getDuration() / 100) * clickedPercent;


	changeButtonPosition(clickedPercent)
	player.seekTo(newPlayerTime);
});


$(".player__splash").on("click", e => {

});

function changeButtonPosition(percent) {
	$(".player__playback-button").css({
			left: "${percent}%"
		});

}

