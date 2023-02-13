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
	timeEl.parentNode.classList.add('hide');
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