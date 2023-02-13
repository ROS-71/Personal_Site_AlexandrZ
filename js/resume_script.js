// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	const menuLink = document.querySelector('.menu__link_burger');
	iconMenu.addEventListener('click', function (e) {
		// Блокирует прокрутку страницы при открытом меню
		document.body.classList.toggle('lock');
		// Добавляем класс ".active" к классу ".menu__icon"
		iconMenu.classList.toggle('active');
		// Добавляем класс ".active" к классу ".menu__body"
		menuBody.classList.toggle('active');
	});
}
/* Закрытие Меню Бургер при клике на один из пунктов */
const menuLinks = document.querySelectorAll('.menu__link_burger');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => { menuLink.addEventListener("click", onMenuLinkClick); });
	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (iconMenu.classList.contains('active')) {
			document.body.classList.remove('lock');
			iconMenu.classList.remove('active');
			menuBody.classList.remove('active');
		}
	}
}

//************************************************************************************** */

// Блокировака скрола страницы при появлении модального окна

// Добавляет класс lock к body задающий блокировку прокрутки содежимого старницы при отображении модального окна
const popupResume = document.querySelector('.resume__mini_popup');
const body = document.querySelector('body');
if (popupResume) {
	const popupLink = document.querySelector('.popup__close');
	popupResume.addEventListener('click', function (e) {
		document.body.classList.toggle('lock');
	});
}

// Удаляет класс lock блокирующий прокрутки body при закрытии модального окна
const popupLinks = document.querySelector('.popup__close');
if (popupLinks) {
	const populLinks = document.querySelector('.popup__close');
	popupLinks.addEventListener('click', function (e) {
		document.body.classList.remove('lock');
	});
}

//************************************************************************************** */



