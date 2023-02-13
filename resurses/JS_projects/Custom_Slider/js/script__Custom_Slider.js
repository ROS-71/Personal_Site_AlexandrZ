// Подтягиеваем кнопки навигации в переменные для из дальнейшего обучения
const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');

// Подтягиваем блок с левым сайтбаром в переменную
const sidebar = document.querySelector('.sidebar');

// Подтягиваем блок container для вычисления высоты/размеров экрана в дальнейшем
const container = document.querySelector('.container');

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
	const height = container.clientHeight

	// вычисляем для свойства translateY высоту/размер экрана
	// ...т.е. вместо указанного количества в px, мы активный слайд умножаем на переменную height, которая равна перменной container (блок в html) с параметром clintHeight - дающим сзначени высоты экрана или окна
	mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;

	// убираем минус перед долларом $ чтобы прокрутка была в другу сторону и не получась каша
	sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;
}