// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/view/dropdown.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleDropdown;

function toggleDropdown() {
  $("#info").css("display") == "none" ? $("#info").slideDown() : $("#info").slideUp();
  $("#drop-icon").css("transform") == "matrix(1, 0, 0, 1, 0, 0)" ? $("#drop-icon").css("transform", "rotate(180deg)") : $("#drop-icon").css("transform", "rotate(0deg)");
}
},{}],"js/helper/utility.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcAccuracy = calcAccuracy;
exports.calcWPM = calcWPM;
exports.compStringLetterByLetter = compStringLetterByLetter;
exports.default = void 0;

function calcWPM(_ref, time) {
  var correctLetters = _ref.correctLetters,
      incorrectLetters = _ref.incorrectLetters,
      wrongKeyStrokes = _ref.wrongKeyStrokes;
  var timeComp = time / 60;
  var corrLettersPerMin = correctLetters / 5 / timeComp;
  var incorrLettersPerMin = incorrectLetters / 5 / timeComp;
  var wrongKeyStrokesPenalty = (wrongKeyStrokes - incorrectLetters) / 8 / timeComp;
  return Math.round(corrLettersPerMin - incorrLettersPerMin - wrongKeyStrokesPenalty);
}

function calcAccuracy(_ref2) {
  var correctLetters = _ref2.correctLetters,
      incorrectLetters = _ref2.incorrectLetters,
      wrongKeyStrokes = _ref2.wrongKeyStrokes;
  var totalLetters = correctLetters + incorrectLetters + wrongKeyStrokes / 3;
  return Number.parseFloat(correctLetters / totalLetters * 100).toFixed(2);
}

function compStringLetterByLetter(word1, word2) {
  var wrongLettersCount = 0;
  var rightLettersCount = 0;
  wrongLettersCount += Math.abs(word1.length - word2.length);
  var searchableLength = word1.length < word2.length ? word1.length : word2.length;

  for (var i = 0; i < searchableLength; i++) {
    if (word1[i] != word2[i]) wrongLettersCount++;else rightLettersCount++;
  }

  return [rightLettersCount + 1, wrongLettersCount];
}

var _default = {
  compStringLetterByLetter: compStringLetterByLetter,
  calcWPM: calcWPM,
  calcAccuracy: calcAccuracy
};
exports.default = _default;
},{}],"js/view/report.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.showReport = showReport;

function showReport(setup) {
  $('#report-wpm').text(setup.wpm);
  $('#report-correct').text(setup.correctWords);
  $('#report-incorrect').text(setup.incorrectWords);
  $('#report-correctLetters').text(setup.correctLetters);
  $('#report-incorrectLetters').text(setup.incorrectLetters);
  $('#report-accuracy').text(setup.accuracy);
  $('#report-lastTest').text(setup.lastTestResult);
  $('#report').css('display', 'flex');
  $('#text').css('display', 'none');
}

var _default = {
  showReport: showReport
};
exports.default = _default;
},{}],"js/helper/checkFunctions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.instantSpellCheck = instantSpellCheck;
exports.lineBreakCheck = lineBreakCheck;
exports.timeCheck = timeCheck;
exports.uncorrectedLettersCheck = uncorrectedLettersCheck;

var _test = require("./test.js");

var _utility = require("./utility.js");

var _report = require("../view/report.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function timeCheck(setup) {
  var initialTime = new Date();
  setup.timer = setInterval(function () {
    var time = setup.testTime - Math.round((new Date() - initialTime) / 1000);
    if (!(time % 2)) setup.wpmList.push((0, _utility.calcWPM)(setup, setup.testTime - time));
    $('#timer').text(time);

    if (time <= 0) {
      (0, _test.concludeTest)(setup);
      (0, _report.showReport)(setup);
    }
  }, 1000);
}

function instantSpellCheck(currInput, setup) {
  // If letter incresed, it gets counted as keyStroke. 
  // It isn't right keyStrokes but total keyStrokes. Hence not inside of the if statement bound.
  if (setup.prevInput.length < currInput.length) setup.keyStrokes++;

  if (currInput === setup.wordList[setup.currWordIndex].slice(0, currInput.length)) {
    $($('.word')[setup.currWordIndex]).removeClass('currentlyWrong');
  } else {
    $($('.word')[setup.currWordIndex]).addClass('currentlyWrong');
    if (setup.prevInput.length < currInput.length) setup.wrongKeyStrokes += 1;
  }

  setup.prevInput = currInput;
}

function lineBreakCheck(_ref) {
  var currWordIndex = _ref.currWordIndex;
  // finding the next word that will be heighlighted. If it exists in the next line, next row comes on top
  var nextHighlight = document.getElementsByClassName('word')[currWordIndex + 1]; // text-wrapper's top will be compare with the next 
  // words top to find out if the next word lies on the next line 

  var textWrapper = document.getElementsByClassName('text-wrapper')[0]; // finding both tops

  var textWrapperTop = textWrapper.getBoundingClientRect().top;
  var nextHighlightTop = nextHighlight.getBoundingClientRect().top; // if next word lies on next line, whole text is pushed to top a certein ammount
  // to emulate a new line

  if (nextHighlightTop - textWrapperTop > 5) {
    var top = parseInt($('#text').css('top'));
    $('#text').css('top', "".concat(top - 36, "px"));
    console.log("new line..");
  }
}

function uncorrectedLettersCheck(input, setup) {
  var _compStringLetterByLe = (0, _utility.compStringLetterByLetter)(input, setup.wordList[setup.currWordIndex]),
      _compStringLetterByLe2 = _slicedToArray(_compStringLetterByLe, 2),
      rightLettersCount = _compStringLetterByLe2[0],
      wrongLettersCount = _compStringLetterByLe2[1];

  setup.correctLetters += rightLettersCount;
  setup.incorrectLetters += wrongLettersCount;
}

var _default = {
  timeCheck: timeCheck,
  instantSpellCheck: instantSpellCheck,
  lineBreakCheck: lineBreakCheck,
  uncorrectedLettersCheck: uncorrectedLettersCheck
};
exports.default = _default;
},{"./test.js":"js/helper/test.js","./utility.js":"js/helper/utility.js","../view/report.js":"js/view/report.js"}],"js/helper/init.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.init = init;

var _checkFunctions = require("./checkFunctions.js");

function init(setup) {
  if (setup.testRunning) return;
  setup.testRunning = true;
  (0, _checkFunctions.timeCheck)(setup);
  $('#inp').attr('placeholder', '');
}

var _default = {
  init: init
};
exports.default = _default;
},{"./checkFunctions.js":"js/helper/checkFunctions.js"}],"js/view/draw.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.drawReport = drawReport;

function findHigh(arr) {
  var high = 0;
  arr.forEach(function (val) {
    if (high < val) high = val;
  });
  return high;
}

function findLow(arr) {
  var low = 100;
  arr.forEach(function (val) {
    if (val < low) low = val;
  });
  return low;
}

function drawReport(_ref) {
  var wpmList = _ref.wpmList,
      testTime = _ref.testTime;
  var height = 70;
  var pointHeights = [];
  var high = findHigh(wpmList);
  var low = findLow(wpmList);
  var mid = Math.round((high + low) / 2);
  var topMid = Math.round((high + mid) / 2);
  var lowMid = Math.round((low + mid) / 2);
  wpmList.forEach(function (value) {
    var length = high - low;
    var unitValue = height / length;
    var point = (value - low) * unitValue;
    pointHeights.push(height - point);
  });
  console.log(pointHeights);
  var canvas = document.getElementById("log");
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = 'grey';
  ctx.moveTo(30, 15);
  ctx.lineTo(500, 15);
  ctx.stroke();
  ctx.moveTo(30, 32.5);
  ctx.lineTo(500, 32.5);
  ctx.stroke();
  ctx.moveTo(30, 50);
  ctx.lineTo(500, 50);
  ctx.stroke();
  ctx.moveTo(30, 67.5);
  ctx.lineTo(500, 67.5);
  ctx.stroke();
  ctx.moveTo(30, 85);
  ctx.lineTo(500, 85);
  ctx.stroke();
  var pointGapRate = Math.round(420 / (testTime / 2 - 1));

  for (var i = 0; i < wpmList.length; i++) {
    ctx.moveTo(50 + i * pointGapRate, 5);
    ctx.lineTo(50 + i * pointGapRate, 95);
    ctx.stroke();
  }

  for (var _i = 0; _i < wpmList.length; _i++) {
    ctx.fillText("".concat(high), 10, 15 + 5);
    ctx.fillText("".concat(topMid), 10, 32.5 + 5);
    ctx.fillText("".concat(mid), 10, 50 + 5);
    ctx.fillText("".concat(lowMid), 10, 67.5 + 5);
    ctx.fillText("".concat(low), 10, 85 + 5);
    ctx.font = "12px Arial";
    ctx.beginPath();
    ctx.fillStyle = '#FCF55F';
    ctx.arc(_i * pointGapRate + 50, pointHeights[_i] + 10, 3, 0, 2 * Math.PI, false);
    ctx.lineWidth = 2;
    ctx.lineTo((_i + 1) * pointGapRate + 50, pointHeights[_i + 1] + 10);
    ctx.strokeStyle = '#FCF55F';
    ctx.stroke();
    ctx.fill();
  }
}

var _default = {
  drawReport: drawReport
};
exports.default = _default;
},{}],"js/helper/text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var words = ["the", "of", "to", "and", "a", "in", "is", "it", "you", "that", "he", "was", "for", "on", "are", "with", "as", "I", "his", "they", "be", "at", "one", "have", "this", "from", "or", "had", "by", "hot", "but", "some", "what", "there", "we", "can", "out", "other", "were", "all", "your", "when", "up", "use", "word", "how", "said", "an", "each", "she", "which", "do", "their", "time", "if", "will", "way", "about", "many", "then", "them", "would", "write", "like", "so", "these", "her", "long", "make", "thing", "see", "him", "two", "has", "look", "more", "day", "could", "go", "come", "did", "my", "sound", "no", "most", "number", "who", "over", "know", "water", "than", "call", "first", "people", "may", "down", "side", "been", "now", "find", "any", "new", "work", "part", "take", "get", "place", "made", "live", "where", "after", "back", "little", "only", "round", "man", "year", "came", "show", "every", "good", "me", "give", "our", "under", "name", "very", "through", "just", "form", "much", "great", "think", "say", "help", "low", "line", "before", "turn", "cause", "same", "mean", "differ", "move", "right", "boy", "old", "too", "does", "tell", "sentence", "set", "three", "want", "air", "well", "also", "play", "small", "end", "put", "home", "read", "hand", "port", "large", "spell", "add", "even", "land", "here", "must", "big", "high", "such", "follow", "act", "why", "ask", "men", "change", "went", "light", "kind", "off", "need", "house", "picture", "try", "us", "again", "animal", "point", "mother", "world", "near", "build", "self", "earth", "father", "head", "stand", "own", "page", "should", "country", "found", "answer", "school", "grow", "study", "still", "learn", "plant", "cover", "food", "sun", "four", "thought", "let", "keep", "eye", "never", "last", "door", "between", "city", "tree", "cross", "since", "hard", "start", "might", "story", "saw", "far", "sea", "draw", "left", "late", "run", "don't", "while", "press", "close", "night", "real", "life", "few", "stop", "open", "seem", "together", "next", "white", "children", "begin", "got", "walk", "example", "ease", "paper", "often", "always", "music", "those", "both", "mark", "book", "letter", "until", "mile", "river", "car", "feet", "care", "second", "group", "carry", "took", "rain", "eat", "room", "friend", "began", "idea", "fish", "mountain", "north", "once", "base", "hear", "horse", "cut", "sure", "watch", "color", "face", "wood", "main", "enough", "plain", "girl", "usual", "young", "ready", "above", "ever", "red", "list", "though", "feel", "talk", "bird", "soon", "body", "dog", "family", "direct", "pose", "leave", "song", "measure", "state", "product", "black", "short", "numeral", "class", "wind", "question", "happen", "complete", "ship", "area", "half", "rock", "order", "fire", "south", "problem", "piece", "told", "knew", "pass", "farm", "top", "whole", "king", "size", "heard", "best", "hour", "better", "true", "during", "hundred", "am", "remember", "step", "early", "hold", "west", "ground", "interest", "reach", "fast", "five", "sing", "listen", "six", "table", "travel", "less", "morning", "ten", "simple", "several", "vowel", "toward", "war", "lay", "against", "pattern", "slow", "center", "love", "person", "money", "serve", "appear", "road", "map", "science", "rule", "govern", "pull", "cold", "notice", "voice", "fall", "power", "town", "fine", "certain", "fly", "unit", "lead", "cry", "dark", "machine", "note", "wait", "plan", "figure", "star", "box", "noun", "field", "rest", "correct", "able", "pound", "done", "beauty", "drive", "stood", "contain", "front", "teach", "week", "final", "gave", "green", "oh", "quick", "develop", "sleep", "warm", "free", "minute", "strong", "special", "mind", "behind", "clear", "tail", "produce", "fact", "street", "inch", "lot", "nothing", "course", "stay", "wheel", "full", "force", "blue", "object", "decide", "surface", "deep", "moon", "island", "foot", "yet", "busy", "test", "record", "boat", "common", "gold", "possible", "plane", "age", "dry", "wonder", "laugh", "thousand", "ago", "ran", "check", "game", "shape", "yes", "hot", "miss", "brought", "heat", "snow", "bed", "bring", "sit", "perhaps", "fill", "east", "weight", "language", "among"];

function getText() {
  var text = [];

  for (var i = 0; i < 500; i++) {
    text.push(words[Math.floor(Math.random() * 499)]);
  }

  return text;
}

var _default = getText;
exports.default = _default;
},{}],"js/view/textRenderer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearText = clearText;
exports.default = void 0;
exports.renderText = renderText;
var textBox = document.getElementById('text');

function clearText() {
  $(textBox).html('');
}

function renderText(text) {
  var lettersCount = 0;
  text.forEach(function (word) {
    var wordElement = document.createElement('span');
    wordElement.innerText = word;
    $(wordElement).addClass('word');

    if (lettersCount > 35) {
      lettersCount = 0;
      wordElement.innerText = wordElement.innerText + ' ';
    } else {
      lettersCount += wordElement.innerText.length + 1;
    }

    textBox.appendChild(wordElement);
  });
}

var _default = {
  clearText: clearText,
  renderText: renderText
};
exports.default = _default;
},{}],"js/helper/setup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.newSetup = newSetup;
exports.setup = void 0;

var _text = _interopRequireDefault(require("./text.js"));

var _textRenderer = require("../view/textRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setup = {
  accuracy: 0.0,
  wordList: [],
  correctWords: 0,
  incorrectWords: 0,
  prevInput: '',
  keyStrokes: 0,
  totalLetters: 0,
  correctLetters: 0,
  incorrectLetters: 0,
  wrongKeyStrokes: 0,
  uncorrectedLetters: 0,
  currWordIndex: 0,
  lastTestResult: 0,
  testRunning: false,
  timer: undefined,
  testTime: 30,
  wpm: 0,
  wpmList: []
};
exports.setup = setup;

function clearSetup(setup) {
  clearTimeout(setup.timer); // Clearing the setup data

  setup.accuracy = 0.0;
  setup.wordList = [];
  setup.correctWords = 0;
  setup.incorrectWords = 0;
  setup.prevInput = '';
  setup.keyStrokes = 0;
  setup.totalLetters = 0;
  setup.correctLetters = 0;
  setup.incorrectLetters = 0;
  setup.wrongKeyStrokes = 0;
  setup.uncorrectedLetters = 0;
  setup.currWordIndex = 0;
  setup.testRunning = false;
  setup.timer = undefined;
  setup.testTime = 30;
  setup.wpmList = [];
}

function newSetup(setup) {
  var text = (0, _text.default)();
  clearSetup(setup);
  (0, _textRenderer.clearText)(); // Gets all the test words and puts it in the wordList array
  //text.split(' ').forEach(word => setup.wordList.push(word));

  text.forEach(function (word) {
    return setup.wordList.push(word);
  });
  (0, _textRenderer.renderText)(text);
  $($('.word')[0]).addClass('currWord');
  $('#text').css('top', '0px');
  $('#timer').html(setup.testTime);
  $('#inp').val('');
  $('#inp').removeAttr('disabled');
  $('#inp').attr('placeholder', 'Type to start');
  $('#inp').focus();
  $('#report').css('display', 'none');
  $('#text').css('display', 'block');
}

;
var _default = {
  newSetup: newSetup,
  setup: setup
};
exports.default = _default;
},{"./text.js":"js/helper/text.js","../view/textRenderer.js":"js/view/textRenderer.js"}],"js/helper/wordClassifier.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classifyWord = classifyWord;
exports.default = void 0;

function classifyWord(setup, currInput) {
  /* Colors the word text based on correctness */
  if (setup.wordList[setup.currWordIndex] === currInput) {
    $($(".word")[setup.currWordIndex]).addClass('correct');
    setup.correctWords++;
  } else {
    $($(".word")[setup.currWordIndex]).addClass('incorrect');
    setup.incorrectWords++;
  }

  setup.totalLetters += setup.wordList[setup.currWordIndex].length;
}

var _default = {
  classifyWord: classifyWord
};
exports.default = _default;
},{}],"js/helper/wordHighlighter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.shiftWordHighlight = shiftWordHighlight;

/* Removes any highlights from current word and highlights the next one */
function shiftWordHighlight(wordIndex) {
  $($('.word')[wordIndex]).removeClass('currentlyRight');
  $($('.word')[wordIndex]).removeClass('currentlyWrong');
  $($('.word')[wordIndex]).removeClass('currWord');
  $($('.word')[wordIndex + 1]).addClass('currWord');
}

var _default = {
  shiftWordHighlight: shiftWordHighlight
};
exports.default = _default;
},{}],"js/helper/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concludeTest = concludeTest;
exports.default = void 0;
exports.handleTest = handleTest;
exports.resetTest = resetTest;

var _init = require("./init.js");

var _draw = require("../view/draw.js");

var _utility = require("./utility.js");

var _setup = require("./setup.js");

var _wordClassifier = require("./wordClassifier.js");

var _wordHighlighter = require("./wordHighlighter.js");

var _checkFunctions = require("./checkFunctions.js");

function resetTest() {
  (0, _setup.newSetup)(_setup.setup);
}

function concludeTest() {
  clearTimeout(_setup.setup.timer);
  $("#info").slideDown();
  _setup.setup.wpm = (0, _utility.calcWPM)(_setup.setup, _setup.setup.testTime);
  _setup.setup.accuracy = (0, _utility.calcAccuracy)(_setup.setup);
  _setup.setup.lastTestResult = _setup.setup.wpm;
  $('#inp').val('');
  $('#inp').attr('disabled', ''); //$('#reset').focus();

  $('#inp').attr('placeholder', 'Tab + ↵ or Reset To Start New Test');
  var canvas = document.getElementById("log");
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  (0, _draw.drawReport)(_setup.setup);
}

function handleTest(currInput) {
  // Initializes test. Takes care of the timer. Ends ( concludes ) the test automatically after certein amount of time.
  (0, _init.init)(_setup.setup);
  $("#info").slideUp(); // Empty spaces do not count

  if (currInput === ' ' || currInput === '\n') return $("#inp").val(''); // If space bar was pressed ( Whole word is submitted )

  if (currInput[currInput.length - 1] === ' ' || currInput[currInput.length - 1] === "\n") {
    console.log("space bar pressed"); // Clears the prevInput

    _setup.setup.prevInput = ''; // Checks if end of line is reached.
    // If so, words container is lifted by certein amount of pixels to bring the
    // new line to the top.

    (0, _checkFunctions.lineBreakCheck)(_setup.setup); // Removes current word highlight and puts it to the next ( new current word ) one

    (0, _wordHighlighter.shiftWordHighlight)(_setup.setup.currWordIndex);
    currInput = currInput.trim(); // Checks how many letters are in correct position

    (0, _checkFunctions.uncorrectedLettersCheck)(currInput, _setup.setup); // Classifies the word based on currectness

    (0, _wordClassifier.classifyWord)(_setup.setup, currInput);
    $("#inp").val('');
    _setup.setup.currWordIndex++;
    console.log(_setup.setup.wpmList);
  } else {
    // Instantaniously checks if till now the word is correct.
    // If not it makes the current word red. Indicating Currently input has some error.
    (0, _checkFunctions.instantSpellCheck)(currInput, _setup.setup);
  }
}

resetTest();
var _default = {
  handleTest: handleTest,
  resetTest: resetTest,
  concludeTest: concludeTest
};
exports.default = _default;
},{"./init.js":"js/helper/init.js","../view/draw.js":"js/view/draw.js","./utility.js":"js/helper/utility.js","./setup.js":"js/helper/setup.js","./wordClassifier.js":"js/helper/wordClassifier.js","./wordHighlighter.js":"js/helper/wordHighlighter.js","./checkFunctions.js":"js/helper/checkFunctions.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _dropdown = _interopRequireDefault(require("./view/dropdown.js"));

var _test = require("./helper/test.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$("#drop").click(function () {
  (0, _dropdown.default)();
});
$("#reset").click(function () {
  (0, _test.resetTest)();
  $("#info").slideUp();
});
$("#inp").on("input", function () {
  (0, _test.handleTest)($("#inp").val());
});
},{"./view/dropdown.js":"js/view/dropdown.js","./helper/test.js":"js/helper/test.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42767" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map