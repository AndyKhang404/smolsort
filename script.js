var is_ascending = true;

function get_all_entry() {
	return document.getElementsByClassName('entry');
}

function get_new_entry(num,text) {
	var entry = document.createElement('LI');
	entry.className = 'entry';
	var num_elem = document.createElement('B');
	num_elem.className = 'entry-num'; num_elem.innerHTML = num;
	var text_elem = document.createElement('B');
	text_elem.className = 'entry-text'; text_elem.innerHTML = text;
	var trash_div = document.createElement('DIV');
	trash_div.className = 'trash-div';
	var trash_btn = document.createElement('BUTTON');
	trash_btn.className = 'trash-btn'; trash_btn.innerHTML = '&Cross;';
	trash_btn.onclick = function(){
		this.parentElement.parentElement.remove();
	};

	entry.appendChild(num_elem);
	entry.appendChild(text_elem);
	trash_div.appendChild(trash_btn);
	entry.appendChild(trash_div);
	return entry;
}

function insert_new_entry(entry,num) {
	var entry_output = document.getElementById('entry-output');
	var entries = get_all_entry();
	if (entries.length === 0) {
		entry_output.appendChild(new_entry);
		return;
	} else {
		var entry_nums = [];
		for(var i = 0; i < entries.length; i++){
			entry_nums.push(parseInt(entries.item(i).children.item(0).innerHTML,10));
			if(((entry_nums[i] > num) && is_ascending) || ((entry_nums[i] < num) && !is_ascending)){
				entry_output.insertBefore(entry,entries.item(i));
				return;
			}
		}
		entry_output.appendChild(entry);
		return;
	}
}

function create_entry() {
	var num_elem = document.getElementById('num-input');
	var text_elem = document.getElementById('text-input');
	var error_log = document.getElementById('error-log');
	var num = 0;
	if(num_elem.value === ''){
		error_log.innerText = 'You must write a number';
		error_log.style.display = 'inline';
		num_elem.value = '';
		text_elem.value = '';
		return;
	} else {
		num = parseInt(num_elem.value,10);
		if(isNaN(num)){
			error_log.innerText = 'You must write number only';
			error_log.style.display = 'inline';
			num_elem.value = '';
			text_elem.value = '';
			return;
		}
	}
	num_elem.value = '';
	var text = text_elem.value; text_elem.value = '';
	error_log.style.display = 'none';
	new_entry = get_new_entry(num,text);
	insert_new_entry(new_entry,num);
}

function reset() {
	document.getElementById('entry-output').innerHTML = '';
}

function swap(){
	var entry_output = document.getElementById('entry-output');
	var entries = get_all_entry();
	for(var i = entries.length-1; i >= 0; i--){
		entry_output.appendChild(entries.item(i));
	}
}

function ascending(){
	if(!is_ascending){
		swap();
		is_ascending = true;
	}
}

function descending(){
	if(is_ascending){
		swap();
		is_ascending = false;
	}
}

document.getElementById('num-input').onkeydown = function(key) {
	if(key.key === 'Enter'){
		create_entry();
	}
}

document.getElementById('text-input').onkeydown = function(key) {
	if(key.key === 'Enter'){
		create_entry();
	}
}