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