import toggleDropdown from './view/dropdown.js';
import { handleTest, resetTest } from './helper/test.js';

$("#drop").click(() => {
    toggleDropdown();
});

$("#reset").click(() => {
    resetTest();
    $("#info").slideUp();
});

$("#inp").on("input", () => {
    handleTest($("#inp").val());
});

