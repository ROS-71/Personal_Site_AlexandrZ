// Константа slides в кторой получаем каждый из слайдов (классов .slide)
const slides = document.querySelectorAll('.slide')

// Создаём цикл for для прохода по каждому из сладов и добавления слушателя
// На каждой итерации (обработка данных) создаём переменную slide которая будет убирать данные из массива slides
for (const slide of slides) {
	// добавляем слушателя на событие click с дальнейшим использованием линейной функции =>
	slide.addEventListener('click', () => {
		// добавляем функцию clearAcctiveClasses() для удаления класса active по клику
		clearAcctiveClasses()
		// добавляем класс active по клику
		slide.classList.add('active')
	})
}

// Ниже описание функции для удаления класса active через метод forEach
// Можно для удаления класса использовать также for как и для добавления класса

// Описание функции clearAcctiveClasses() для удаления класса acive
function clearAcctiveClasses() {
	// Для каждого слайда из массива slides удаляем класс active
	slides.forEach((slide) => {
		slide.classList.remove('active')
	})
}