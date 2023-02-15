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

// Вкладки с проектами
function openTab(evt, tabName) {
	let i, tabsBlock, tabLinks;


	tabsBlock = document.getElementsByClassName('tabs__block');
	for (i = 0; i < tabsBlock.length; i++) {
		tabsBlock[i].style.display = 'none';
	}

	tabLinks = document.getElementsByClassName('tabLinks');
	for (i = 0; i < tabLinks.length; i++) {
		tabLinks[i].className = tabLinks[i].className.replace(' activeTab', '');
	}
	document.getElementById(tabName).style.display = 'block';
	evt.currentTarget.className += ' activeTab';


}
document.getElementById("defaultOpen").click();


//************************************************************************************** */
//********************************* Проекты на JS ************************************** */
//************************************************************************************** */

// Dinamic_Cards

// Константа slides в кторой получаем каждый из слайдов (классов .slide)
const slides = document.querySelectorAll('.slide');
// Устанавливаем в массиве slides активный класс по умолчанию
slides[2].classList.add('activeSlide');

// Создаём цикл for для прохода по каждому из сладов и добавления слушателя
// На каждой итерации (обработка данных) создаём переменную slide которая будет убирать данные из массива slides
for (const slide of slides) {
	// добавляем слушателя на событие click с дальнейшим использованием линейной функции =>
	slide.addEventListener('click', () => {
		// добавляем функцию clearAcctiveClasses() для удаления класса active по клику
		clearAcctiveClasses()
		// добавляем класс active по клику
		slide.classList.add('activeSlide')
	})
}

// Ниже описание функции для удаления класса active через метод forEach
// Можно для удаления класса использовать также for как и для добавления класса

// Описание функции clearAcctiveClasses() для удаления класса acive
function clearAcctiveClasses() {
	// Для каждого слайда из массива slides удаляем класс active
	slides.forEach((slide) => {
		slide.classList.remove('activeSlide')
	})
}



// Drag & Drop

// Забираем данные из класса item в html
const item = document.querySelector('.item')
// Получаем из всех классов placeholder дынные
const placeholders = document.querySelectorAll('.placeholder')

// Обращаемся к самому элементу и добавлем метод слушителя 
// ВНИМАНИЕ!!! Пояснение обработки механники событий: мы остлеживаем через слушителя addEventListener, обрабатываем через функцию dragstart или dragend соответвенно и говорим, что нужно сделать, через console.log в этих фукциях
// Для отработки передвижения элемента нужно указать параметры: начальное dragstart и конечное dragend событие в отдельных слушителях
// dragstart он говорит, что должно происходить когда начали перетаскивать объект
// dragend говорит, что должно происходить когда закончили перетаскивание объекта
// Вторым параметром в слушителях нужно добавить функции, которые будут выполнены когда эти события произойдут!
item.addEventListener('dragstart', dragstart)
item.addEventListener('dragend', dragend)

// обрабатываем каждый placeholder путём пробега по каждому классу placeholder
// т.е. мы создаём на каждой итерации (обработкка данных) placeholder из массива placeholders
for (const placeholder of placeholders) {

	// к каждому placeholder добавлем несколько событий через метод слушателя/наблюдателя addEventListener. Для каждого события нужно прописать функцию ВТОРЫМ ПРАМЕТРОМ для обработки действия
	placeholder.addEventListener('dragover', dragover)		// вызывается когда элемент перетаскиваемый находится НАД placeholder куда мы его можем поместить
	placeholder.addEventListener('dragenter', dragenter)		// когда мы заходим на территорию этого конкретного placeholder
	placeholder.addEventListener('dragleave', dragleave)		// когда перетащили но передумали и вышли из территори placeholder
	placeholder.addEventListener('drop', drop)			// когда мы отпустили или бросили преетаскиваемый объект на нужном placeholder
}

// ************************************************************************************************************************************
// Описание фукций для слушателей с dragstart и dragend
// В функции указываем объект event или e - на усмотрение!!! event - это объект который и есть наш блок/элемент в html с которым можно, что то делать
// ... если указать console.log('drag start', event.target) то в консоле браузера мы увидим сообщение drag start/end и под нима подную строку div блока из html

function dragstart(event) {
	// Добавляем вывод в консоль уведомление, когда данная функция dradstart будет реализованна
	console.log('drag start', event.target)
	// когда есть доступ(указан event.target) к event мы можем добавлять к нему css стили в то время когда мы его перетаскиваем - к примеру добавим класс hold в css со стилями
	event.target.classList.add('hold')
	// Прописываем добавление класса hide , чтобы скрывать перетаскиваемый элемент, но прописываем его в функции setTimeout - которая устанавливает задержку срабатывания добавления класса hide
	setTimeout(() => event.target.classList.add('hide', 0))
}

function dragend(event) {
	// Добавляем вывод в консоль уведомление, когда данная функция dradend будет реализованна
	// event.target второй раз для функции окончания указывать не обязательно!!!
	console.log('drag end')
	// тут удаляем класс hold и hide когда перетаскивание заканчивается
	event.target.classList.remove('hold', 'hide')
	//можно вместо удаления классов через метод remove, просто типа перетереть все классы и добавить переменную item с классовыми настройками по умолчанию:
	event.target.classList = 'item'
}

// ************************************************************************************************************************************
// Описание функций для событий наблюдателя с событиями в цикле for
function dragover(event) {
	// метод preventDefault() не даёт отменить поведения нашего перетасиваемого объекта и вернуть его обратно на своё место
	event.preventDefault()

}
function dragenter(event) {
	// добавляем визуализацию в виде подсветки с классом hovered в css при претаскивании на территорию placeholder
	event.target.classList.add('hovered')

}
function dragleave(event) {
	// удаляем визуализацию в виде подсветки с классом hovered в css при убирании объекта с территории placeholder
	event.target.classList.remove('hovered')

}
function drop(event) {
	// убираем класс hovered чтобы устранить баг с бордером на перетаскиваемом объекте
	event.target.classList.remove('hovered')
	// закрепляет на новом месте перетаскиваемый объект, а именно преедаёт класс item на пустой placeholder через метод append
	event.target.append(item)
}


// Custom_Slider

// Подтягиеваем кнопки навигации в переменные для из дальнейшего обучения
const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');

// Подтягиваем блок с левым сайтбаром в переменную
const sidebar = document.querySelector('.sidebar');

// Подтягиваем блок container для вычисления высоты/размеров экрана в дальнейшем
const containerjs3 = document.querySelector('.popup_js3__container');

// Задаеем прееменную для пересчёта количетсва слайдов в дальнейшем
const mainSlide = document.querySelector('.main-slide');
// Получаем в slideCount все 'div' содержащиеся в блоке класса .main-slide переданного переменной-константе mainSlide
// .length после ('div') задаёт, что нам нужно число/количество div`ов
const slidesCount = mainSlide.querySelectorAll('div').length;

// Переменная содержащая номер активного слайда
let activeSlideIndex = 0;

// Оперируем стилями для sidebar блока: добавляем к блоку положение top: -300vh т.е. смещаемся sidebar`ом на 3 слайда вниз (каждый слайд это полный экран по высоте и равен он 100vh)
// Лучше сделать вычисление -300vh ,чем прописывать его жёстко, для этого используем занк доллара и фигурные скобки ${3*100}
// sidebar.style.top = `-${3 * 100}vh`;

// для атоматизации расчтёа заносим переменную slidesCount которая считает количество div с слайдами и вычитаем из неё единицу т.к. по умолчанию мы уже находимся на слайде и учитывать его не нужно, иначе будет белый экрна место заливки цветом.
// n/t мы оперируем не с 4 слайдавми, а 3-мя
sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;

// Добавляем слушателя к нопкам с событием click
upBtn.addEventListener('click', () => {
	// При нажатии на кнопку Вверх (UP) будем вызывать функцию changeSlide с параметром up 
	changeSlide('up')
})

downBtn.addEventListener('click', () => {
	// При нажатии на кнопку Вниз (DOWN) будем вызывать функцию changeSlide с параметром down 
	changeSlide('down')
})

// Функция changeSlide будет определять направление перемещения слайдов
function changeSlide(direction) {
	if (direction === 'up') {
		activeSlideIndex++								// Прибавляем единицу к активному слайду

		// Добавляем проверку, чтобы мы не выходили за рамки количества сайдера
		if (activeSlideIndex === slidesCount) {
			// обнуляем активный слайд, если условие if (activeSlideIndex === slidesCount) = true, т.е. активный слайд достиг конечного слайда
			activeSlideIndex = 0;
		}
	} else if (direction === 'down') {
		activeSlideIndex--								// Отнимаем единицу от активного слайда

		// Добавляем проверку если активный слайд меньше нуля (например сразу нажали вниз (down)
		if (activeSlideIndex < 0) {
			// ...то мы отнимает от количества слайдов единицу
			activeSlideIndex = slidesCount - 1;
		}
	}

	// получаем в переменную height через обращение к переменной container со полученным свойством clintHeight
	const height = containerjs3.clientHeight

	// вычисляем для свойства translateY высоту/размер экрана
	// ...т.е. вместо указанного количества в px, мы активный слайд умножаем на переменную height, которая равна перменной container (блок в html) с параметром clintHeight - дающим сзначени высоты экрана или окна
	mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;

	// убираем минус перед долларом $ чтобы прокрутка была в другу сторону и не получась каша
	sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;
}



// Color_Snake

// Получаем доступ к доске board по id (это класс container)
const boardCS = document.querySelector('#boardCS');
// задём массив с перчилением цветов для квадратов
const colorsCS = ['#ff0000', '#000cff', '#e100ff', '#eeff00', '#00ff04', '#00f6ff', '#ff9d00', '#bcbca7', '#00ffcb', '#7b00ff']
// Устанавливаем количество квадратов в доске
const SQUARES_NUMBER = 2000;

// Создаём цикл for с перменной let и указываем итерацию: i = 0; i < SQUARES_NUMBER; i++
for (let i = 0; i < SQUARES_NUMBER; i++) {
	// в этом цикле for мы будем 20000 раз пробегаться по константе SQUARES_NUMBER и на каждой итерации, которых будет 2000 штук будем создавать переменную square
	// ...для того чтобы динамически создать html элемент/тег мы обращаемся к методу document.createElement и строковом формате указываем какой тег нам нужно создать
	const square = document.createElement('div')
	//  добавляем к переменной square класс square кторый говорит, что он квадрат (см. описание класса square в css)
	square.classList.add('square')

	// добавляем к перменной square слушателя событий для каждого из квадратов с событием mouseover - т.е. при наведении мыши на определённый квадрат
	// ...вторым значением для слушителя указываем функцию setColor со значенимем переменной square 
	square.addEventListener('mouseover', () =>
		setColor(square));

	// делаем обратный эффект при убирании мыши mouseleave, только уже с функцией removeColor
	square.addEventListener('mouseleave', () =>
		removeColor(square));

	// через метод append добавляем square (квадрат) к классу container через переменную board  связанную  ним через id 
	boardCS.append(square);

}

// описание функии setColor со значением к примеру element (т.е. это тот же самый квадрат square) и приминением стиля к элементу в виде фона на element
function setColor(element) {
	// добавляем переменную color равной функции getRandonColor для включения разноцветности заливки фона на квадратах
	const color = getRandomColor()
	element.style.backgroundColor = color;
	element.style.boxShadow = `0 0 2px ${color}, 0 0 20px ${color}`
}
// описание функции removeColor - аналог setColor только обратный эффект - т.е. возращаем цвет офна по умолчанию
function removeColor(element) {
	element.style.backgroundColor = '#1d1d1d';
	element.style.boxShadow = `0 0 2px #000000`
}

// функция для рандомного выбора цветов из массива color
function getRandomColor() {
	// создаём переменную index в которой с помощью функции Math и метода floor - округляем математическую функцию Math и метода random , и задаём чтобы случайное выдавалось число
	const index = Math.floor(Math.random() * colorsCS.length);
	// в завершении возращаем массив colors и динамический index который мы получили
	return colorsCS[index];
}


// Game: Aim Training

// Получаем кнопку "Начать игру" через id 
const startBtn = document.querySelector('#start');

// Получаем все div с классом screen 
const screens = document.querySelectorAll('.screen');

// Получаем блок time-list со всем его содержимым, ниже в проверке будем проверять - содержит ли time-list класс time-btn
const timeList = document.querySelector('#time-list');

// получаем данные из закголовка "Осталось" и из span со временем
const timeEl = document.querySelector('#time');

// получаем div с id = board (доска) 
const board = document.querySelector('#board');

// получаем доступ к классу reloadPage для дальнейшего создания ссыли по перезапуску игры
const reloadPage = document.querySelector('.reloadPage');

// задём массив с перчилением цветов для кружков
const colors = ['#ff0000', '#000cff', '#e100ff', '#eeff00', '#00ff04', '#00f6ff', '#ff9d00', '#bcbca7', '#00ffcb', '#7b00ff']

let time = 0;
let score = 0;


// Добавляем слушителя на нопку "Начать игру" с событием click и функцией
startBtn.addEventListener('click', (event) => {

	// данный метод удаляет/отменяет хэш # из конца строки в адресной строке браузера
	event.preventDefault();

	// для смены экрана обращаемся к массиву screens и указываем в квадратных скобках [] первый экран - т.е. 0 (т.е. отчёт идёт с 0)
	// и добавляем к нему класс up где в css указан margin: -100vh; т.е. поднимаем первый экран на всю высоту за пределы браузера
	screens[0].classList.add('up');
})

// добавляем сулшителя на класс time-list где находятся кнопки с временем игры
// это сделанно для того, чтобы не добавлять слушителя на каждую кнопку
timeList.addEventListener('click', (event) => {

	// в данной проверке ниже, мы проверяем через contains есть ли у элемента timeList определённый класс, а именно time-btn
	if (event.target.classList.contains('time-btn')) {

		//через консоль можно посмотреть есть ли нужный класс по щелчку по кнопке - выдётся вся строка из html
		console.log(event.target);
		// ниже мы берём через getAttribute указанный в html атрибут data-time с его значением, которая привязана каждая на свою кнопку (см.html) 
		console.log(event.target.getAttribute('data-time'));

		// преписываем перменную time со значением взятого атрибута из html
		// ...функция parseItn - преобразует строковое значение в целое число
		// ... т.е. мы выбираем тут время как число
		time = parseInt(event.target.getAttribute('data-time'));

		// изменяем экрна с первого на второй - указываем в квадратных скобках 1 - т.е. второй экрн протягиваем вверх за пределя экрана браузера
		screens[1].classList.add('up');

		// вызываем функцию о старте игры
		startGame();
	}

})

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove();
		createRandomCircle();

		// Для границ поля - свечение рандомное
		board.style.boxShadow = `0 0 2px ${getRandomColor()}, 0 0 20px ${getRandomColor()}`
	}
})

// слушатель перезапуска игры по клику
reloadPage.addEventListener('click', () => {
	newGame();
})

function startGame() {

	// setInterval() управляет таймерами
	//...т.е. после заданного нами времени, она будет выполнять другую функцию decreaseTime с интервалом 1000мс - т.е кажду. секунду
	setInterval(decreaseTime, 1000);
	createRandomCircle();
	setTime(time);

	// помещаем с помощью innerHTML строчкку со временем time который мы выбрали в предыдущей функции с data-time
	// timeEl.innerHTML = `00:${time}`;
}

function decreaseTime() {
	// добавляем функцию котораяя проверят когда time = 0
	if (time === 0) {
		finishGame()
	} else {

		// вызываем переменную которая будет уменьшать каждую секунду, которую мы выбрали для игры
		let current = --time;

		if (current < 10) {
			current = `0${current}`;
		}

		setTime(current);
	}
}

function setTime(value) {
	// помещаем с помощью innerHTML строчкку со временем current который мы вычислили в выше указанной пременной
	timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
	timeEl.parentNode.classList.add('js5_hide');
	board.innerHTML = `<h1> Cчёт: <span class="primary">${score}</span> </h1>`;
}

function createRandomCircle() {
	const circle = document.createElement('div');
	const size = getRandomNumber(10, 60);

	const { width, height } = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);

	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	// Для кружков - цвет и свечение рандомные
	circle.style.background = getRandomColor();
	circle.style.boxShadow = `0 0 2px ${getRandomColor()}, 0 0 20px ${getRandomColor()}`
	board.append(circle);
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

// функция для рандомного выбора цветов из массива color
function getRandomColor() {
	// создаём переменную index в которой с помощью функции Math и метода floor - округляем математическую функцию Math и метода random , и задаём чтобы случайное выдавалось число
	const index = Math.floor(Math.random() * colors.length);
	// в завершении возращаем массив colors и динамический index который мы получили
	return colors[index];
}

// функция перезапуска игры
function newGame() {
	location.reload();
}












//************************************************************************************** */

// Блокировака скрола страницы при появлении модального окна

// Добавляет класс lock к body задающий блокировку прокрутки содежимого старницы при отображении модального окна
const popupResume = document.querySelector('.js_second');			// указываем класс блока по которому щёлкакем мышью при выводе модального окна
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