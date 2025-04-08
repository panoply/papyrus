'use strict';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/lz-string@1.5.0/node_modules/lz-string/libs/lz-string.js
var require_lz_string = __commonJS({
  "../../node_modules/.pnpm/lz-string@1.5.0/node_modules/lz-string/libs/lz-string.js"(exports, module) {
    var LZString = function() {
      var f = String.fromCharCode;
      var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
      var baseReverseDic = {};
      function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
          baseReverseDic[alphabet] = {};
          for (var i = 0; i < alphabet.length; i++) {
            baseReverseDic[alphabet][alphabet.charAt(i)] = i;
          }
        }
        return baseReverseDic[alphabet][character];
      }
      var LZString2 = {
        compressToBase64: function(input) {
          if (input == null) return "";
          var res = LZString2._compress(input, 6, function(a) {
            return keyStrBase64.charAt(a);
          });
          switch (res.length % 4) {
            // To produce valid Base64
            default:
            // When could this happen ?
            case 0:
              return res;
            case 1:
              return res + "===";
            case 2:
              return res + "==";
            case 3:
              return res + "=";
          }
        },
        decompressFromBase64: function(input) {
          if (input == null) return "";
          if (input == "") return null;
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrBase64, input.charAt(index));
          });
        },
        compressToUTF16: function(input) {
          if (input == null) return "";
          return LZString2._compress(input, 15, function(a) {
            return f(a + 32);
          }) + " ";
        },
        decompressFromUTF16: function(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString2._decompress(compressed.length, 16384, function(index) {
            return compressed.charCodeAt(index) - 32;
          });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function(uncompressed) {
          var compressed = LZString2.compress(uncompressed);
          var buf = new Uint8Array(compressed.length * 2);
          for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
            var current_value = compressed.charCodeAt(i);
            buf[i * 2] = current_value >>> 8;
            buf[i * 2 + 1] = current_value % 256;
          }
          return buf;
        },
        //decompress from uint8array (UCS-2 big endian format)
        decompressFromUint8Array: function(compressed) {
          if (compressed === null || compressed === void 0) {
            return LZString2.decompress(compressed);
          } else {
            var buf = new Array(compressed.length / 2);
            for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
              buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
            }
            var result = [];
            buf.forEach(function(c) {
              result.push(f(c));
            });
            return LZString2.decompress(result.join(""));
          }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function(input) {
          if (input == null) return "";
          return LZString2._compress(input, 6, function(a) {
            return keyStrUriSafe.charAt(a);
          });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function(input) {
          if (input == null) return "";
          if (input == "") return null;
          input = input.replace(/ /g, "+");
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrUriSafe, input.charAt(index));
          });
        },
        compress: function(uncompressed) {
          return LZString2._compress(uncompressed, 16, function(a) {
            return f(a);
          });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
          if (uncompressed == null) return "";
          var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
          for (ii = 0; ii < uncompressed.length; ii += 1) {
            context_c = uncompressed.charAt(ii);
            if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
              context_dictionary[context_c] = context_dictSize++;
              context_dictionaryToCreate[context_c] = true;
            }
            context_wc = context_w + context_c;
            if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
              context_w = context_wc;
            } else {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 8; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                } else {
                  value = 1;
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = 0;
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 16; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              context_dictionary[context_wc] = context_dictSize++;
              context_w = String(context_c);
            }
          }
          if (context_w !== "") {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 8; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              } else {
                value = 1;
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = 0;
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 16; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
          }
          value = 2;
          for (i = 0; i < context_numBits; i++) {
            context_data_val = context_data_val << 1 | value & 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
          while (true) {
            context_data_val = context_data_val << 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data.push(getCharFromInt(context_data_val));
              break;
            } else context_data_position++;
          }
          return context_data.join("");
        },
        decompress: function(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString2._decompress(compressed.length, 32768, function(index) {
            return compressed.charCodeAt(index);
          });
        },
        _decompress: function(length, resetValue, getNextValue) {
          var dictionary = [], enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = { val: getNextValue(0), position: resetValue, index: 1 };
          for (i = 0; i < 3; i += 1) {
            dictionary[i] = i;
          }
          bits = 0;
          maxpower = Math.pow(2, 2);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          switch (bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 2:
              return "";
          }
          dictionary[3] = c;
          w = c;
          result.push(c);
          while (true) {
            if (data.index > length) {
              return "";
            }
            bits = 0;
            maxpower = Math.pow(2, numBits);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            switch (c = bits) {
              case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 2:
                return result.join("");
            }
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
            if (dictionary[c]) {
              entry = dictionary[c];
            } else {
              if (c === dictSize) {
                entry = w + w.charAt(0);
              } else {
                return null;
              }
            }
            result.push(entry);
            dictionary[dictSize++] = w + entry.charAt(0);
            enlargeIn--;
            w = entry;
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
          }
        }
      };
      return LZString2;
    }();
    if (typeof define === "function" && define.amd) {
      define(function() {
        return LZString;
      });
    } else if (typeof module !== "undefined" && module != null) {
      module.exports = LZString;
    } else if (typeof angular !== "undefined" && angular != null) {
      angular.module("LZString", []).factory("LZString", function() {
        return LZString;
      });
    }
  }
});

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/index-bkac8M6P.js
var plainTextGrammar = {};
var rest = Symbol();
var tokenize = Symbol();
var resolve = (id) => typeof id == "string" ? languages[id] : id;
var languages = {
  plain: plainTextGrammar,
  plaintext: plainTextGrammar,
  text: plainTextGrammar,
  txt: plainTextGrammar
};
var tokenizeText = (text, grammar3) => (grammar3[tokenize] || withoutTokenizer)(text, grammar3);
var withoutTokenizer = (text, grammar3) => {
  var startNode = [text];
  var restGrammar;
  var array = [], i = 0;
  while (restGrammar = resolve(grammar3[rest])) {
    delete grammar3[rest];
    Object.assign(grammar3, restGrammar);
  }
  matchGrammar(text, grammar3, startNode, 0);
  while (array[i++] = startNode[0], startNode = startNode[1])
    ;
  return array;
};
var closingTag = "</span>";
var openingTags = "";
var closingTags = "";
var highlightTokens = (tokens) => {
  var str = "", l = tokens.length, i = 0;
  while (i < l)
    str += stringify(tokens[i++]);
  return str;
};
var stringify = (token) => {
  if (token instanceof Token) {
    var { type, alias, content } = token;
    var prevOpening = openingTags;
    var prevClosing = closingTags;
    var opening = `<span class="token ${type + (alias ? " " + alias : "") + (type == "keyword" && typeof content == "string" ? " keyword-" + content : "")}">`;
    closingTags += closingTag;
    openingTags += opening;
    var contentStr = stringify(content);
    openingTags = prevOpening;
    closingTags = prevClosing;
    return opening + contentStr + closingTag;
  }
  if (typeof token != "string")
    return highlightTokens(token);
  token = token.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  if (closingTags && token.includes("\n")) {
    return token.replace(/\n/g, closingTags + "\n" + openingTags);
  }
  return token;
};
var highlightText = (text, ref) => highlightTokens(tokenizeText(text, resolve(ref)));
var matchGrammar = (text, grammar3, startNode, startPos, rematch) => {
  for (var token in grammar3) {
    if (grammar3[token])
      for (var j = 0, p = grammar3[token], patterns = Array.isArray(p) ? p : [p]; j < patterns.length; ++j) {
        if (rematch && rematch[0] == token && rematch[1] == j) {
          return;
        }
        var patternObj = patterns[j];
        var pattern = patternObj.pattern || patternObj;
        var inside = resolve(patternObj.inside);
        var lookbehind = patternObj.lookbehind;
        var greedy = patternObj.greedy && pattern.global;
        var alias = patternObj.alias;
        for (var currentNode = startNode, pos = startPos; currentNode && (!rematch || pos < rematch[2]); pos += currentNode[0].length, currentNode = currentNode[1]) {
          var str = currentNode[0];
          var removeCount = 0;
          var match, lookbehindLength;
          if (str instanceof Token) {
            continue;
          }
          pattern.lastIndex = greedy ? pos : 0;
          match = pattern.exec(greedy ? text : str);
          if (match && lookbehind && match[1]) {
            lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
          }
          if (greedy) {
            if (!match) {
              break;
            }
            if (match[0]) {
              for (var from = match.index, to = from + match[0].length, l; from >= pos + (l = currentNode[0].length); currentNode = currentNode[1], pos += l)
                ;
              if (currentNode[0] instanceof Token) {
                continue;
              }
              for (var k = currentNode, p = pos; (p += k[0].length) < to; k = k[1], removeCount++)
                ;
              str = text.slice(pos, p);
              match.index -= pos;
            }
          }
          if (!(match && match[0])) {
            continue;
          }
          var from = match.index;
          var matchStr = match[0];
          var after = str.slice(from + matchStr.length);
          var reach = pos + str.length;
          var newToken = new Token(token, inside ? tokenizeText(matchStr, inside) : matchStr, matchStr, alias);
          var next = currentNode, i = 0;
          var nestedRematch;
          while (next = next[1], i++ < removeCount)
            ;
          if (after) {
            if (!next || next[0] instanceof Token)
              next = [after, next];
            else
              next[0] = after + next[0];
          }
          pos += from;
          currentNode[0] = from ? str.slice(0, from) : newToken;
          if (from)
            currentNode = currentNode[1] = [newToken, next];
          else
            currentNode[1] = next;
          if (removeCount) {
            matchGrammar(text, grammar3, currentNode, pos, nestedRematch = [token, j, reach]);
            reach = nestedRematch[2];
          }
          if (rematch && reach > rematch[2])
            rematch[2] = reach;
        }
      }
  }
};
function Token(type, content, matchedStr, alias) {
  this.type = type;
  this.content = content;
  this.alias = alias;
  this.length = matchedStr.length;
}

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/language-DPYOfXzt.js
var _clone = (o, visited) => {
  if (visited.has(o))
    return visited.get(o);
  var copy = o, t = toString.call(o).slice(8, -1);
  if (t == "Object") {
    visited.set(o, copy = {});
    for (var key in o) {
      copy[key] = _clone(o[key], visited);
    }
    if (o[rest])
      copy[rest] = _clone(o[rest], visited);
    if (o[tokenize])
      copy[tokenize] = o[tokenize];
  } else if (t == "Array") {
    visited.set(o, copy = []);
    for (var i = 0, l = o.length; i < l; i++) {
      copy[i] = _clone(o[i], visited);
    }
  }
  return copy;
};
var clone = (o) => _clone(o, /* @__PURE__ */ new Map());
var extend = (id, redef) => Object.assign(clone(languages[id]), redef);
var insertBefore = (grammar3, before, insert) => {
  var temp = {};
  for (var token in grammar3) {
    temp[token] = grammar3[token];
    delete grammar3[token];
  }
  for (var token in temp) {
    if (token == before)
      Object.assign(grammar3, insert);
    if (!insert.hasOwnProperty(token)) {
      grammar3[token] = temp[token];
    }
  }
};
var toString = {}.toString;

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/templating-yZpuvMTN.js
var embeddedIn = (hostGrammar) => (code, templateGrammar) => {
  var host = resolve(hostGrammar);
  var hostCode = "";
  var tokenStack = [];
  var stackLength = 0;
  var templateTokens = withoutTokenizer(code, templateGrammar);
  var i = 0, l = templateTokens.length, position = 0;
  while (i < l) {
    var token = templateTokens[i++];
    var length = token.length;
    var type = token.type;
    if (type && type.slice(0, 6) != "ignore") {
      tokenStack[stackLength++] = [position, token];
      hostCode += " ".repeat(length);
    } else {
      hostCode += code.slice(position, position + length);
    }
    position += length;
  }
  var j = 0;
  var position = 0;
  var walkTokens = (tokens2) => {
    for (var i2 = 0; j < stackLength && i2 < tokens2.length; i2++) {
      var token2 = tokens2[i2];
      var content = token2.content;
      if (Array.isArray(content)) {
        walkTokens(content);
      } else {
        var length2 = token2.length;
        var replacement = [];
        var offset, t, k = 0;
        var pos = position;
        while ([offset, t] = tokenStack[j], offset >= position && offset < position + length2) {
          if (pos < offset)
            replacement[k++] = hostCode.slice(pos, offset);
          pos = offset + t.length;
          replacement[k++] = t;
          if (++j == stackLength)
            break;
        }
        position += length2;
        if (k) {
          if (pos < position)
            replacement[k++] = hostCode.slice(pos, position);
          if (content) {
            token2.content = replacement;
          } else {
            tokens2.splice(i2, 1, ...replacement);
            i2 += k - 1;
          }
        }
      }
    }
  };
  var tokens = host ? tokenizeText(hostCode, host) : [hostCode];
  walkTokens(tokens);
  return tokens;
};

// src/utils/helpers.ts
__toESM(require_lz_string());
var isNode = !!(typeof process !== "undefined" && process.versions != null);
var { assign } = Object;
function has(prop, object) {
  return prop in object;
}
function trimInput(input, trimStart, trimEnd) {
  if (trimStart === true && trimEnd === true) {
    return input.trim();
  } else if (trimStart === true && trimEnd === false) {
    return input.trimStart();
  } else if (trimStart === false && trimEnd === true) {
    return input.trimEnd();
  }
  return input;
}
function getFlems(url) {
  return `<a href="${url}" target="_blank" style="display:flex;align-items:flex-start;justify-content:flex-end"><button type="button" dir="ltr" style="display:none" class="pce-copy" aria-label="Flems"><svg width="1.2em" viewBox="0 0 48 48" overflow="visible" stroke-width="4" stroke-linecap="round" fill="none" stroke="currentColor"><path d="M985.5 465.1 759.1 238.7c-4.6-4.6-11-7.3-17.5-7.3h-27.5c-34.5 0-65.2 22.1-76 54.9l-42.7 128.9c-3.3 10 4.1 20.4 14.7 20.4h76.2c10.5 0 17.9 10.3 14.6 20.2l-30.4 91.6c-3.4 10.1-12.8 17-23.5 17h-83.1c-10.7 0-20.2 6.8-23.5 17l-61.2 184.5c-18.8 56.4-61 99.5-114.5 119.4 11.7 11.7 21.1 12 28.5 12H613c6.6 0 12.9-2.6 17.5-7.3l355.2-355.2c19.1-19.2 19.1-50.4-.2-69.7zm-582 119.4c3.3-9.9-4.1-20.1-14.5-20.1h-74.6c-10.2 0-17.5-10-14.3-19.7l30.5-92.1c3.4-10.1 12.8-17 23.5-17H435c10.7 0 20.2-6.8 23.5-17l61.1-184.1c18.7-56.5 61-99.9 114.6-119.8-11.7-11.7-21.1-12-28.5-12H387.2c-6.6 0-12.9 2.6-17.5 7.3L14.5 465.1c-19.3 19.3-19.3 50.6 0 69.9l226.4 226.4c4.6 4.6 11 7.3 17.5 7.3h26.2c34.6 0 65.2-22.2 76.1-55l42.8-129.2z"/></svg></button></a>`;
}
function getCopy() {
  return `<div style="display:flex;align-items:flex-start;justify-content:flex-end"><button onclick="this.setAttribute('aria-label','Copied!');C=document.createElement('textarea');document.body.appendChild(C);C.value=this.parentElement.parentElement.parentElement.innerText;C.select();document.execCommand('copy');document.body.removeChild(C);" onpointerenter="this.setAttribute('aria-label','Copy')" type="button" dir="ltr" style="display:none" class="pce-copy"><svg width="1.2em" viewBox="0 0 48 48" overflow="visible" stroke-width="4" stroke-linecap="round" fill="none" stroke="currentColor"><rect x="16" y="16" width="30" height="30" rx="3"></rect><path d="M32 9V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v24a3 3 0 0 0 3 3h4"></path></svg></button></div>`;
}
function getLanguageName(language) {
  if (language === null || language === void 0) return null;
  const map = {
    html: "html",
    shell: "bash",
    bash: "bash",
    cli: "bash",
    css: "css",
    scss: "scss",
    liquid: "liquid",
    xml: "xml",
    json: "json",
    javascript: "javascript",
    js: "javascript",
    typescript: "typescript",
    ts: "typescript",
    jsx: "jsx",
    tsx: "tsx",
    yaml: "yaml",
    toml: "toml",
    yml: "yaml",
    plaintext: "plaintext",
    treeview: "treeview",
    tree: "treeview"
  };
  if (language in map) return map[language];
  console.error(`\u{13041} Papyprus: Unsupported language "${language}" provided, will fallback to "plaintext"`);
  return null;
}
function glue(string3, char = " ") {
  return string3.join(char).trimEnd();
}
function uuid() {
  return Math.random().toString(36).slice(2);
}

// src/prism/grammars/xml.ts
function XML() {
  if (has("xml", languages)) return clone(languages.xml);
  const entity = [
    { pattern: /&[a-z\d]{1,8};/i, alias: "named-entity" },
    /&#x?[a-f\d]{1,8};/i
  ];
  languages.xml = {
    comment: {
      pattern: /<!--(?:(?!<!--)[\s\S])*?-->/g,
      greedy: true
    },
    prolog: {
      pattern: /<\?[\s\S]+?\?>/g,
      greedy: true
    },
    doctype: {
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/gi,
      greedy: true,
      inside: {
        "internal-subset": {
          pattern: /(\[)[\s\S]+(?=\]\s*>$)/,
          lookbehind: true,
          inside: "xml"
        },
        string: /"[^"]*"|'[^']*'/,
        punctuation: /^<!|[>[\]]/,
        "doctype-tag": /^DOCTYPE/i,
        name: /\S+/
      }
    },
    cdata: {
      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/gi,
      greedy: true
    },
    tag: {
      pattern: /<\/?(?!\d)[^\s/=>$<%]+(?:\s(?:\s*[^\s/=>]+(?:\s*=\s*(?!\s)(?:"[^"]*"|'[^']*'|[^\s"'=>]+(?=[\s>]))?|(?=[\s/>])))+)?\s*\/?>/g,
      greedy: true,
      inside: {
        punctuation: /^<\/?|\/?>$/,
        tag: {
          pattern: /^\S+/,
          inside: {
            namespace: /^[^:]+:/
          }
        },
        "special-attr": [],
        "attr-value": [
          {
            pattern: /(=\s*)(?:"[^"]*"|'[^']*'|[^\s"'=>]+)/g,
            lookbehind: true,
            greedy: true,
            inside: {
              punctuation: /^["']|["']$/,
              entity
            }
          }
        ],
        "attr-equals": /=/,
        "attr-name": {
          pattern: /\S+/,
          inside: {
            namespace: /^[^:]+:/
          }
        }
      }
    },
    entity,
    "markup-bracket": {
      pattern: /[()[\]{}]/,
      alias: "punctuation"
    }
  };
  return clone(languages.xml);
}

// src/prism/helpers.ts
var replace = (exp, v) => exp.replace(/<(\d+)>/g, (_m, i) => `(?:${v[+i]})`);
var regex = (exp, v, flags) => RegExp(replace(exp, v), flags);
var comment = () => ({ pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/g, greedy: true });
var boolean = () => /\b(?:false|true)\b/;
var string = () => ({ pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\\n])*\1/g, greedy: true });
var addLang = (grammar3, language) => {
  grammar3["language-" + language] = {
    pattern: /[\s\S]+/,
    inside: language
  };
  return grammar3;
};
var addInlined = (tagName, language) => ({
  pattern: RegExp(`(<${tagName}[^>]*>)(?!</${tagName}>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[\\s\\S])+?(?=</${tagName}>)`, "gi"),
  lookbehind: true,
  greedy: true,
  inside: addLang({
    "included-cdata": {
      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
      inside: addLang({
        cdata: /^<!\[CDATA\[|\]\]>$/i
      }, language)
    }
  }, language)
});

// src/prism/grammars/markup.ts
function Markup() {
  const markup = languages.html = languages.markup = XML();
  delete markup["markup-bracket"];
  const punctuation = [
    {
      pattern: /^=/,
      alias: "attr-equals"
    },
    {
      pattern: /^(\s*)["']|["']$/,
      lookbehind: true
    }
  ];
  markup.tag = {
    pattern: /<\/?(?!\d)[^\s>/=$<%]+(?:\s(?:\s*[^\s>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>/]+/,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>/:]+:/
        }
      },
      "special-attr": [],
      "spx-attr": [
        {
          pattern: /(spx-node)=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          lookbehind: true,
          global: true,
          inside: {
            "dot-notation": {
              pattern: /[a-zA-Z0-9]+\.[a-zA-Z0-9]+/,
              inside: {
                key: /[a-zA-Z0-9]+(?=\.)/,
                dot: /\./,
                val: /^[^.][a-zA-Z0-9]+/
              }
            },
            punctuation
          }
        },
        {
          pattern: /(spx-component)=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          lookbehind: true,
          global: true,
          inside: {
            "component-name": {
              pattern: /[a-zA-Z0-9-]+/,
              inside: {
                alias: /\b(as)\b/
              }
            },
            separator: /[|,]/,
            punctuation
          }
        },
        {
          pattern: /(spx-bind)=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          lookbehind: true,
          global: true,
          inside: {
            "bind-notation": {
              pattern: /[a-zA-Z0-9]+\.[a-zA-Z0-9]+/,
              inside: {
                "event-key": /[a-zA-Z0-9]+(?=\.)/,
                dot: /\./,
                val: /^[^.][a-zA-Z0-9]+/
              }
            },
            punctuation
          }
        },
        {
          pattern: /(spx@[a-z:]+)=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          lookbehind: true,
          global: true,
          inside: {
            "dot-notation": {
              pattern: /[a-zA-Z0-9]+\.[a-zA-Z0-9]+\s*/,
              inside: {
                "event-key": /[a-zA-Z0-9]+(?=\.)/,
                dot: /\./,
                "event-method": /^[^.][a-zA-Z0-9]+/
              }
            },
            "event-struct": {
              pattern: /\{[\s\S]*?\}\s*/,
              inside: {
                delim: /[{}]/,
                comma: /,/,
                option: /[a-z]+/
              }
            },
            punctuation
          }
        }
      ],
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation,
          script: {
            pattern: /[[{][\s\S]*?[\]}]/,
            inside: {
              [tokenize]: embeddedIn("javascript")
            }
          },
          integer: /(\d*)/,
          boolean: /\b(true|false)\b/
        }
      },
      "attr-name": {
        pattern: /[^\s>/]+/,
        inside: {
          "spx-name": {
            pattern: /(spx-target|spx-morph|spx-replace|spx-hover|spx-eval|spx-data|spx-component|spx-node|spx-bind|spx-watch|spx-hydrate|spx-intersect|spx-prepend|spx-append|spx-threshold|spx-proximity|spx-position|spx-progress|spx-scroll|spx-cache|spx-disable|spx-history)\b/
          },
          "at-notation": {
            pattern: /[a-zA-Z0-9]+@[a-zA-Z0-9]+$/,
            inside: {
              prefix: /^[\w-]+?(?=@)/,
              symbol: /[@]/,
              suffix: /[a-zA-Z0-9]+/
            }
          },
          "at-window-notation": {
            pattern: /[a-zA-Z0-9]+@window:[a-zA-Z0-9]+$/,
            inside: {
              prefix: /^[\w-]+?(?=@)/,
              window: /\bwindow\b(?=:)/,
              symbol: /[:@]/,
              suffix: /[a-zA-Z0-9]+$/
            }
          },
          "ns-notation": {
            pattern: /[a-zA-Z0-9-]+:[a-zA-Z0-9-]+$/,
            inside: {
              prefix: /^[\w-]+?(?=:)/,
              symbol: /:/,
              suffix: /[a-zA-Z0-9-]+?$/
            }
          },
          namespace: /^[^\s>/:]+:/,
          punctuation: [
            {
              pattern: /=(?=["'])/,
              alias: "attr-equals"
            },
            {
              pattern: /["']|["']/,
              lookbehind: true
            }
          ]
        }
      },
      punctuation: /\/?>/
    }
  };
  insertBefore(markup, "cdata", {
    style: addInlined("style", "css"),
    script: addInlined("script", "javascript")
  });
}

// src/prism/grammars/liquid.ts
function Liquid() {
  const markup = clone(languages.markup);
  delete markup["markup-bracket"];
  const inside = {
    comment: {
      global: true,
      pattern: /\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}|\{%-?\s*#[\s\S]+?-?%\}/
    },
    "tag-name": {
      lookbehind: true,
      pattern: /({%-?\s*)([a-z_$][\w$]+)/
    },
    output: {
      lookbehind: true,
      pattern: /({{-?\s*)([a-z_$][\w$]+)/
    },
    delimiters: {
      pattern: /{%|{{|}}|%}/
    },
    object: {
      lookbehind: true,
      pattern: /\b[a-z_$]+(?=\.\s*)/i
    },
    property: {
      lookbehind: true,
      pattern: /(\.\s*)[a-z_$][\w$]+(?=[.\s])/i
    },
    filter: {
      lookbehind: true,
      pattern: /(\|)\s*(\w+)(?=[:]?)/
    },
    string: {
      lookbehind: true,
      pattern: /['"].*?['"]/
    },
    punctuation: {
      global: true,
      lookbehind: true,
      pattern: /[.,|:?]/
    },
    operator: {
      pattern: /[!=]=|<|>|[<>]=?|[|?:=-]|\b(?:in|and|contains(?=\s)|or)\b/
    },
    array: {
      lookbehind: true,
      pattern: /(\s+in\s+)(\b[a-z_$][\w$]+)(?=\.\s*)/
    },
    boolean: {
      pattern: /\b(?:true|false|nil)\b/
    },
    number: {
      pattern: /\b(?:\d+)\b/
    },
    parameter: {
      lookbehind: true,
      global: true,
      greedy: true,
      pattern: /([,:])\s*(\w+)(?=:)/i
    }
  };
  inside["liquid-tag"] = {
    pattern: /(\bliquid\s+)[\s\S]*?(?=-?%})/,
    global: true,
    greedy: true,
    lookbehind: true,
    inside: Object.assign(clone(inside), {
      "tag-name": {
        pattern: /\b(?:end)?(?:form|paginate|capture|case|comment|for|if|raw|tablerow|unless|include|layout|section|assign|liquid|break|continue|cycle|decrement|echo|increment|render)\b/
      }
    })
  };
  insertBefore(languages.css, "property", {
    liquid: {
      pattern: /{[{%][\s\S]+[%}]}/,
      inside
    }
  });
  const liquid = languages.liquid = Object.assign(markup, {
    liquid: {
      pattern: /({{|{%)[\s\S]+(}}|%})/,
      global: true,
      inside
    }
  });
  liquid.tag.alias = "markup";
  liquid.tag.inside["attr-value"].inside.liquid = {
    alias: "liquid-string",
    pattern: /{[{%]-?[\s\S]+-?[%}]}/,
    inside: liquid
  };
  liquid.tag.inside["special-attr"].push({
    pattern: /{[{%]-?[\s\S]+-?[%}]}/,
    inside
  });
  delete liquid.tag.inside["attr-value"].inside.number;
  delete liquid.tag.inside["attr-value"].inside.boolean;
  delete liquid.tag.inside["attr-value"].inside.script;
  delete liquid.tag.inside["attr-value"].inside["dot-notation"];
  languages.liquid["language-css"] = {
    inside: languages.css,
    lookbehind: true,
    pattern: /(\{%-?\s*style(?:sheet)?\s*-?%\})([\s\S]+?)(?=\{%-?\s*endstyle(?:sheet)?\s*-?%\})/
  };
  languages.liquid["language-javascript"] = {
    inside: languages.javascript,
    lookbehind: true,
    pattern: /(\{%-?\s*javascript\s*-?%\})([\s\S]*?)(?=\{%-?\s*endjavascript\s*-?%\})/
  };
  languages.liquid["language-json"] = {
    inside: languages.json,
    lookbehind: true,
    pattern: /(\{%-?\s*schema\s*-?%\})([\s\S]+?)(?=\{%-?\s*endschema\s*-?%\})/
  };
}

// src/prism/grammars/typescript.ts
function TypeScript() {
  const className = {
    pattern: /(\b(?:extends|implements|instanceof|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
    lookbehind: true,
    greedy: true
  };
  const typescript = languages.ts = languages.typescript = extend("js", {
    "class-name": className
  });
  insertBefore(typescript, "operator", {
    builtin: {
      pattern: /(\b(?:Array|Function|Promise|any|boolean|console|never|number|object|string|symbol|unknown)\b\s+)/,
      global: true
    },
    "literal-property": {
      pattern: /(\s+=\s+(?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: true,
      alias: "property"
    }
  });
  typescript.keyword.push(
    /\b(?:abstract|declare|is|keyof|readonly|require|static)\b/,
    // keywords that have to be followed by an identifier
    /\b(?:asserts|infer|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
    // This is for `import type *, {}`
    /\btype\b(?=\s*(?:[{*]|$))/
  );
  delete typescript.parameter;
  delete typescript["literal-property"];
  const typeInside = className.inside = Object.assign({}, typescript);
  delete typeInside["class-name"];
  delete typeInside["maybe-class-name"];
  insertBefore(typescript, "function", {
    decorator: {
      pattern: /@[$\w\xa0-\uffff]+/,
      inside: {
        at: {
          pattern: /^@/,
          alias: "operator"
        },
        function: /.+/
      }
    },
    "generic-function": {
      // e.g. foo<T extends "bar" | "baz">( ...
      pattern: /#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+\s*<(?:[^<>=]|=[^<]|=?<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/g,
      greedy: true,
      inside: {
        generic: {
          pattern: /<[\s\S]+/,
          // everything after the first <
          alias: "class-name",
          inside: typeInside
        },
        function: /\S+/
      }
    }
  });
  languages.typescript = extend("javascript", {
    "class-name": {
      pattern: /(\b(?:extends|implements|instanceof|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: true,
      greedy: true,
      inside: null
    },
    builtin: {
      pattern: /(\b(?:Array|Function|Promise|any|boolean|console|never|object|number|string|symbol|unknown)\b\s+)/,
      global: true
    },
    parameter: [
      {
        pattern: /(\s*[a-z_$]*?\s*\()\s*[a-z_$][\w$]+(?=\?:\s*)/i,
        lookbehind: true,
        global: true,
        alias: "optional"
      },
      {
        pattern: /(\s*[a-z_$]*?\s*\()\s*[a-z_$][\w$]+(?=:\s*)/i,
        lookbehind: true,
        global: true
      },
      {
        pattern: /([a-z_$]*?\??:\s+)\b(?:any|object|boolean|never|number|string|symbol|unknown)\b\s*(?=[),|])/i,
        lookbehind: true,
        global: true,
        greedy: true,
        alias: "builtin"
      },
      {
        pattern: /(\s*[a-z_$]*?\s*\(.*?,\s+)[a-z_$][\w$]+(?=\??:)/i,
        lookbehind: true,
        greedy: true
      }
    ],
    "punctuation-chars": {
      pattern: /[.,]/,
      global: true
    },
    semi: {
      pattern: /[;]/,
      global: true
    },
    nil: {
      pattern: /\b(?:null|undefined)\b/
    },
    "browser-objects": {
      pattern: /\b(?:window|document|console)\b/
    },
    types: [
      {
        pattern: /\s*\b(?:any|boolean|console|object|never|number|string|symbol|unknown|Promise|interface)\b\s*(?![:.])/,
        global: true
      },
      {
        pattern: /\s+\b(?:any|boolean|object|console|never|number|string)(?=\[\])/,
        global: true
      }
    ],
    "type-array": {
      pattern: /\[\]/,
      global: true
    },
    "type-object": {
      pattern: /\{\}/,
      global: true
    },
    "return-type": {
      pattern: /(\)):(?=\s)/,
      global: true,
      lookbehind: true
    },
    "extends-class": {
      lookbehind: true,
      pattern: /(extends)\s+\b[a-z_$][\w$]*\.[a-z_$][\w$.]*\s*(?=[<{])/i,
      global: true,
      greedy: true,
      inside: {
        object: /(\s+)\b([a-z_$][\w$]*)(?=[.])/i,
        punctuation: /\./,
        class: {
          pattern: /(\b[\w$]*\.)\b([a-z_$][\w$]*)\s+/i,
          lookbehind: true,
          global: true,
          greedy: true
        }
      }
    },
    flow: {
      pattern: /\b(?:return|await)\b/
    },
    method: {
      pattern: /(\.\s*)[a-z_$][\w$]*(?=(\())/i,
      lookbehind: true
    },
    "import-type": {
      pattern: /(\bimport)\b \b(?:type)\b(?= )/,
      lookbehind: true
    }
  });
}

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/prism/languages/css.js
var string2 = /(?:"(?:\\[^]|[^\\\n"])*"|'(?:\\[^]|[^\\\n'])*')/g;
var stringSrc = string2.source;
var atruleInside = {
  "rule": /^@[\w-]+/,
  "selector-function-argument": {
    pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^)]*\))*\))+(?=\s*\))/,
    lookbehind: true,
    alias: "selector"
  },
  "keyword": {
    pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
    lookbehind: true
  }
  // See rest below
};
atruleInside[rest] = languages.css = {
  "comment": /\/\*[^]*?\*\//,
  "atrule": {
    pattern: RegExp(`@[\\w-](?:[^;{\\s"']|\\s+(?!\\s)|${stringSrc})*?(?:;|(?=\\s*\\{))`),
    inside: atruleInside
  },
  "url": {
    // https://drafts.csswg.org/css-values-3/#urls
    pattern: RegExp(`\\burl\\((?:${stringSrc}|(?:[^\\\\
"')=]|\\\\[^])*)\\)`, "gi"),
    greedy: true,
    inside: {
      "function": /^url/i,
      "punctuation": /^\(|\)$/,
      "string": {
        pattern: RegExp("^" + stringSrc + "$"),
        alias: "url"
      }
    }
  },
  "selector": {
    pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|${stringSrc})*(?=\\s*\\{)`),
    lookbehind: true
  },
  "string": {
    pattern: string2,
    greedy: true
  },
  "property": {
    pattern: /(^|[^-\w\xa0-\uffff])(?!\d)(?:(?!\s)[-\w\xa0-\uffff])+(?=\s*:)/i,
    lookbehind: true
  },
  "important": /!important\b/i,
  "function": {
    pattern: /(^|[^-a-z\d])[-a-z\d]+(?=\()/i,
    lookbehind: true
  },
  "punctuation": /[(){},:;]/
};

// src/prism/grammars/css.ts
var colors = () => {
  const unit = {
    pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/,
    lookbehind: true
  };
  const number = {
    pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
    lookbehind: true
  };
  const color = [
    {
      pattern: /(^|[^\w-])(?:(?:alice|cadet|cornflower|deepsky|dodger|midnight|powder|royal|sky|steel)blue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blueviolet|brown|burlywood|chartreuse|chocolate|coral|cornsilk|crimson|(?:dark)?(?:blue|cyan|goldenrod|gr[ae]y|green|khaki|magenta|olivegreen|orange|orchid|red|salmon|seagreen|slateblue|slategr[ae]y|turquoise|violet)|deeppink|dimgr[ae]y|firebrick|floralwhite|(?:forest|lawn|lime|pale|spring)green|fuchsia|gainsboro|ghostwhite|gold|greenyellow|honeydew|hotpink|indianred|indigo|ivory|lavender|lavenderblush|lemonchiffon|light(?:blue|coral|cyan|goldenrodyellow|gr[ae]y|green|pink|salmon|seagreen|skyblue|slategr[ae]y|steelblue|yellow)|lime|linen|maroon|medium(?:aquamarine|blue|orchid|purple|seagreen|slateblue|springgreen|turquoise|violetred)|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orangered|palegoldenrod|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|purple|rebeccapurple|rosybrown|saddlebrown|sandybrown|seashell|sienna|silver|snow|tan|teal|thistle|tomato|transparent|wheat|white|whitesmoke|yellow|yellowgreen)(?![\w-])/i,
      lookbehind: true
    },
    {
      pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
      inside: {
        function: /^[^(]+/,
        unit,
        number,
        punctuation: /[(),]/
      }
    }
  ];
  return {
    color,
    unit,
    number
  };
};
function CSS() {
  const { color, unit, number } = colors();
  const string3 = /(?:"(?:\\[\s\S]|[^\\\n"])*"|'(?:\\[\s\S]|[^\\\n'])*')/g;
  const stringSrc2 = string3.source;
  const atruleInside2 = {
    rule: /^@[\w-]+/,
    "selector-function-argument": {
      pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^)]*\))*\))+(?=\s*\))/,
      lookbehind: true,
      alias: "selector"
    },
    keyword: {
      pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
      lookbehind: true
    }
    // See rest below
  };
  atruleInside2[rest] = languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: RegExp(`@[\\w-](?:[^;{\\s"']|\\s+(?!\\s)|${stringSrc2})*?(?:;|(?=\\s*\\{))`),
      inside: atruleInside2
    },
    url: {
      // https://drafts.csswg.org/css-values-3/#urls
      pattern: RegExp(`\\burl\\((?:${stringSrc2}|(?:[^\\\\
"')=]|\\\\[\\s\\S])*)\\)`, "gi"),
      greedy: true,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: {
          pattern: RegExp("^" + stringSrc2 + "$"),
          alias: "url"
        }
      }
    },
    selector: {
      pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|${stringSrc2})*(?=\\s*\\{)`),
      lookbehind: true
    },
    string: {
      pattern: string3,
      greedy: true
    },
    property: {
      pattern: /(^|[^-\w\xa0-\uffff])(?!\d)(?:(?!\s)[-\w\xa0-\uffff])+(?=\s*:)/i,
      lookbehind: true
    },
    important: /!important\b/i,
    function: {
      pattern: /(^|[^-a-z\d])[-a-z\d]+(?=\()/i,
      lookbehind: true
    },
    punctuation: /[(){},:;]/
  };
  const css = languages.css;
  css.selector.inside = css.atrule.inside["selector-function-argument"].inside = {
    "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
    "pseudo-class": /:[-\w]+/,
    class: /\.[-\w]+/,
    id: /#[-\w]+/,
    attribute: {
      pattern: /\[(?:[^[\]"']|(["'])(?:\\[\s\S]|(?!\1)[^\\\n])*\1)*\]/g,
      greedy: true,
      inside: {
        punctuation: /^\[|\]$/,
        "case-sensitivity": {
          pattern: /(\s)[si]$/i,
          lookbehind: true,
          alias: "keyword"
        },
        namespace: {
          pattern: /^(\s*)(?:(?!\s)[-*\w\xa0-\uffff])*\|(?!=)/,
          lookbehind: true,
          inside: {
            punctuation: /\|$/
          }
        },
        "attr-name": {
          pattern: /^(\s*)(?:(?!\s)[-\w\xa0-\uffff])+/,
          lookbehind: true
        },
        "attr-value": {
          pattern: /(=\s*)(?:(?!\s)[-\w\xa0-\uffff])+(?=\s*$)|(["'])(?:\\[\s\S]|(?!\2)[^\\\n])*\2/,
          lookbehind: true
        },
        operator: /[|~*^$]?=/
      }
    },
    "n-th": [
      {
        pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
        lookbehind: true,
        inside: {
          number: /[\dn]+/,
          operator: /[+-]/
        }
      },
      {
        pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
        lookbehind: true
      }
    ],
    combinator: />|\+|~|\|\|/,
    // the `tag` token has been existed and removed.
    // because we can't find a perfect tokenize to match it.
    // if you want to add it, please read https://github.com/PrismJS/prism/pull/2373 first.
    punctuation: /[(),]/
  };
  insertBefore(css, "property", {
    variable: {
      pattern: /(^|[^-\w\xa0-\uffff])--(?!\d)(?:(?!\s)[-\w\xa0-\uffff])*/i,
      lookbehind: true
    }
  });
  insertBefore(css, "function", {
    operator: {
      pattern: /(\s)[/*+-](?!\S)/,
      lookbehind: true
    },
    // CAREFUL!
    // Previewers and Inline color use hexcode and color.
    hexcode: {
      pattern: /\B#[a-f\d]{3,8}\b/i,
      alias: "color"
    },
    color,
    // it's important that there is no boundary assertion after the hex digits
    entity: /\\[a-f\d]{1,8}/i,
    unit,
    number
  });
}

// src/prism/grammars/javascript.ts
function JavaScript() {
  const javascript = {};
  const markuptags = [
    "a",
    "abbr",
    "acronym",
    "address",
    "applet",
    "area",
    "article",
    "aside",
    "audio",
    "audio",
    "audio",
    "b",
    "base",
    "basefont",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "center",
    "cite",
    "code",
    "col",
    "colgroup",
    "command",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "fieldset",
    "figcaption",
    "figure",
    "font",
    "footer",
    "form",
    "frame",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "isindex",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "marquee",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "nav",
    "noframes",
    "noscript",
    "object",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strike",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "svg",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "tt",
    "u",
    "ul",
    "var",
    "video",
    "video",
    "video",
    "wbr"
  ].join("|");
  const sinmethods = [
    "redrawing",
    "sleep",
    "with",
    "isAttrs",
    "isServer",
    "pathmode",
    "redraw",
    "redraw",
    "mount",
    "css",
    "css",
    "css",
    "css",
    "style",
    "animate",
    "http",
    "live",
    "event",
    "on",
    "trust",
    "route",
    "window",
    "scroll",
    "View",
    "error",
    "jsxFragment"
  ].join("|");
  const { color, unit, number } = colors();
  languages.javascript = languages.js = Object.assign(javascript, {
    "doc-comment": {
      pattern: /\/\*\*(?!\/)[\s\S]*?(?:\*\/|$)/g,
      greedy: true,
      alias: "comment",
      inside: "jsdoc"
    },
    comment: comment(),
    hashbang: {
      pattern: /^#!.*/g,
      greedy: true,
      alias: "comment"
    },
    sin: {
      pattern: new RegExp(`([ 	]*)\\bs(?=(?:[\`(]|\\.(?:${sinmethods})))`, "g"),
      lookbehind: true
    },
    "template-sin": {
      pattern: new RegExp(`(s)\`(?:${markuptags})\\b(?:\\[\\s\\S]|\\\${(?:[^{}]|\\{(?:[^{}]|\\{[^}]*\\})*\\})*\\}|(?!\\$\\{)[^\\\`])*\``, "g"),
      greedy: true,
      lookbehind: true,
      inside: {
        "template-punctuation": {
          pattern: /^`|`$/,
          alias: "string"
        },
        "sin-tag": new RegExp(`^(?:${markuptags})\\b`),
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\\\)*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/,
          lookbehind: true,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            [rest]: javascript
          }
        },
        "sin-css": {
          pattern: /[\s\S]+/,
          inside: {
            property: {
              pattern: /(^[ \t]*|\n[ \t]*)[a-zA-Z-]+(?=[ \t])/g,
              lookbehind: true
            },
            value: {
              pattern: /(^[ \t]*|\n[ \t]*[a-zA-Z]*[ \t]*)(\S+)/g,
              lookbehind: true,
              inside: {
                hexcode: {
                  pattern: /\B#[a-f\d]{3,8}\b/i,
                  alias: "color"
                },
                color,
                unit,
                number
              }
            }
          }
        }
      }
    },
    "template-string": {
      pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}|(?!\$\{)[^\\`])*`/g,
      greedy: true,
      inside: {
        "template-punctuation": {
          pattern: /^`|`$/,
          alias: "string"
        },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\\\)*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/,
          lookbehind: true,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            [rest]: javascript
          }
        },
        string: {
          pattern: /[\s\S]+/
        }
      }
    },
    "template-spx": {
      pattern: /(spx\.dom)`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}|(?!\$\{)[^\\`])*`/g,
      greedy: true,
      inside: {
        "spx-object": {
          pattern: /\bspx\b\.\bdom\b/,
          inside: {
            "dot": {
              pattern: /\./,
              alias: "punctuation-chars"
            },
            "dom": {
              pattern: /\bdom\b/,
              alias: "punctuation"
            }
          }
        },
        "template-punctuation": {
          pattern: /^`|`$/,
          alias: "string"
        },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\\\)*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/,
          lookbehind: true,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            [rest]: javascript
          }
        },
        string: {
          pattern: /[\s\S]+/,
          inside: {
            [rest]: languages.html
          }
        }
      }
    },
    "string-property": {
      pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\[\s\S]|(?!\2)[^\\\n])*\2(?=\s*:)/mg,
      lookbehind: true,
      greedy: true,
      alias: "property"
    },
    string: string(),
    regex: {
      pattern: /((?:^|[^$\w\xa0-\uffff"'`.)\]\s]|\b(?:return|yield))\s*)\/(?:(?:\[(?:\\.|[^\\\n\]])*\]|\\.|[^\\\n/[])+\/[dgimyus]{0,7}|(?:\[(?:\\.|[^\\\n[\]]|\[(?:\\.|[^\\\n[\]]|\[(?:\\.|[^\\\n[\]])*\])*\])*\]|\\.|[^\\\n/[])+\/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?!\/\*|[^()[\]{}.,:;?`\n%&|^!=<>/*+-]))/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "regex-flags": /\w+$/,
        "regex-delimiter": /^\/|\/$/,
        "regex-source": {
          pattern: /.+/,
          alias: "language-regex",
          inside: "regex"
        }
      }
    },
    "class-name": [
      {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new)\s+)(?!\d)(?:(?!\s)[$\w.\xa0-\uffff])+/,
        lookbehind: true,
        inside: {
          punctuation: /\./
        }
      },
      {
        pattern: /(^|[^$\w\xa0-\uffff]|\s)(?![a-z\d])(?:(?!\s)[$\w\xa0-\uffff])+(?=\.(?:constructor|prototype)\b)/,
        lookbehind: true
      }
    ],
    // This must be declared before keyword because we use "function" inside the look-forward
    "function-variable": {
      pattern: /#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^)]*\))*\)|(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+)\s*=>))/,
      alias: "function",
      inside: {
        "maybe-class-name": /^[A-Z].*/
      }
    },
    parameter: [
      /(function(?:\s+(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      /(^|[^$\w\xa0-\uffff]|\s)(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*=>)/,
      /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|continue|default|do|else|finally|for|if|return|switch|throw|try|while|yield|class|const|debugger|delete|enum|extends|function|[gs]et|export|from|import|implements|in|instanceof|interface|let|new|null|of|package|private|protected|public|static|super|this|typeof|undefined|var|void|with)(?![$\w\xa0-\uffff]))(?:(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/
    ].map((pattern) => ({
      pattern,
      lookbehind: true,
      inside: javascript
    })),
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    keyword: [
      {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|export|from(?=\s*(?:['"]|$))|import)\b/,
        lookbehind: true,
        alias: "module"
      },
      {
        pattern: /(\b(?:class)\b\s+)/,
        alias: "class"
      },
      {
        pattern: /((?:^|\})\s*)catch\b/,
        lookbehind: true,
        alias: "control-flow"
      },
      {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:await|break|case|continue|default|do|else|finally(?=\s*(?:\{|$))|for|if|return|switch|throw|try|while|yield|import|as|export|from|default|static\s+)\b/,
        lookbehind: true,
        alias: "control-flow"
      },
      {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|const|debugger|delete|enum|extends|function|(?:get|set)(?=\s*(?:[#[$\w\xA0-\uFFFF]|$))|implements|in|instanceof|let|new|null|of|package|private|protected|public|super|this|typeof\s+|undefined|var|void|\s+with)\b/,
        lookbehind: true,
        inside: {
          this: /\b(this)\b/
        }
      },
      {
        pattern: /(\s+)(\b(?:Boolean|String|Number|Object|Array)\b)/,
        alias: "type-constructors"
      }
    ],
    boolean: boolean(),
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    function: {
      pattern: /#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      inside: {
        "maybe-class-name": /^[A-Z].*/
      }
    },
    number: {
      pattern: /(^|[^$\w])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][a-fA-F\d]+(?:_[a-fA-F\d]+)*n?|\d+(?:_\d+)*n|(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?)(?![$\w])/,
      lookbehind: true
    },
    "literal-property": {
      pattern: /([\n,{][ \t]*|[ \t]*)(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*:)/,
      lookbehind: true,
      alias: "property"
    },
    operator: [
      {
        pattern: /=>/,
        alias: "arrow"
      },
      /--|\+\+|(?:\*\*|&&|\|\||[!=]=|>>>?|<<|[%&|^!=<>/*+-]|\?\?)=?|\.{3}|\?(?!\.)|~|:/
    ],
    "property-access": {
      pattern: /(\.\s*)#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+/,
      lookbehind: true,
      inside: {
        "maybe-class-name": /^[A-Z].*/
      }
    },
    "maybe-class-name": {
      pattern: /(^|[^$\w\xa0-\uffff])[A-Z][$\w\xa0-\uffff]+/,
      lookbehind: true
    },
    punctuation: /\?\.|[()[\]{}.,:;]/
  });
  insertBefore(languages.javascript, "keyword", {
    variable: {
      pattern: /\b(?:const|var|let)\b/
    },
    "function-name": {
      pattern: /\b(?:function)\b/
    },
    property: {
      lookbehind: true,
      pattern: /(?:import|as|export|from|default)(?=[:])/
    },
    operation: {
      pattern: /(\b(?:typeof|new|of|delete|void|readonly)\b\s+)/,
      global: true
    },
    object: {
      lookbehind: true,
      pattern: /(\s+)\b([a-z_$][\w$]*)(?=[.])/i,
      global: true,
      greedy: true,
      inside: {
        this: /\b(this)\b/
      }
    },
    "punctuation-chars": {
      pattern: /[.,]/,
      global: true
    },
    semi: {
      pattern: /[;]/,
      global: true
    },
    nil: {
      pattern: /\b(?:null|undefined)\b/
    },
    "browser-objects": {
      pattern: /\b(?:window|document|console|spx)\b/
    },
    flow: {
      pattern: /(\b(?:return|await|new)\b\s+)/
    },
    numeric: {
      pattern: /(\+{2}|-{2})\w+/,
      lookbehind: true,
      inside: {
        this: /\b(this)\b/
      }
    },
    bracket: {
      pattern: /(\w+)\[.*?\]/,
      lookbehind: true,
      inside: {
        keyword: {
          pattern: /\w+/
        },
        punctuation: {
          pattern: /\[|\]/
        }
      }
    },
    "import-type": {
      pattern: /(\bimport)\b \b(?:type)\b(?= )/,
      lookbehind: true
    },
    "spx-object": {
      pattern: /(spx)\./,
      global: true
    },
    "paren-brace-open": {
      pattern: /(\()(\{)/,
      lookbehind: true,
      inside: {
        brace: /\{/
      }
    },
    "paren-brace-close": {
      pattern: /(\})(?=\))/,
      inside: {
        brace: /\}/
      }
    }
  });
}

// src/prism/grammars/yaml.ts
function YAML() {
  const anchorOrAlias = /[*&][^\s[\]{},]+/;
  const tag = /!(?:<[\w%#;/?:@&=$,.!~*'()[\]+-]+>|(?:[a-zA-Z\d-]*!)?[\w%#;/?:@&=$.~*'()+-]+)?/;
  const properties = `(?:${tag.source}(?:[ 	]+${anchorOrAlias.source})?|${anchorOrAlias.source}(?:[ 	]+${tag.source})?)`;
  const plainKey = replace(
    /(?:[^\s\0-\x08\x0e-\x1f!"#%&'*,:>?@[\]{}`|\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff-]|[?:-]<0>)(?:[ \t]*(?:(?![#:])<0>|:<0>))*/.source,
    [/[^\s\0-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source]
  );
  const string3 = /"(?:\\.|[^\\\n"])*"|'(?:\\.|[^\\\n'])*'/.source;
  const createValuePattern = (value, flags) => regex(
    /([:,[{-]\s*(?:\s<0>[ \t]+)?)<1>(?=[ \t]*(?:$|,|\]|\}|(?:\n\s*)?#))/.source,
    [properties, value],
    flags
  );
  languages.yml = languages.yaml = {
    scalar: {
      pattern: regex(/([:-]\s*(?:\s<0>[ \t]+)?[|>])[ \t]*(?:(\n[ \t]+)\S.*(?:\2.+)*)/.source, [properties]),
      lookbehind: true,
      alias: "string"
    },
    comment: /#.*/,
    key: {
      pattern: regex(
        /((?:^|[:,[{\n?-])[ \t]*(?:<0>[ \t]+)?)<1>(?=\s*:\s)/.source,
        [properties, "(?:" + plainKey + "|" + string3 + ")"],
        "g"
      ),
      lookbehind: true,
      greedy: true,
      alias: "atrule"
    },
    directive: {
      pattern: /(^[ \t]*)%.+/m,
      lookbehind: true,
      alias: "important"
    },
    datetime: {
      pattern: createValuePattern(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d\d:\d\d(?:\.\d*)?(?:[ \t]*(?:Z|[+-]\d\d?(?::\d\d)?))?|\d{4}-\d\d-\d\d|\d\d?:\d\d(?::\d\d(?:\.\d*)?)?/.source, "m"),
      lookbehind: true,
      alias: "number"
    },
    boolean: {
      pattern: createValuePattern(/false|true/.source, "im"),
      lookbehind: true,
      alias: "important"
    },
    null: {
      pattern: createValuePattern(/null|~/.source, "im"),
      lookbehind: true,
      alias: "important"
    },
    string: {
      pattern: createValuePattern(string3, "mg"),
      lookbehind: true,
      greedy: true
    },
    number: {
      pattern: createValuePattern(/[+-]?(?:0x[a-f\d]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, "im"),
      lookbehind: true
    },
    tag,
    important: anchorOrAlias,
    punctuation: /---|[:[\]{},|>?-]|\.{3}/
  };
}

// src/prism/grammars/toml.ts
function Toml() {
  const key = /(?:[\w-]+|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*")/.source;
  const insertKey = (pattern) => pattern.replace(/__/g, key);
  languages.toml = {
    comment: {
      pattern: /#.*/,
      greedy: true
    },
    table: {
      pattern: RegExp(insertKey(/(^[\t ]*\[\s*(?:\[\s*)?)__(?:\s*\.\s*__)*(?=\s*\])/.source), "m"),
      lookbehind: true,
      greedy: true,
      alias: "class-name"
    },
    key: {
      pattern: RegExp(insertKey(/(^[\t ]*|[{,]\s*)__(?:\s*\.\s*__)*(?=\s*=)/.source), "m"),
      lookbehind: true,
      greedy: true,
      alias: "property"
    },
    string: {
      pattern: /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,
      greedy: true
    },
    date: [
      {
        // Offset Date-Time, Local Date-Time, Local Date
        pattern: /\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i,
        alias: "number"
      },
      {
        // Local Time
        pattern: /\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/,
        alias: "number"
      }
    ],
    number: /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,
    boolean: /\b(?:false|true)\b/,
    punctuation: /[.,=[\]{}]/
  };
}

// src/prism/grammars/scss.ts
function SCSS() {
  const scss = languages.scss = extend("css", {
    comment: comment(),
    atrule: {
      pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
      inside: {
        rule: /@[\w-]+/,
        [rest]: "scss"
      }
    },
    // url, compassified
    url: /(?:[-a-z]+-)?url(?=\()/i,
    // CSS selector regex is not appropriate for Sass
    // since there can be lot more things (var, @ directive, nesting..)
    // a selector must start at the end of a property or after a brace (end of other rules or nesting)
    // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
    // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
    // can "pass" as a selector- e.g: proper#{$erty})
    // this one was hard to do, so please be careful if you edit this one :)
    selector: {
      // Initial look-ahead is used to prevent matching of blank selectors
      pattern: /(?!\s)[^@;(){}]?(?:[^@;(){}\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
      inside: {
        parent: {
          pattern: /&/,
          alias: "important"
        },
        placeholder: /%[-\w]+/,
        variable: /\$[-\w]+|#\{\$[-\w]+\}/
      }
    },
    property: {
      pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
      inside: {
        variable: /\$[-\w]+|#\{\$[-\w]+\}/
      }
    }
  });
  insertBefore(scss, "atrule", {
    keyword: [
      /@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,
      {
        pattern: /( )(?:from|through)(?= )/,
        lookbehind: true
      }
    ]
  });
  insertBefore(scss, "important", {
    // var and interpolated vars
    variable: /\$[-\w]+|#\{\$[-\w]+\}/
  });
  insertBefore(scss, "function", {
    "module-modifier": {
      pattern: /\b(?:as|hide|show|with)\b/i,
      alias: "keyword"
    },
    placeholder: {
      pattern: /%[-\w]+/,
      alias: "selector"
    },
    statement: {
      pattern: /\B!(?:default|optional)\b/i,
      alias: "keyword"
    },
    boolean: boolean(),
    null: {
      pattern: /\bnull\b/,
      alias: "keyword"
    },
    operator: {
      pattern: /(\s)(?:[%/*+-]|[!=]=|[<>]=?|and|not|or)(?!\S)/,
      lookbehind: true
    }
  });
}

// src/prism/grammars/json.ts
function Json() {
  languages.json = {
    property: {
      pattern: /"(?:\\.|[^\\\n"])*"(?=\s*:)/g,
      greedy: true
    },
    string: {
      pattern: /"(?:\\.|[^\\\n"])*"/g,
      greedy: true
    },
    comment: comment(),
    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    operator: /:/,
    punctuation: /[[\]{},]/,
    boolean: boolean(),
    null: {
      pattern: /\bnull\b/,
      alias: "keyword"
    }
  };
}

// src/prism/grammars/bash.ts
function Bash() {
  languages.bash = {
    argument: {
      pattern: /(<)(.*?)(>)/,
      inside: {
        punctuation: /[<>]/
      }
    },
    punctuation: {
      pattern: /\$|&{2}|[<>]|--?(?=[a-z])/
    },
    target: {
      pattern: /([a-z] )(\..*)(?=[\s]|$)/,
      lookbehind: true
    },
    comment: {
      pattern: /#.*/
    },
    title: {
      pattern: /[a-zA-Z]+:(?=\n +)/,
      inside: {
        punctuation: /:/
      }
    }
  };
}

// src/prism/grammars/treeview.ts
function Treeview() {
  const folders = /(^|[^\\])(?:\/|\^)\s*$/;
  languages.treeview = languages.tree = {
    comment: {
      pattern: /#.*/
    },
    "treeview-part": {
      pattern: /^.+/m,
      inside: {
        "entry-line": [
          {
            pattern: /\|-- |├── /,
            alias: "line-h"
          },
          {
            pattern: /\| {3}|│ {3}/,
            alias: "line-v"
          },
          {
            pattern: /`-- |└── /,
            alias: "line-v-last"
          },
          {
            pattern: / {4}/,
            alias: "line-v-gap"
          }
        ],
        "entry-name": {
          pattern: /.*\S.*/,
          inside: {
            // symlink
            operator: / -> /
          }
        },
        [tokenize](code, grammar3) {
          const tokens = withoutTokenizer(code, grammar3);
          const length = tokens.length;
          let p = 0;
          let i = 0;
          while (i < length) {
            const token = tokens[i++];
            const entries = token.length;
            if (token instanceof Token) {
              let content;
              if (token.type === "entry-name") {
                content = code.slice(p, p + entries);
                const classes = [token.type];
                if (folders.test(content)) {
                  let dirClass = "dir-open";
                  if (/\^\s*$/.test(content)) {
                    dirClass = "dir";
                  }
                  content = content.replace(folders, "$1");
                  classes.push(dirClass);
                } else {
                  content = content.replace(/(^|[^\\])[=*|]\s*$/, "$1");
                  const name = content.toLowerCase().replace(/\s+/g, "");
                  const files = [
                    ["syncify.config", "icon-syncify"],
                    ["package.json", "icon-npm"],
                    ["eslint.config", "icon-eslint"],
                    ["jsconfig", "icon-jsconfig"],
                    ["tsconfig", "icon-tsconfig"],
                    ["svgo.config", "icon-svgo"],
                    ["postcss", "icon-postcss"],
                    ["tailwind.config", "icon-tailwind"]
                  ];
                  let known = false;
                  for (const [file, id] of files) {
                    if (content.startsWith(file)) {
                      classes.push(id);
                      known = true;
                      break;
                    }
                  }
                  if (!known) {
                    if (name.endsWith(".schema.json")) {
                      classes.push("icon-schema");
                    } else {
                      const parts = name.split(".");
                      while (parts.length > 1) {
                        parts.shift();
                        classes.push("icon-file icon-" + parts.join("-"));
                      }
                    }
                  }
                }
                if (content[0] === ".") {
                  const dots = [
                    [".gitignore", "icon-git"],
                    [".prettier", "icon-prettier"],
                    [".env", "icon-env"],
                    [".npmignore", "icon-npm"],
                    [".liquidrc.json", "icon-liquid"],
                    [".liquidrc", "icon-liquid"]
                  ];
                  let found = false;
                  for (const [file, id] of dots) {
                    if (content.startsWith(file)) {
                      classes.push(id);
                      found = true;
                      break;
                    }
                  }
                  if (!found) {
                    classes.push("dotfile");
                  }
                }
                token.type = classes.join(" ");
                token.content = content;
              }
            }
            p += entries;
          }
          return tokens;
        }
      }
    }
  };
}

// src/prism/grammar.ts
var grammars = function grammar() {
  if (!grammars.defined) {
    for (const call of [
      Markup,
      JavaScript,
      TypeScript,
      Liquid,
      CSS,
      SCSS,
      YAML,
      Toml,
      Json,
      Bash,
      Treeview
    ]) call();
    grammars.defined = true;
  }
  return languages;
};
grammars.defined = false;

// src/utils/shared.ts
grammars();
var model = /* @__PURE__ */ new Map();

// src/utils/options.ts
var import_lz_string2 = __toESM(require_lz_string());
function setAttributeHint(options) {
  const config = assign({}, options);
  config.selfCloseRegex = config.selfCloseRegex.source;
  return (0, import_lz_string2.compressToEncodedURIComponent)(JSON.stringify(config));
}
function setInlineOptions(options) {
  const config = {
    language: null,
    trimEnd: false,
    trimStart: false,
    addAttrs: [],
    addClass: []
  };
  if (typeof options === "object") {
    config.language = getLanguageName(options.language);
    for (const k in config) {
      if (has(k, options)) {
        config[k] = k === "language" ? getLanguageName(options[k]) : options[k];
      }
    }
  }
  return config;
}
function setHighlightOptions(options) {
  const config = {
    language: null,
    flems: null,
    lineFence: true,
    lineNumbers: true,
    autoHeight: true,
    tabSize: 2,
    trimEnd: true,
    trimStart: true,
    useTabs: false,
    wordWrap: false,
    copyButton: true,
    rtl: false,
    preAttrs: [],
    preClass: [],
    codeAttrs: [],
    codeClass: []
  };
  if (typeof options === "object") {
    if (!has("language", options)) {
      console.warn('\u{13041} Papyprus: No "language", provided, will fallback to "plaintext"');
    } else {
      config.language = getLanguageName(options.language);
    }
    for (const k in config) {
      if (has(k, options)) {
        config[k] = k === "language" ? getLanguageName(options[k]) : options[k];
      }
    }
  }
  if (config.lineFence === true && config.lineNumbers === false) {
    config.lineFence = false;
  }
  return config;
}
function setOptions(type, options) {
  const config = {
    type,
    id: null,
    language: null,
    flems: null,
    lineFence: false,
    lineNumbers: true,
    autoHeight: true,
    tabSize: 2,
    readOnly: false,
    input: null,
    trimEnd: true,
    trimStart: true,
    useTabs: false,
    wordWrap: false,
    copyButton: true,
    rtl: false,
    preAttrs: [],
    preClass: [],
    codeAttrs: [],
    codeClass: [],
    indentGuides: true,
    matchTags: true,
    matchSelected: true,
    bracketPairs: true,
    editHistory: 999,
    searchWidget: true,
    selfCloseRegex: /([^$\w'"`]["'`]|.[[({])[.,:;\])}>\s]|.[[({]`/s,
    selfClosePairs: [
      '""',
      "''",
      "``",
      "()",
      "[]",
      "{}"
    ]
  };
  if (typeof options === "object") {
    if (!has("language", options)) {
      console.warn('\u{13041} Papyprus: No "language", provided, will fallback to "plaintext"');
    } else {
      config.language = getLanguageName(options.language);
    }
    for (const k in config) {
      if (k === "language" || k === "type") continue;
      if (has(k, options)) config[k] = options[k];
    }
  }
  if (config.language === "treeview") {
    config.type = "static";
    config.readOnly = true;
    config.lineNumbers = false;
    config.lineFence = false;
    config.indentGuides = false;
  }
  if (config.id === null && config.type !== "static") config.id = uuid();
  if (config.indentGuides === true) config.lineFence = false;
  return config;
}

// src/modes/static.ts
function raw(codeInput, config) {
  const input = trimInput(codeInput, config.trimStart, config.trimEnd);
  const tokenize2 = tokenizeText(input, languages[config.language]);
  const rawCode = highlightTokens(tokenize2);
  const html = config.lineNumbers === false ? rawCode : rawCode.split("\n").map((token, i) => `<div class="pce-line" aria-hidden="true" data-line="${i + 1}">${token}</div>`).join("");
  return { html, input };
}
function extend2(config, input) {
  if (config.language === "treeview") return "";
  let markup = '<div class="pce-overlays">';
  markup += `<textarea name="${config.id}" spellcheck="false" autocapitalize="off" autocomplete="off" inputmode="" aria-readonly="${config.readOnly}">${input}</textarea>`;
  if (config.flems !== null) markup += getFlems(config.flems);
  if (config.copyButton === true) markup += getCopy();
  return markup + "</div>";
}
function createStatic(codeInput, options) {
  const config = setOptions("static", options);
  const { html, input } = raw(codeInput, config);
  const styleVars = [`--tab-size:${config.tabSize};`, "--number-width:2.001ch;"];
  const codeClass = [`pce-wrapper language-${config.language}`, ...config.codeClass];
  const preClass = ["prism-code-editor", config.wordWrap ? "pce-wrap" : "pce-nowrap", ...config.preClass];
  const codeAttrs = glue(config.codeAttrs);
  const preAttrs = [`id="${config.id}"`, `data-papyrus="${setAttributeHint(config)}"`, ...config.preAttrs];
  if (config.lineNumbers) {
    preClass.push("show-line-numbers");
  }
  if (config.lineFence) {
    codeClass.push("pce-line-fence");
    styleVars.push("--line-fence: block;");
  }
  preAttrs.push(`style="${glue(styleVars)}"`);
  let output = `<pre class="${glue(preClass)}" ${glue(preAttrs)}>`;
  if (config.codeAttrs.length > 0) {
    output += `<code class="${glue(codeClass)}" ${codeAttrs}>`;
  } else {
    output += `<code class="${glue(codeClass)}">`;
  }
  const markup = `${output}${extend2(config, input)}${html}</code></pre>`;
  if (isNode) {
    model.set(config.id, {
      type: "static",
      markup,
      input,
      config
    });
  }
  return markup;
}

// src/modes/inline.ts
function createInline(codeInput, options) {
  const config = setInlineOptions(options);
  const input = trimInput(codeInput, config.trimStart, config.trimEnd);
  if (config.language === null || config.language === "plaintext") {
    const codeClass2 = config.addClass.length > 0 ? ` class="${glue(config.addClass)}` : "";
    const markup2 = config.addAttrs.length > 0 ? `<code${codeClass2} ${glue(config.addAttrs)}>${input}</code$>` : `<code${codeClass2}>${input}</code$>`;
    return markup2;
  }
  const codeClass = glue([`language-${config.language}`, ...config.addClass]);
  const codeAttrs = glue(config.addAttrs).trimEnd();
  const highlight = highlightText(input, languages[config.language]);
  const markup = config.addAttrs.length > 0 ? `<code class="${codeClass}" ${codeAttrs}>${highlight}</code>` : `<code class="${codeClass}">${highlight}</code>`;
  return markup;
}

// src/modes/highlight.ts
function raw2(codeInput, config) {
  const input = trimInput(codeInput, config.trimStart, config.trimEnd);
  const tokenize2 = tokenizeText(input, languages[config.language]);
  const rawCode = highlightTokens(tokenize2);
  const markup = config.lineNumbers === false || config.language === "treeview" ? rawCode : rawCode.split("\n").map((token, i) => {
    const r = `<div class="line-no" aria-hidden="true" data-line="${i + 1}">${token}</div>`;
    return r;
  }).join("");
  return markup;
}
function extend3(config) {
  if (config.language === "treeview") return "";
  let markup = '<div class="overlays">';
  if (config.flems !== null) {
    markup += getFlems(config.flems);
  }
  if (config.copyButton === true) {
    markup += getCopy();
  }
  return markup + "</div>";
}
function createHighlight(codeInput, options) {
  const config = setHighlightOptions(options);
  const markup = raw2(codeInput, config);
  const preClass = ["papyrus", ...config.preClass];
  const preAttrs = [...config.preAttrs];
  const codeAttrs = glue(config.codeAttrs);
  const codeClass = [`language-${config.language}`, ...config.codeClass];
  if (config.language !== "treeview") {
    if (config.lineNumbers) {
      preClass.push("line-numbers");
    }
    if (config.lineFence) {
      preClass.push("line-fence");
    }
  }
  let output = `<pre class="${glue(preClass)}" ${glue(preAttrs)}>`;
  if (config.codeAttrs.length > 0) {
    output += `<code class="${glue(codeClass)}" ${codeAttrs}>`;
  } else {
    output += `<code class="${glue(codeClass)}">`;
  }
  return `${output}${extend3(config)}${markup}</code></pre>`;
}

// src/node.ts
grammars();
var node_default = {
  highlight: createHighlight,
  inline: createInline,
  static: createStatic
};

module.exports = node_default;
