displayNotes();

let btnAdd = document.querySelector('#addBtn');
btnAdd.addEventListener('click', addNote);

function addNote() {
    let data = [];
	let addNote = document.querySelector('#addNote');
	let notesInput = localStorage.getItem('notes');
	
	if (notesInput) {
        data = JSON.parse(notesInput);
    } 

	let now = new Date();
    let mothGlobal = now.getMonth() + 1;
    let month = mothGlobal < 10 ? "0" + mothGlobal : mothGlobal;
    let dateTime = `${now.getDate()}.${month}.${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    
	let str = addNote.value.replace(/ +/g, '');
    if (str.length <= 0) {
        alert("Пустая заметка! Пожалуйста, введите текст!")
    } else {
        data.push({
            text: str, 
            time: dateTime 
        });
        localStorage.setItem('notes', JSON.stringify(data));
        addNote.value = '';
        displayNotes();
    }
}

function displayNotes(){
	let data = [];
	let notesInput = localStorage.getItem('notes');
	
    if (notesInput) {
        data = JSON.parse(notesInput);
    } 
	
	let html = '';
	
	data.forEach(function(element,index){
		html = `
				<div class="card notes_card">
					<div class="card_body">
						<h2 class="noted-time">${element.time}</h2>
						<p class="card-text">${element.text}</p>
                        <button id="${index}" onclick=deleteNote(this.id) class="btn btn_delete">Удалить</button>
					</div>
				</div>
			` + html;
	});
	
	let note = document.querySelector('#notes');
	
	if (data.length != 0){
		note.innerHTML = html;
	}
	else {
		note.innerHTML = '';
	}
	
}

function deleteNote(index) {
	let data = [];
	let notesInput = localStorage.getItem('notes');

    if (notesInput) {
        data = JSON.parse(notesInput);
    } 
	
	data.splice(index,1);
	localStorage.setItem('notes', JSON.stringify(data));
	
	displayNotes();
}