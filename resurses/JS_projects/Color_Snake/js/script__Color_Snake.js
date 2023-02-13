// Получаем доступ к доске board по id (это класс container)
const board = document.querySelector('#board');
// задём массив с перчилением цветов для квадратов
const colors = ['#ff0000', '#000cff', '#e100ff', '#eeff00', '#00ff04', '#00f6ff', '#ff9d00', '#bcbca7', '#00ffcb', '#7b00ff']
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
	board.append(square);

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
	const index = Math.floor(Math.random() * colors.length);
	// в завершении возращаем массив colors и динамический index который мы получили
	return colors[index];
}