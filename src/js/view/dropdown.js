export default function toggleDropdown(){
    $("#info").css("display") == "none"?
        $("#info").slideDown() : 
        $("#info").slideUp() ;

    $("#drop-icon").css("transform") == "matrix(1, 0, 0, 1, 0, 0)" ?
        $("#drop-icon").css("transform", "rotate(180deg)") :
        $("#drop-icon").css("transform", "rotate(0deg)") ;
}
