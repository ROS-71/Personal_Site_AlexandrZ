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

// Slider-Swiper (Раздел "ПОРТФОЛИО")
const slider = document.querySelector('.swiper');
const swiper = new Swiper('.swiper', {
	// Параметры отображения
	// Задаёт пролистывание сладов: вертикальное или горизонтальное
	direction: 'horizontal',
	// Задаёт бесконечное пролистывание сладов
	loop: true,
	slidesPerView: 'auto',
	spaceBetween: 30,
	speed: 12500,
	freeMode: true,
	grabCursor: true,

	// Буллеты
	pagination: {
		el: '.swiper-pagination',
		// Активация нажатия на буллеты
		clickable: true,
		// Активация динамических буллетов
		dynamicBullets: true,
	},

	// Переключение сладов с помощью колеса мыши
	mousewheel: {
		// Чувствительность колеса мыши
		sensitivity: 1,
		// Класс объекта на котором будет срабатывать прокрутка мышью - указывать не обязательно!
		// !!! ВНИМАНИЕ !!! Если указанный класс будет использоваться на многих сладерах, то прокрутка будет по всем одновременно
		eventsTarget: ".swiper",
	},

	// Автопрокрутка (удобно использровать с параметром speed / speed: 7300, / для более плавной прокрутки
	autoplay: {
		// Пауза между прокруткой в мс
		delay: 1,
		// Отключить после ручного прееключения
		disableOnInteraction: false,
		// Пауза при наведении мыши на слайдер
		pauseOnMouseEnter: true,
	},

	// Адаптив слайдера
	// Брейк поинты для ШИРИНЫ ЭКРАНА
	// по принципу MobileFirst
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		480: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		},
	},
});
//************************************************************************************** */

// форма отправки данных - ВАЛИДАЦИЯ ДАННЫХ ФОРМЫ

// Задаёт строгий режим
"use strict"

// Стандартная проверка, что документ уже загружен
document.addEventListener('DOMContentLoaded', function () {
	// Переменная для перехваа функционала при нажатии кнопки "Отправить" с присвоением ей объекта с id = form (т.е. вся форма)
	const form = document.getElementById('form');
	// Вешаем событие на переменную (выше) form, т.е. при отправки формы мы переходим в функцию formSend
	form.addEventListener('submit', formSend);

	// Запрещаем стандартную отправку формы - т.е. переносим действие при нажатии на кнопку "Отправить" в функцию JS
	async function formSend(e) {
		e.preventDefault();
		// Делаем валидацию форм - т.е. чтобы поля были заполненны, и к примеру ещё - правильность написания email
		// Переменной error присваиваем результат работы функции formValidate в которую преедаём объект form
		let error = formValidate(form);

		// Получаем данные всех форм
		// Получаем все данные полей
		let formData = new FormData(form);

		// Сообщение о необходимости заполнения полей
		if (error === 0)  {
			// Создаём оптравку данных
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData,
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				form.reset();
				form.classList.remove('_sending');
			}
			else {
				alert("Упс! Что-то пошло не так! Пожалуйста повторите отправку!");
				form.classList.remove('_sending')
			} 
		}
		else {
			alert('Заполните обязательные поля!');
		}
	}

	function formValidate(form) {
		let error = 0;
		// Присваиваем в переменную formReq - все объеты с класом .req (сокращенно от required - обязательное поле)
		// класс .req нужно добавить к тем полям в html, которые необходимо проверять
		let formReq = document.querySelectorAll('._req');
		// Создаём цикл, который будет бегать по объектам с классом .req и получать каждый объект в константу input
		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			// При проверке - класс .error из вспомогательных функций ниже убирается 
			formRemoveError(input);

			// Проводим проверку email
			// Длеаем привязку к классу ._email , т.к. проверка поля email будет отличаться от других полей
			if (input.classList.contains('_email')) {
				// Условие проверяющее если тест НЕ ПРОЙДЕН - функции на проверку email (ниже данная функция)
				if (emailTest(input)) {
					// при непройденно тесте, добавляеем класс ._error этому объекту и родителю
					formAddError(input);
					// также будем увеличивать на единицу нашу переменную error
					error++;
				}
			}
			// Проверяем если строка пустая, то тогда вешаем класс ._error
			else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	// Вспомогательные функции, которые добавляют/удаляют самому объекту класс ._error и родителькому объету клас .error
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	// Функция для проверки email
	// Она проверяет регулярным выражением на соответвие есть ли в адресе почты сабака, точка, количество сиволов и т.д..
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
});
//************************************************************************************** */