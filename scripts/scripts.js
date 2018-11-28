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

const $prev = $(".prev__link");
const $next = $(".next__link");
var slideNow = 1;
var slideCount = $(".slidewrapper").children().length;
var translateWidth = 940; //ширина слайда

function nextSlide() {
	if (slideNow = slideCount || slideNow < slideCount) {  
		$(".slidewrapper").css("transform", "translate(0,0)"); //возвращаем в исходное состояние к первому слайду
		slideNow = 1;
	}else {
		$(".slidewrapper").css("transform", "translateY( "+ translateWidth + "px")"); 
		slideNow++; //прокручиваем на один слайд вперед, прибавляя ширину
	}
}

function prevSlide() {
	if (slideNow = slideCount || slideNow > slideCount) {
		$(".slidewrapper").css("transform", "translate(0,0)");
		slideNow = 1;
	}else {
		$(".slidewrapper").css("transform", "translate( "- translateWidth + "px")");
		slideNow--; //прокручиваем на один слайд вперед, вычитая ширину
	}
}

$next.on("click", function(e) {
	e.preventDefault();
	nextSlide();
});


$prev.on("click", function(e) {
	e.preventDefault();
	prevSlide();
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
				no_recall: myForm.elements.no_recall.checked;
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

const $modal = $(".reviews-popup");
const $close = $(".close");


function reviewBtn(btn) {
	$(btn).on("click", function() {
	$modal.css.("display", "block");
	}); 
}

$close.on("click", function() {
	$modal.css.("display", "none");
});

window.on("click", function(e) {
	if(e.target == $modal) {
		$modal.css.("display", "none");
	}
});

reviewBtn(".btn-learn-more");
reviewBtn(".btn-learn-more--phone");