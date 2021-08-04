const tipEl = document.getElementById("tipPerPerson");
const totalEl = document.getElementById("totalPerPerson");
const btnReset = document.getElementById("reset");

const peopleInp = document.getElementById("people");
const billInp = document.getElementById("bill");

const customTip = document.getElementById("customTip");
const btnsTip = Array.from(document.querySelectorAll(".tipSelect"));

class State {
	constructor(bill, tipPercent, numPeople) {
		this.bill = bill;
		this.percent = tipPercent;
		this.people = numPeople;
		this.tipPerPersonMath = (this.bill * (this.percent / 100)) / this.people;
	}

	get tipPerPerson() {
		return parseFloat(this.tipPerPersonMath).toFixed(2);
	}

	get totalPerPerson() {
		return parseFloat(this.bill / this.people + this.tipPerPersonMath).toFixed(2);
	}
}

const stylesOn = () => {
	btnReset.classList.remove("empty");
	btnReset.disabled = false;
	billInp.classList.remove("empty");
};

const stylesOff = () => {
	btnReset.classList.add("empty");
	btnReset.disabled;
	billInp.classList.add("empty");
};

const render = state => {
	tipEl.innerText = state.tipPerPerson;
	totalEl.innerText = state.totalPerPerson;
};

const load = () => {
	billInp.value = 142.55;
	btnsTip.forEach(btn => {
		if (+btn.innerHTML.replace("%", "") === 15) btn.classList.add("selected");
	});
	peopleInp.value = 5;
	render(new State(142.55, 15, 5));
	stylesOn();
};

const reset = () => {
	billInp.value = 0;
	btnsTip.forEach(btn => btn.classList.remove("selected"));
	customTip.value = "";
	customTip.classList.remove("selected");
	peopleInp.value = 1;

	render(new State(0, 0, 1));
	stylesOff();
};

const billEv = e => {
	const value = e.target.value;

	const peopleInp = document.getElementById("people");
	const customTip = document.getElementById("customTip");
	const btnsTip = Array.from(document.querySelectorAll(".tipSelect"));

	const btnTip = btnsTip.find(btn => btn.classList.contains("selected"));
	let val;

	if (!value || value === "0") {
		e.target.value = 1;
		val = 1;
	} else val = +value;

	if (!btnTip && !customTip.value) render(new State(val, 0, +peopleInp.value));
	else if (!btnTip) render(new State(val, +customTip.value, +peopleInp.value));
	else render(new State(val, +btnTip.innerHTML.replace("%", ""), +peopleInp.value));

	stylesOn();
};

const peopleEv = e => {
	const value = e.target.value;

	const billInp = document.getElementById("bill");
	const customTip = document.getElementById("customTip");
	const btnsTip = Array.from(document.querySelectorAll(".tipSelect"));

	const btnTip = btnsTip.find(btn => btn.classList.contains("selected"));
	let val;

	if (!value || value == 0) {
		e.target.value = 1;
		val = 1;
	} else val = +value;

	if (!btnTip && !customTip.value) render(new State(+billInp.value, 0, val));
	else if (!btnTip) render(new State(+billInp.value, +customTip.value, val));
	else render(new State(+billInp.value, +btnTip.innerHTML.replace("%", ""), val));

	stylesOn();
};

const btnsEv = e => {
	btnsTip.forEach(btn => btn.classList.remove("selected"));
	customTip.value = "";
	customTip.classList.remove("selected");
	e.target.classList.add("selected");

	const billInp = document.getElementById("bill");
	const peopleInp = document.getElementById("people");

	render(new State(+billInp.value, +e.target.innerHTML.replace("%", ""), +peopleInp.value));

	stylesOn();
};

const customEv = e => {
	btnsTip.forEach(btn => btn.classList.remove("selected"));
	const value = e.target.value;

	const billInp = document.getElementById("bill");
	const peopleInp = document.getElementById("people");
	let val = value;

	if (!value) {
		e.target.value = 1;
		val = 1;
	}

	e.target.classList.add("selected");
	render(new State(+billInp.value, +val, +peopleInp.value));

	stylesOn();
};

customTip.addEventListener("change", customEv);
customTip.addEventListener("keyup", customEv);

btnsTip.forEach(btn => btn.addEventListener("click", btnsEv));

peopleInp.addEventListener("change", peopleEv);
peopleInp.addEventListener("keyup", peopleEv);

billInp.addEventListener("change", billEv);
billInp.addEventListener("keyup", billEv);

btnReset.addEventListener("click", reset);

document.addEventListener("DOMContentLoaded", load);
