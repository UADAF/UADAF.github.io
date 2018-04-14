const WORDS = [
	[
		"Отвага",
		"Главарь",
		"Банда",
		"Король",
		"Власть",
		"Борьба",
		"Победа",
		"Сила"
	],
	[
		"Указание",
		"Планирование",
		"Порядок",
		"Дисциплина",
		"Стабильность",
		"Религия",
		"Патриотизм"
	],
	[
		"Рынок",
		"Имидж",
		"Успех",
		"Возможность",
		"Мобильность",
		"Богатство",
		"Прогресс"
	],
	[
		"Взаимопонимание",
		"Привязанность",
		"Единомышленники",
		"Сообщество",
		"Гармония",
		"Чуткость",
		"Человек"
	],
	[
		"Динамика",
		"Интеграция",
		"Поток",
		"Синергия",
		"Планета",
		"Целостность",
		"Глобальный"
	]
];
const wordsFromSet = 4;
const width = 5, height = 4;
let isSelectable = false;
let tables = [];
let delays1 = [];
$(function () {
	$("#res").hide();
	$("#setSelect").hide();
});

function cleanup() {
	tables = [];
	isSelectable = false;
	$("#controls").hide();
	$("#setSelect").hide();
	delays1 = [];
	$("#delays1").children("input").each((i, e) => {
		delays1.push($(e).val() * 1000);
	});
	$(".delay").hide();
}

function showPostTest() {
	$("#controls").show();
	$("#setSelect").show();
	$(".delay").show();
}

function test() {
	cleanup();
	doTest();
}

function doTest(idx = 0, results = []) {
	if (idx >= 5) {
		display(results);
		showPostTest();
		return;
	}


	let table = buildTable();
	init(table);
	let s1words = buildWords();
	stage1(s1words, table);
	setTimeout(() => {
		isSelectable = true;
		let s2words = buildWords(s1words, 2);
		let repeatedWords = stage2(s2words, s1words, table);
		setTimeout(() => {
			isSelectable = false;
			results.push([table, repeatedWords]);
			doTest(idx + 1, results);
		}, $("#delay2").val() * 1000)
	}, delays1[idx]);
}


function buildTable() {
	let table = $("<table>");
	table.html("");
	for (let y = 0; y < height; y++) {
		let r = $("<tr>");
		for (let x = 0; x < width; x++) {
			let d = $("<td>");
			d.bind("click", () => {
				if (isSelectable) d.toggleClass("selected")
			});
			r.append(d);
		}
		table.append(r);
	}
	tables.push(table);
	return table;
}

function init(table) {
	$("#result").hide();
	$("#start").hide();
	$("#res").hide();

	let tests = $("#tests");
	tests.html(""); //Clear tables
	tests.append(table[0]);
}

function buildWords(excluded = []) {
	let words = [];
	WORDS.forEach(set => {
		set = set.slice(0); //Clone array
		for (let i = 0; i < wordsFromSet; i++) {
			let w = popRandElem(set);
			while (excluded.indexOf(w) > -1) {
				w = popRandElem(set);
				if (w === undefined) {
					break;
				}
			}
			if (w === undefined) {
				break;
			}
			words.push(w);
		}
	});
	return words;
}

function stage1(words, table) {
	forEachCell(table, (d, j, i) => {
		d.html(words[j * (width - 1) + i])
	});
}

function stage2(words, usedWords, table) {
	let repeatedWords = [];
	forEachCell(table, d => {
		let oldWord = words.length < 0 || usedWords.length > 0 && Math.random() > 0.2;
		let word = popRandElem(oldWord ? usedWords : words);
		if (oldWord) {
			repeatedWords.push(word);
		}
		d.html(word);
	});
	return repeatedWords;
}

function display(results) {
	let tests = $("#tests");
	tests.html("");
	let combinedResult = [0, 0, 0];
	results.forEach(([table, repeated]) => {
		tests.append(table);
		calculateResult(table, repeated).forEach((e, i) => combinedResult[i] += e);
	});

	$("#result").html(`Результат:<br>
		Правильно: ${combinedResult[0]}<br>
		Лишние слова: ${combinedResult[1]}<br>
		Незамеченные слова: ${combinedResult[2]}
	`).show();
	$("#res").show();
	$("#start").show();
}

function calculateResult(table, repeatedWords) {
	let matches = 0, wrong = 0, unselected;
	forEachCell(table, c => {
		let word = c.html();
		let idx = repeatedWords.indexOf(word);
		if (c.hasClass("selected")) {
			if (idx > -1) {
				c.addClass("right");
				matches += 1;
				repeatedWords.splice(idx, 1);
			} else {
				c.addClass("wrong");
				wrong += 1;
			}
		} else {
			if (idx > -1) {
				c.addClass("unselected");
			}
		}
	});
	unselected = repeatedWords.length;
	return [matches, wrong, unselected];
}

function showWords() {
	tables.forEach(table => forEachCell(table, e => {
		e.addClass("show");
	}))
}

function showSet(idx = -1) {
	tables.forEach(table => forEachCell(table, e => {
		if(idx === -1 || WORDS[idx].indexOf(e.html()) > -1) {
			e.removeClass("hide");
		} else {
			e.addClass("hide");
		}
	}))
}

function forEachCell(table, func) {
	$(table).children().each((i, e) => {
		$(e).children().each((j, d) => {
			func($(d), j, i);
		})
	});
}

function popRandElem(arr) {
	return arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
}