export default function toggleTheme(){
	let icn = document.getElementById('theme-icon');
	if(icn.innerHTML == 'dark_mode') icn.innerHTML = 'light_mode';
	else icn.innerHTML = 'dark_mode';
}
