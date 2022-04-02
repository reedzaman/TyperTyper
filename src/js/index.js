import "./helper/jqueryLoader.js";
import toggleDropdown from './view/dropdown.js';
import toggleTheme from './view/theme.js';
import { handleTest, resetTest } from './helper/test.js';

$("#drop").click(() => {
    toggleDropdown();
});

$("#reset").click(() => {
    resetTest();
    $("#info").slideUp();
});

$("#theme").click(() => {
    toggleTheme();
});

$("#inp").on("input", () => {
    handleTest($("#inp").val());
});

