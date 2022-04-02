export default function toggleTheme(){
    let themeIcon = document.getElementById('theme-icon');

    if($("body").hasClass('dark')) {
        themeIcon.innerHTML = 'dark_mode';
        $("body").removeClass('dark');
    } else {
        themeIcon.innerHTML = 'light_mode';
        $("body").addClass('dark');
    }
}
