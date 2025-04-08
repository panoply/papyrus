var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
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
var import_lz_string = __toESM(require_lz_string());
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
function getLanguageFromCode(preEl) {
  const codeEl = preEl.querySelector("code");
  if (codeEl && codeEl.hasAttribute("class")) {
    const className = codeEl.className.indexOf("language-");
    if (className > 0) {
      return getLanguageName(codeEl.className.slice(className + 9).split(" ")[0].trimEnd());
    }
  } else if (preEl.hasAttribute("class")) {
    const className = preEl.className.indexOf("language-");
    if (className > 0) {
      return getLanguageName(preEl.className.slice(className + 9).split(" ")[0].trimEnd());
    }
  }
  return "plaintext";
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
function decompress(json) {
  const config = JSON.parse((0, import_lz_string.decompressFromEncodedURIComponent)(json));
  config.selfCloseRegex = new RegExp(config.selfCloseRegex);
  return config;
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
var grammar2 = grammars();
var model = /* @__PURE__ */ new Map();
var list = () => Array.from(model.values());
var get = (id) => {
  if (typeof id === "string") {
    if (model.has(id)) return model.get(id);
  } else {
    throw new Error(`\u{13041} Papyprus: Invalid id parameter type, expected string, recevied: ${typeof id}`);
  }
  return null;
};

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/index-BltwYS88.js
var createEditor = (container, options, ...extensions) => {
  var _a;
  let language;
  let grammar3;
  let prevLines = [];
  let activeLine;
  let value = "";
  let activeLineNumber;
  let removed = false;
  let focused = false;
  let handleSelectionChange = true;
  let tokens = [];
  let readOnly;
  let lineCount = 0;
  const scrollContainer = editorTemplate();
  const wrapper = scrollContainer.firstChild;
  const lines = wrapper.children;
  const overlays = lines[0];
  const textarea = overlays.firstChild;
  const currentOptions = { language: "text", value };
  const currentExtensions = new Set(extensions);
  const listeners = {};
  const setOptions2 = (options2) => {
    var _a2;
    Object.assign(currentOptions, options2);
    value = (_a2 = options2.value) != null ? _a2 : value;
    language = currentOptions.language;
    if (!languages[language])
      throw Error(`Language '${language}' has no grammar.`);
    readOnly = !!currentOptions.readOnly;
    scrollContainer.style.tabSize = currentOptions.tabSize || 2;
    textarea.inputMode = readOnly ? "none" : "";
    textarea.setAttribute("aria-readonly", readOnly);
    updateClassName();
    updateExtensions();
    if (grammar3 != (grammar3 = languages[language]) || value != textarea.value) {
      focusRelatedTarget();
      textarea.value = value;
      textarea.selectionEnd = 0;
      update();
    }
  };
  const update = () => {
    tokens = tokenizeText(value = textarea.value, grammar3);
    dispatchEvent("tokenize", tokens, language, value);
    let newLines = highlightTokens(tokens).split("\n");
    let start = 0;
    let end2 = lineCount;
    let end1 = lineCount = newLines.length;
    while (newLines[start] == prevLines[start] && start < end1)
      ++start;
    while (end1 && newLines[--end1] == prevLines[--end2])
      ;
    if (start == end1 && start == end2)
      lines[start + 1].innerHTML = newLines[start] + "\n";
    else {
      let insertStart = end2 < start ? end2 : start - 1;
      let i = insertStart;
      let newHTML = "";
      while (i < end1)
        newHTML += `<div class=pce-line aria-hidden=true>${newLines[++i]}
</div>`;
      for (i = end1 < start ? end1 : start - 1; i < end2; i++)
        lines[start + 1].remove();
      if (newHTML)
        lines[insertStart + 1].insertAdjacentHTML("afterend", newHTML);
      for (i = insertStart + 1; i < lineCount; )
        lines[++i].setAttribute("data-line", i);
      scrollContainer.style.setProperty(
        "--number-width",
        Math.ceil(Math.log10(lineCount + 1)) + ".001ch"
      );
    }
    dispatchEvent("update", value);
    dispatchSelection(true);
    if (handleSelectionChange)
      setTimeout(setTimeout, 0, () => handleSelectionChange = true);
    prevLines = newLines;
    handleSelectionChange = false;
  };
  const updateExtensions = (newExtensions) => {
    (newExtensions || currentExtensions).forEach((extension) => {
      if (typeof extension == "object") {
        extension.update(self, currentOptions);
        if (newExtensions)
          currentExtensions.add(extension);
      } else {
        extension(self, currentOptions);
        if (!newExtensions)
          currentExtensions.delete(extension);
      }
    });
  };
  const updateClassName = ([start, end] = getInputSelection()) => {
    scrollContainer.className = `prism-code-editor language-${language}${currentOptions.lineNumbers == false ? "" : " show-line-numbers"} pce-${currentOptions.wordWrap ? "" : "no"}wrap${currentOptions.rtl ? " pce-rtl" : ""} pce-${start < end ? "has" : "no"}-selection${focused ? " pce-focus" : ""}${readOnly ? " pce-readonly" : ""}`;
  };
  const getInputSelection = () => [
    textarea.selectionStart,
    textarea.selectionEnd,
    textarea.selectionDirection
  ];
  const keyCommandMap = {
    Escape() {
      textarea.blur();
    }
  };
  const inputCommandMap = {};
  const focusRelatedTarget = () => isWebKit && !focused && addTextareaListener(
    self,
    "focus",
    (e) => {
      let relatedTarget = e.relatedTarget;
      if (relatedTarget)
        relatedTarget.focus();
      else
        textarea.blur();
    },
    { once: true }
  );
  const dispatchEvent = (name, ...args) => {
    var _a2, _b;
    (_a2 = listeners[name]) == null ? void 0 : _a2.forEach((handler) => handler.apply(self, args));
    (_b = currentOptions["on" + name[0].toUpperCase() + name.slice(1)]) == null ? void 0 : _b.apply(self, args);
  };
  const dispatchSelection = (force) => {
    if (force || handleSelectionChange) {
      const selection = getInputSelection();
      const newLine = lines[activeLineNumber = numLines(value, 0, selection[selection[2] < "f" ? 0 : 1])];
      if (newLine != activeLine) {
        activeLine == null ? void 0 : activeLine.classList.remove("active-line");
        newLine.classList.add("active-line");
        activeLine = newLine;
      }
      updateClassName(selection);
      dispatchEvent("selectionChange", selection, value);
    }
  };
  const self = {
    scrollContainer,
    wrapper,
    overlays,
    textarea,
    get activeLine() {
      return activeLine;
    },
    get activeLineNumber() {
      return activeLineNumber;
    },
    get value() {
      return value;
    },
    options: currentOptions,
    get focused() {
      return focused;
    },
    get removed() {
      return removed;
    },
    get tokens() {
      return tokens;
    },
    inputCommandMap,
    keyCommandMap,
    extensions: {},
    setOptions: setOptions2,
    update,
    getSelection: getInputSelection,
    setSelection(start, end = start, direction) {
      focusRelatedTarget();
      textarea.setSelectionRange(start, end, direction);
      dispatchSelection(true);
    },
    addExtensions(...extensions2) {
      updateExtensions(extensions2);
    },
    addListener(name, handler) {
      (listeners[name] || (listeners[name] = /* @__PURE__ */ new Set())).add(handler);
    },
    removeListener(name, handler) {
      var _a2;
      (_a2 = listeners[name]) == null ? void 0 : _a2.delete(handler);
    },
    remove() {
      scrollContainer.remove();
      removed = true;
    }
  };
  addTextareaListener(self, "keydown", (e) => {
    var _a2;
    ((_a2 = keyCommandMap[e.key]) == null ? void 0 : _a2.call(keyCommandMap, e, getInputSelection(), value)) && preventDefault(e);
  });
  addTextareaListener(self, "beforeinput", (e) => {
    var _a2;
    if (readOnly || e.inputType == "insertText" && ((_a2 = inputCommandMap[e.data]) == null ? void 0 : _a2.call(inputCommandMap, e, getInputSelection(), value)))
      preventDefault(e);
  });
  addTextareaListener(self, "input", update);
  addTextareaListener(self, "blur", () => {
    selectionChange = null;
    focused = false;
    updateClassName();
  });
  addTextareaListener(self, "focus", () => {
    selectionChange = dispatchSelection;
    focused = true;
    updateClassName();
  });
  addTextareaListener(self, "selectionchange", (e) => {
    dispatchSelection();
    preventDefault(e);
  });
  (_a = getElement(container)) == null ? void 0 : _a.append(scrollContainer);
  options && setOptions2(options);
  return self;
};
var editorFromPlaceholder = (placeholder, options, ...extensions) => {
  const el = getElement(placeholder);
  const editor = createEditor(
    null,
    Object.assign({ value: el.textContent }, options),
    ...extensions
  );
  el.replaceWith(editor.scrollContainer);
  return editor;
};
var templateEl = /* @__PURE__ */ document.createElement("div");
var createTemplate = (html) => {
  templateEl.innerHTML = html;
  const node = templateEl.firstChild;
  return () => node.cloneNode(true);
};
var addTextareaListener = (editor, type, listener, options) => editor.textarea.addEventListener(type, listener, options);
var getElement = (el) => typeof el == "string" ? document.querySelector(el) : el;
var userAgent = navigator.userAgent;
var isMac = /Mac|iPhone|iPod|iPad/i.test(navigator.platform);
var isChrome = /Chrome\//.test(userAgent);
var isWebKit = !isChrome && /AppleWebKit\//.test(userAgent);
var numLines = (str, start = 0, end = Infinity) => {
  let count = 1;
  for (; (start = str.indexOf("\n", start) + 1) && start <= end; count++)
    ;
  return count;
};
var languageMap = {};
var editorTemplate = /* @__PURE__ */ createTemplate(
  "<div><div class=pce-wrapper><div class=pce-overlays><textarea spellcheck=false autocapitalize=off autocomplete=off>"
);
var preventDefault = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
};
var selectionChange;
document.addEventListener("selectionchange", () => selectionChange == null ? void 0 : selectionChange());

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/local-VpqO7_GV.js
var scrollToEl = (editor, el, paddingTop = 0) => {
  const style1 = editor.scrollContainer.style, style2 = document.documentElement.style;
  style1.scrollPaddingBlock = style2.scrollPaddingBlock = `${paddingTop}px ${isChrome && !el.textContent ? el.offsetHeight : 0}px`;
  el.scrollIntoView({ block: "nearest" });
  style1.scrollPaddingBlock = style2.scrollPaddingBlock = "";
};
var getLineStart = (text, position) => position ? text.lastIndexOf("\n", position - 1) + 1 : 0;
var getLineEnd = (text, position) => (position = text.indexOf("\n", position)) + 1 ? position : text.length;
var addListener = (editor, type, listener) => {
  editor.addListener(type, listener);
  return () => editor.removeListener(type, listener);
};
var getStyleValue = (el, prop) => parseFloat(getComputedStyle(el)[prop]);

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/utils/index.js
var prevSelection;
var regexEscape = (str) => str.replace(/[$+?|.^*()[\]{}\\]/g, "\\$&");
var getLineBefore = (text, position) => text.slice(getLineStart(text, position), position);
var getLines = (text, start, end = start) => [
  text.slice(start = getLineStart(text, start), end = getLineEnd(text, end)).split("\n"),
  start,
  end
];
var getClosestToken = (editor, selector, marginLeft = 0, marginRight = marginLeft, position = editor.getSelection()[0]) => {
  var _a;
  const value = editor.value;
  const line = editor.wrapper.children[numLines(value, 0, position)];
  const walker = document.createTreeWalker(line, 5);
  let node = walker.lastChild();
  let offset = getLineEnd(value, position) + 1 - position - node.length;
  while (-offset <= marginRight && (node = walker.previousNode())) {
    if (node.lastChild)
      continue;
    offset -= node.length || 0;
    if (offset <= marginLeft) {
      for (; node != line; node = node.parentNode) {
        if ((_a = node.matches) == null ? void 0 : _a.call(node, selector))
          return node;
      }
    }
  }
};
var getLanguage = (editor, position) => {
  var _a;
  return ((_a = getClosestToken(editor, '[class*="language-"]', 0, 0, position)) == null ? void 0 : _a.className.match(
    /language-(\S*)/
  )[1]) || editor.options.language;
};
var insertText = (editor, text, start, end, newCursorStart, newCursorEnd) => {
  if (editor.options.readOnly)
    return;
  prevSelection = editor.getSelection();
  end != null ? end : end = start;
  let textarea = editor.textarea;
  let value = editor.value;
  let avoidBug = isChrome && !value[end != null ? end : prevSelection[1]] && /\n$/.test(text) && /^$|\n$/.test(value);
  let removeListener;
  editor.focused || textarea.focus();
  if (start != null)
    textarea.setSelectionRange(start, end);
  if (newCursorStart != null) {
    removeListener = addListener(editor, "update", () => {
      textarea.setSelectionRange(
        newCursorStart,
        newCursorEnd != null ? newCursorEnd : newCursorStart,
        prevSelection[2]
      );
      removeListener();
    });
  }
  isWebKit || textarea.dispatchEvent(new InputEvent("beforeinput", { data: text }));
  if (isChrome || isWebKit) {
    if (avoidBug) {
      textarea.selectionEnd--;
      text = text.slice(0, -1);
    }
    if (isWebKit)
      text += "\n";
    document.execCommand(
      text ? "insertHTML" : "delete",
      false,
      text.replace(/&/g, "&amp;").replace(/</g, "&lt;")
    );
    if (avoidBug)
      textarea.selectionStart++;
  } else
    document.execCommand(text ? "insertText" : "delete", false, text);
  prevSelection = 0;
};
var getModifierCode = (e) => e.altKey + e.ctrlKey * 2 + e.metaKey * 4 + e.shiftKey * 8;

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/search-CRvSzFe6.js
var searchTemplate = createTemplate(
  '<div style="color:#0000;contain:strict;padding:0 var(--_pse) 0 var(--padding-left)" aria-hidden=true> '
);
var matchTemplate = createTemplate("<span> ");
var testBoundary = (str, position, pattern = /[_\p{N}\p{L}]{2}/u) => {
  if (!position)
    return false;
  return pattern.test(
    str.slice(
      position - (str.codePointAt(position - 2) > 65535 ? 2 : 1),
      position + (str.codePointAt(position) > 65535 ? 2 : 1)
    )
  );
};
var createSearchAPI = (editor) => {
  const container = searchTemplate();
  const nodes = [container.firstChild];
  const nodeValues = [" "];
  const matchPositions = [];
  const stopSearch = () => {
    if (matchPositions[0]) {
      matchPositions.length = 0;
      container.remove();
    }
  };
  let regex2;
  let nodeCount = 1;
  return {
    search(str, caseSensitive, wholeWord, useRegExp, selection, filter, pattern) {
      if (!str)
        return stopSearch();
      if (!useRegExp)
        str = regexEscape(str);
      const value = editor.value;
      const searchStr = selection ? value.slice(...selection) : value;
      const offset = selection ? selection[0] : 0;
      let match;
      let l;
      let index;
      let i = 0;
      try {
        regex2 = RegExp(str, `gum${caseSensitive ? "" : "i"}`);
        while (match = regex2.exec(searchStr)) {
          l = match[0].length;
          index = match.index + offset;
          if (!l)
            regex2.lastIndex += value.codePointAt(index) > 65535 ? 2 : 1;
          if (wholeWord && (testBoundary(value, index, pattern) || testBoundary(value, index + l, pattern)))
            continue;
          if (!filter || filter(index, index + l))
            matchPositions[i++] = [index, index + l];
        }
      } catch (e) {
        stopSearch();
        return e.message;
      }
      if (i) {
        matchPositions.length = i;
        l = Math.min(i * 2, 2e4);
        for (i = nodes.length; i <= l; ) {
          nodes[i++] = matchTemplate();
          nodes[i++] = new Text();
        }
        for (i = nodeCount - 1; i > l; )
          nodes[i--].remove();
        if (nodeCount <= l)
          container.append(...nodes.slice(nodeCount, l + 1));
        let prevEnd = 0;
        for (i = 0; i < l; ++i) {
          const [start, end] = matchPositions[i / 2];
          const before = value.slice(prevEnd, start);
          const match2 = value.slice(start, prevEnd = end);
          if (before != nodeValues[i])
            nodes[i].data = nodeValues[i] = before;
          if (match2 != nodeValues[++i])
            nodes[i].firstChild.data = nodeValues[i] = match2;
        }
        nodes[l].data = nodeValues[l] = value.slice(prevEnd);
        if (!container.parentNode)
          editor.overlays.append(container);
        nodeCount = l + 1;
      } else
        stopSearch();
    },
    container,
    get regex() {
      return regex2;
    },
    matches: matchPositions,
    stopSearch
  };
};

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/extensions/search/api.js
var createReplaceAPI = (editor) => {
  const getSelection = editor.getSelection;
  const search = createSearchAPI(editor);
  const container = search.container;
  const matches = search.matches;
  const closest = () => {
    const caretPos = getSelection()[0];
    const l = matches.length;
    for (let i = l; i; ) {
      if (caretPos >= matches[--i][1])
        return (i + (matches[i][0] < caretPos)) % l;
    }
    return l ? 0 : -1;
  };
  const toggleClasses = () => {
    currentLine == null ? void 0 : currentLine.classList.toggle("match-highlight");
    currentMatch == null ? void 0 : currentMatch.classList.toggle("match");
  };
  const removeSelection = () => {
    if (hasSelected) {
      toggleClasses();
      hasSelected = false;
    }
  };
  let currentLine;
  let currentMatch;
  let hasSelected = false;
  addTextareaListener(editor, "focus", removeSelection);
  return Object.assign(search, {
    next() {
      const cursor = getSelection()[1];
      const l = matches.length;
      for (let i = 0, match; i < l; i++) {
        match = matches[i];
        if (match[0] - (match[0] == match[1]) >= cursor)
          return i;
      }
      return l ? 0 : -1;
    },
    prev() {
      const cursor = getSelection()[0];
      const l = matches.length;
      for (let i = l, match; i; ) {
        match = matches[--i];
        if (match[1] + (match[0] == match[1]) <= cursor)
          return i;
      }
      return l - 1;
    },
    closest,
    selectMatch(index, scrollPadding) {
      removeSelection();
      if (matches[index]) {
        editor.setSelection(...matches[index]);
        currentLine = editor.activeLine;
        currentMatch = container.children[index];
        hasSelected = true;
        toggleClasses();
        if (currentMatch) {
          scrollToEl(editor, currentMatch, scrollPadding);
        }
      }
    },
    replace(str) {
      if (matches[0]) {
        let index = closest();
        let [start, end] = matches[index];
        let [caretStart, caretEnd] = getSelection();
        let notSelected = start != caretStart || end != caretEnd;
        if (notSelected)
          return index;
        if (editor.value.slice(start, end) == str)
          return matches[++index] ? index : 0;
        return insertText(editor, str);
      }
    },
    replaceAll(str) {
      if (!matches[0])
        return;
      let value = editor.value;
      let [start, end] = getSelection();
      let newLen = str.length;
      let newStart = start;
      let newEnd = end;
      let newValue = "";
      let l = matches.length;
      for (let i = 0; i < l; i++) {
        const [matchStart, matchEnd] = matches[i];
        const lengthDiff = newLen - matchEnd + matchStart;
        const move = (pos) => matchStart > pos ? 0 : pos >= matchEnd ? lengthDiff : lengthDiff < 0 && pos > matchStart + newLen ? newLen + matchStart - pos : 0;
        newEnd += move(end);
        newStart += move(start);
        newValue += i ? value.slice(matches[i - 1][1], matchStart) + str : str;
      }
      insertText(editor, newValue, matches[0][0], matches[l - 1][1], newStart, newEnd);
    },
    destroy() {
      editor.textarea.removeEventListener("focus", removeSelection);
      removeSelection();
      container.remove();
    }
  });
};

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/widget-CG99fbys.js
var shortcut = ` (Alt+${isMac ? "Cmd+" : ""}`;
var template = createTemplate(
  `<div class=prism-search-container style=display:flex;align-items:flex-start;justify-content:flex-end><div dir=ltr class=prism-search><button type=button aria-expanded=false title="Toggle Replace" class=pce-expand></button><div spellcheck=false><div><div class="pce-input pce-find"><input autocorrect=off autocapitalize=off placeholder=Find aria-label=Find><button type=button class=prev-match title="Previous Match (Shift+Enter)"></button><button type=button class=next-match title="Next Match (Enter)"></button><div class=search-error></div></div><button type=button class=pce-close title="Close (Esc)"></button></div><div class="pce-input pce-replace"><input autocorrect=off autocapitalize=off placeholder=Replace aria-label=Replace><button type=button title=(Enter)>Replace</button><button type=button title=(${isMac ? "Cmd" : "Ctrl+Alt"}+Enter)>All</button></div><div class=pce-options><div class=pce-match-count>0<span> of </span>0</div><button type=button aria-pressed=false class=pce-regex title="RegExp Search${shortcut}R)"><span aria-hidden=true></span></button><button type=button aria-pressed=false title="Preserve Case${shortcut}P)"><span aria-hidden=true>Aa</span></button><button type=button aria-pressed=false class=pce-whole title="Match Whole Word${shortcut}W)"><span aria-hidden=true>ab</span></button><button type=button aria-pressed=false class=pce-in-selection title="Find in Selection${shortcut}L)">`
);
var toggleAttr = (el, name) => el.setAttribute(name, el.getAttribute(name) == "false");
var searchWidget = () => {
  let prevLength;
  let useRegExp;
  let matchCase;
  let wholeWord;
  let searchSelection;
  let isOpen;
  let currentSelection;
  let prevUserSelection;
  let prevMargin;
  let selectNext = false;
  let marginTop;
  const self = (editor) => {
    editor.extensions.searchWidget = self;
    const { textarea, wrapper, overlays, scrollContainer, getSelection } = editor;
    const replaceAPI = createReplaceAPI(editor);
    const startSearch = (selectMatch) => {
      if (selectMatch && !isWebKit)
        textarea.setSelectionRange(...prevUserSelection);
      const error = replaceAPI.search(
        findInput.value,
        matchCase,
        wholeWord,
        useRegExp,
        searchSelection
      );
      const index = error ? -1 : selectNext ? replaceAPI.next() : replaceAPI.closest();
      current.data = index + 1;
      total.data = replaceAPI.matches.length;
      findContainer.classList.toggle("pce-error", !!error);
      if (error)
        errorEl.textContent = error;
      else if (selectMatch || selectNext)
        replaceAPI.selectMatch(index, prevMargin);
    };
    const keydown = (e) => {
      if (e.keyCode >> 1 == 35 && getModifierCode(e) == (isMac ? 4 : 2)) {
        preventDefault(e);
        open();
        let [start, end] = getSelection(), value = editor.value, word = value.slice(start, end) || value.slice(0, start).match(/[_\p{N}\p{L}]*$/u)[0] + value.slice(start).match(/^[_\p{N}\p{L}]*/u)[0];
        if (/^$|\n/.test(word))
          startSearch();
        else {
          if (useRegExp)
            word = regexEscape(word);
          document.execCommand("insertText", false, word);
          findInput.select();
        }
      }
    };
    const open = (focusInput = true) => {
      if (!isOpen) {
        isOpen = true;
        if (marginTop == null)
          prevMargin = marginTop = getStyleValue(wrapper, "marginTop");
        prevUserSelection = getSelection();
        overlays.append(container);
        updateMargin();
        resize();
        observer == null ? void 0 : observer.observe(scrollContainer);
      }
      if (focusInput)
        findInput.select();
    };
    const close = self.close = (focusTextarea = true) => {
      if (isOpen) {
        isOpen = false;
        replaceAPI.stopSearch();
        container.remove();
        updateMargin();
        observer == null ? void 0 : observer.disconnect();
        focusTextarea && textarea.focus();
      }
    };
    const move = (next) => {
      if (replaceAPI.matches[0]) {
        const index = replaceAPI[next ? "next" : "prev"]();
        replaceAPI.selectMatch(index, prevMargin);
        current.data = index + 1;
      }
    };
    const updateMargin = () => {
      const newMargin = isOpen ? getStyleValue(search, "top") + getStyleValue(search, "height") : marginTop;
      const newScroll = scrollContainer.scrollTop + newMargin - prevMargin;
      wrapper.style.marginTop = isOpen ? newMargin + "px" : "";
      scrollContainer.scrollTop = newScroll;
      prevMargin = newMargin;
    };
    const resize = () => div.style.setProperty(
      "--search-width",
      `min(${scrollContainer.clientWidth - 2}px - 2.4em - var(--padding-left),20em)`
    );
    const observer = window.ResizeObserver && new ResizeObserver(resize);
    const replace2 = () => {
      selectNext = true;
      const index = replaceAPI.replace(replaceInput.value);
      if (index != null) {
        current.data = index + 1;
        replaceAPI.selectMatch(index, prevMargin);
      }
      selectNext = false;
    };
    const replaceAll = () => {
      replaceAPI.replaceAll(replaceInput.value);
    };
    const keyCodeButtonMap = {
      80: matchCaseEl,
      87: wholeWordEl,
      82: useRegExpEl,
      76: inSelectionEl
    };
    const elementHandlerMap = /* @__PURE__ */ new Map([
      [nextEl, () => move(true)],
      [prevEl, move],
      [closeEl, close],
      [replaceEl, replace2],
      [replaceAllEl, replaceAll],
      [
        toggle,
        () => {
          toggleAttr(toggle, "aria-expanded");
          updateMargin();
        }
      ],
      [matchCaseEl, () => matchCase = !matchCase],
      [useRegExpEl, () => useRegExp = !useRegExp],
      [wholeWordEl, () => wholeWord = !wholeWord],
      [
        inSelectionEl,
        () => {
          const value = editor.value;
          if (searchSelection)
            searchSelection = void 0;
          else {
            searchSelection = getSelection().slice(0, 2);
            if (numLines(value, ...searchSelection) > 1) {
              searchSelection = [
                getLineStart(value, searchSelection[0]),
                getLineEnd(value, searchSelection[1])
              ];
            }
          }
          prevLength = value.length;
        }
      ]
    ]);
    addTextareaListener(editor, "keydown", keydown);
    addTextareaListener(editor, "beforeinput", () => {
      if (isOpen && searchSelection)
        currentSelection = getSelection();
    });
    addListener(editor, "update", () => {
      if (!isOpen)
        return;
      if (searchSelection && currentSelection) {
        const diff = prevLength - (prevLength = editor.value.length);
        const end = currentSelection[1];
        if (end <= searchSelection[1]) {
          searchSelection[1] -= diff;
          if (end <= searchSelection[0] - +(diff < 0))
            searchSelection[0] -= diff;
        }
      }
      startSearch();
    });
    addListener(editor, "selectionChange", (selection) => {
      if (isOpen && editor.focused)
        prevUserSelection = selection;
    });
    if (isChrome) {
      container.addEventListener("focusin", (e) => {
        if (!container.contains(e.relatedTarget)) {
          findInput.focus();
          e.target.focus();
        }
      });
    }
    container.addEventListener("click", (e) => {
      var _a;
      const target = e.target;
      const remove = addListener(editor, "update", () => target.focus());
      (_a = elementHandlerMap.get(target)) == null ? void 0 : _a();
      if (target.matches(".pce-options>button")) {
        toggleAttr(target, "aria-pressed");
        startSearch(true);
      }
      remove();
    });
    findInput.oninput = () => isOpen && startSearch(true);
    container.addEventListener("keydown", (e) => {
      const shortcut2 = getModifierCode(e);
      const target = e.target;
      const keyCode = e.keyCode;
      const isFind = target == findInput;
      if (shortcut2 == (isMac ? 5 : 1)) {
        if (keyCodeButtonMap[keyCode]) {
          preventDefault(e);
          keyCodeButtonMap[keyCode].click();
        }
      } else if (keyCode == 13 && target.tagName == "INPUT") {
        preventDefault(e);
        if (!shortcut2)
          isFind ? move(true) : replaceEl.click();
        else if (shortcut2 == 8 && isFind)
          move();
        else if (shortcut2 == (isMac ? 4 : 3) && !isFind)
          replaceAllEl.click();
        target.focus();
      } else if (!shortcut2 && keyCode == 27)
        close();
      else
        keydown(e);
    });
    self.open = (focusInput) => {
      open(focusInput);
      startSearch();
    };
    replaceAPI.container.className = "pce-matches";
  };
  const container = template();
  const search = self.element = container.firstChild;
  const [toggle, div] = search.children;
  const rows = div.children;
  const [findContainer, closeEl] = rows[0].children;
  const [findInput, prevEl, nextEl, errorEl] = findContainer.children;
  const [replaceInput, replaceEl, replaceAllEl] = rows[1].children;
  const [matchCount, useRegExpEl, matchCaseEl, wholeWordEl, inSelectionEl] = rows[2].children;
  const [current, , total] = matchCount.childNodes;
  self.open = self.close = () => {
  };
  return self;
};

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/selection-C1jc115I.js
var highlightSelectionMatches = (caseSensitive, minLength = 1, maxLength = 200) => {
  const self = (editor) => {
    const searchAPI = self.api = createSearchAPI(editor);
    const container = searchAPI.container;
    container.style.zIndex = -1;
    container.className = "selection-matches";
    editor.addListener("selectionChange", ([start, end], value) => {
      value = editor.focused ? value.slice(start, end) : "";
      start += value.search(/\S/);
      value = value.trim();
      let l = value.length;
      searchAPI.search(
        minLength > l || l > maxLength ? "" : value,
        caseSensitive,
        false,
        false,
        void 0,
        (mStart, mEnd) => mStart > start || mEnd <= start
      );
    });
  };
  return self;
};

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/extensions/commands.js
var ignoreTab = false;
var clipboard = navigator.clipboard;
var mod = isMac ? 4 : 2;
var setIgnoreTab = (newState) => ignoreTab = newState;
var whitespaceEnd = (str) => str.search(/\S|$/);
var defaultCommands = (selfClosePairs = ['""', "''", "``", "()", "[]", "{}"], selfCloseRegex = /([^$\w'"`]["'`]|.[[({])[.,:;\])}>\s]|.[[({]`/s) => (editor, options) => {
  let prevCopy;
  const { keyCommandMap, inputCommandMap, getSelection, scrollContainer } = editor;
  const getIndent = ({ insertSpaces = true, tabSize } = options) => [insertSpaces ? " " : "	", insertSpaces ? tabSize || 2 : 1];
  const scroll = () => {
    var _a;
    return !options.readOnly && !((_a = editor.extensions.cursor) == null ? void 0 : _a.scrollIntoView());
  };
  const selfClose = ([start, end], [open, close], value, wrapOnly) => (start < end || !wrapOnly && selfCloseRegex.test((value[end - 1] || " ") + open + (value[end] || " "))) && !insertText(editor, open + value.slice(start, end) + close, null, null, start + 1, end + 1);
  const skipIfEqual = ([start, end], char, value) => start == end && value[end] == char && !editor.setSelection(start + 1);
  const insertLines = (old, newL, start, end, selectionStart, selectionEnd) => {
    let newLines = newL.join("\n");
    if (newLines != old.join("\n")) {
      const last = old.length - 1;
      const lastLine = newL[last];
      const oldLastLine = old[last];
      const lastDiff = oldLastLine.length - lastLine.length;
      const firstDiff = newL[0].length - old[0].length;
      const firstInsersion = start + whitespaceEnd((firstDiff < 0 ? newL : old)[0]);
      const lastInsersion = end - oldLastLine.length + whitespaceEnd(lastDiff > 0 ? lastLine : oldLastLine);
      const offset = start - end + newLines.length + lastDiff;
      const newCursorStart = firstInsersion > selectionStart ? selectionStart : Math.max(firstInsersion, selectionStart + firstDiff);
      const newCursorEnd = selectionEnd + start - end + newLines.length;
      insertText(
        editor,
        newLines,
        start,
        end,
        newCursorStart,
        selectionEnd < lastInsersion ? newCursorEnd + lastDiff : Math.max(lastInsersion + offset, newCursorEnd)
      );
    }
  };
  const indent = (outdent, lines, start1, end1, start, end, indentChar, tabSize) => {
    insertLines(
      lines,
      lines.map(
        outdent ? (str) => str.slice(whitespaceEnd(str) ? tabSize - whitespaceEnd(str) % tabSize : 0) : (str) => str && indentChar.repeat(tabSize - whitespaceEnd(str) % tabSize) + str
      ),
      start1,
      end1,
      start,
      end
    );
  };
  inputCommandMap["<"] = (_e, selection, value) => selfClose(selection, "<>", value, true);
  selfClosePairs.forEach(([open, close]) => {
    const isQuote = open == close;
    inputCommandMap[open] = (_e, selection, value) => (isQuote && skipIfEqual(selection, close, value) || selfClose(selection, open + close, value)) && scroll();
    if (!isQuote)
      inputCommandMap[close] = (_e, selection, value) => skipIfEqual(selection, close, value) && scroll();
  });
  inputCommandMap[">"] = (e, selection, value) => {
    var _a, _b;
    const closingTag2 = (_b = (_a = languageMap[getLanguage(editor)]) == null ? void 0 : _a.autoCloseTags) == null ? void 0 : _b.call(_a, selection, value, editor);
    if (closingTag2) {
      insertText(editor, ">" + closingTag2, null, null, selection[0] + 1);
      preventDefault(e);
    }
  };
  keyCommandMap.Tab = (e, [start, end], value) => {
    if (ignoreTab || options.readOnly || getModifierCode(e) & 6)
      return;
    const [indentChar, tabSize] = getIndent(options);
    const shiftKey = e.shiftKey;
    const [lines, start1, end1] = getLines(value, start, end);
    if (start < end || shiftKey) {
      indent(shiftKey, lines, start1, end1, start, end, indentChar, tabSize);
    } else
      insertText(editor, indentChar.repeat(tabSize - (start - start1) % tabSize));
    return scroll();
  };
  keyCommandMap.Enter = (e, selection, value) => {
    var _a, _b, _c;
    const code = getModifierCode(e) & 7;
    if (!code || code == mod) {
      if (code)
        selection[0] = selection[1] = getLines(value, selection[1])[2];
      const [indentChar, tabSize] = getIndent();
      const [start, end] = selection;
      const autoIndent = (_a = languageMap[getLanguage(editor)]) == null ? void 0 : _a.autoIndent;
      const indenationCount = Math.floor(whitespaceEnd(getLineBefore(value, start)) / tabSize) * tabSize;
      const extraIndent = ((_b = autoIndent == null ? void 0 : autoIndent[0]) == null ? void 0 : _b.call(autoIndent, selection, value, editor)) ? tabSize : 0;
      const extraLine = (_c = autoIndent == null ? void 0 : autoIndent[1]) == null ? void 0 : _c.call(autoIndent, selection, value, editor);
      const newText = "\n" + indentChar.repeat(indenationCount + extraIndent) + (extraLine ? "\n" + indentChar.repeat(indenationCount) : "");
      if (newText[1] || value[end]) {
        insertText(editor, newText, start, end, start + indenationCount + extraIndent + 1);
        return scroll();
      }
    }
  };
  keyCommandMap.Backspace = (_e, [start, end], value) => {
    if (start == end) {
      const line = getLineBefore(value, start);
      const tabSize = options.tabSize || 2;
      const isPair = selfClosePairs.includes(value.slice(start - 1, start + 1));
      const indenationCount = /[^ ]/.test(line) ? 0 : (line.length - 1) % tabSize + 1;
      if (isPair || indenationCount > 1) {
        insertText(editor, "", start - (isPair ? 1 : indenationCount), start + isPair);
        return scroll();
      }
    }
  };
  for (let i = 0; i < 2; i++) {
    keyCommandMap[i ? "ArrowDown" : "ArrowUp"] = (e, [start, end], value) => {
      const code = getModifierCode(e);
      if (code == 1) {
        const newStart = i ? start : getLineStart(value, start) - 1;
        const newEnd = i ? value.indexOf("\n", end) + 1 : end;
        if (newStart > -1 && newEnd > 0) {
          const [lines, start1, end1] = getLines(value, newStart, newEnd);
          const line = lines[i ? "pop" : "shift"]();
          const offset = (line.length + 1) * (i ? 1 : -1);
          lines[i ? "unshift" : "push"](line);
          insertText(editor, lines.join("\n"), start1, end1, start + offset, end + offset);
        }
        return scroll();
      } else if (code == 9) {
        const [lines, start1, end1] = getLines(value, start, end);
        const str = lines.join("\n");
        const offset = i ? str.length + 1 : 0;
        insertText(editor, str + "\n" + str, start1, end1, start + offset, end + offset);
        return scroll();
      } else if (code == 2 && !isMac) {
        scrollContainer.scrollBy(0, getStyleValue(scrollContainer, "lineHeight") * (i ? 1 : -1));
        return true;
      }
    };
  }
  addTextareaListener(editor, "keydown", (e) => {
    var _a;
    const code = getModifierCode(e);
    const keyCode = e.keyCode;
    const [start, end, dir] = getSelection();
    if (code == mod && (keyCode == 221 || keyCode == 219)) {
      indent(keyCode == 219, ...getLines(editor.value, start, end), start, end, ...getIndent());
      scroll();
      preventDefault(e);
    } else if (code == (isMac ? 10 : 2) && keyCode == 77) {
      setIgnoreTab(!ignoreTab);
      preventDefault(e);
    } else if (keyCode == 191 && code == mod || keyCode == 65 && code == 9) {
      const value = editor.value;
      const isBlock = code == 9;
      const position = isBlock ? start : getLineStart(value, start);
      const language = languageMap[getLanguage(editor, position)] || {};
      const { line, block } = ((_a = language.getComments) == null ? void 0 : _a.call(language, editor, position, value)) || language.comments || {};
      const [lines, start1, end1] = getLines(value, start, end);
      const last = lines.length - 1;
      if (isBlock) {
        if (block) {
          const [open, close] = block;
          const text = value.slice(start, end);
          const pos = value.slice(0, start).search(regexEscape(open) + " ?$");
          const matches = RegExp("^ ?" + regexEscape(close)).test(value.slice(end));
          if (pos + 1 && matches)
            insertText(
              editor,
              text,
              pos,
              end + +(value[end] == " ") + close.length,
              pos,
              pos + end - start
            );
          else
            insertText(
              editor,
              `${open} ${text} ${close}`,
              start,
              end,
              start + open.length + 1,
              end + open.length + 1
            );
          scroll();
          preventDefault(e);
        }
      } else {
        if (line) {
          const escaped = regexEscape(line);
          const regex2 = RegExp(`^\\s*(${escaped} ?|$)`);
          const regex22 = RegExp(escaped + " ?");
          const allWhiteSpace = !/\S/.test(value.slice(start1, end1));
          const newLines = lines.map(
            lines.every((line2) => regex2.test(line2)) && !allWhiteSpace ? (str) => str.replace(regex22, "") : (str) => allWhiteSpace || /\S/.test(str) ? str.replace(/^\s*/, `$&${line} `) : str
          );
          insertLines(lines, newLines, start1, end1, start, end);
          scroll();
          preventDefault(e);
        } else if (block) {
          const [open, close] = block;
          const insertionPoint = whitespaceEnd(lines[0]);
          const hasComment = lines[0].startsWith(open, insertionPoint) && lines[last].endsWith(close);
          const newLines = lines.slice();
          newLines[0] = lines[0].replace(
            hasComment ? RegExp(regexEscape(open) + " ?") : /(?=\S)|$/,
            hasComment ? "" : open + " "
          );
          let diff = newLines[0].length - lines[0].length;
          newLines[last] = hasComment ? newLines[last].replace(RegExp(`( ?${regexEscape(close)})?$`), "") : newLines[last] + " " + close;
          let newText = newLines.join("\n");
          let firstInsersion = insertionPoint + start1;
          let newStart = firstInsersion > start ? start : Math.max(start + diff, firstInsersion);
          let newEnd = firstInsersion > end - (start != end) ? end : Math.min(Math.max(firstInsersion, end + diff), start1 + newText.length);
          insertText(editor, newText, start1, end1, newStart, Math.max(newStart, newEnd));
          scroll();
          preventDefault(e);
        }
      }
    } else if (code == 8 + mod && keyCode == 75) {
      const value = editor.value;
      const [lines, start1, end1] = getLines(value, start, end);
      const column = dir > "f" ? end - end1 + lines.pop().length : start - start1;
      const newLineLen = getLineEnd(value, end1 + 1) - end1 - 1;
      insertText(
        editor,
        "",
        start1 - !!start1,
        end1 + !start1,
        start1 + Math.min(column, newLineLen)
      );
      scroll();
      preventDefault(e);
    }
  });
  ["copy", "cut", "paste"].forEach(
    (type) => addTextareaListener(editor, type, (e) => {
      const [start, end] = getSelection();
      if (start == end && clipboard) {
        const [[line], start1, end1] = getLines(editor.value, start, end);
        if (type == "paste") {
          if (e.clipboardData.getData("text/plain") == prevCopy) {
            insertText(editor, prevCopy + "\n", start1, start1, start + prevCopy.length + 1);
            scroll();
            preventDefault(e);
          }
        } else {
          clipboard.writeText(prevCopy = line);
          if (type == "cut")
            insertText(editor, "", start1, end1 + 1), scroll();
          preventDefault(e);
        }
      }
    })
  );
};
var editHistory = (historyLimit = 999) => {
  let sp = 0;
  let currentEditor;
  let allowMerge;
  let isTyping = false;
  let prevInputType;
  let prevData;
  let prevTime;
  let isMerge;
  let textarea;
  let getSelection;
  const stack = [];
  const update = (index) => {
    if (index >= historyLimit) {
      index--;
      stack.shift();
    }
    stack.splice(sp = index, historyLimit, [currentEditor.value, getSelection(), getSelection()]);
  };
  const setEditorState = (index) => {
    var _a;
    if (stack[index]) {
      textarea.value = stack[index][0];
      textarea.setSelectionRange(...stack[index][index < sp ? 2 : 1]);
      currentEditor.update();
      (_a = currentEditor.extensions.cursor) == null ? void 0 : _a.scrollIntoView();
      sp = index;
      allowMerge = false;
    }
  };
  const self = (editor, options) => {
    editor.extensions.history = self;
    currentEditor = editor;
    getSelection = editor.getSelection;
    textarea || update(0);
    textarea = editor.textarea;
    editor.addListener("selectionChange", () => {
      allowMerge = isTyping;
      isTyping = false;
    });
    addTextareaListener(editor, "beforeinput", (e) => {
      let data = e.data;
      let inputType = e.inputType;
      let time = e.timeStamp;
      if (/history/.test(inputType)) {
        setEditorState(sp + (inputType[7] == "U" ? -1 : 1));
        preventDefault(e);
      } else if (!(isMerge = allowMerge && (prevInputType == inputType || time - prevTime < 99 && inputType.slice(-4) == "Drop") && !prevSelection && (data != " " || prevData == data))) {
        stack[sp][2] = prevSelection || getSelection();
      }
      isTyping = true;
      prevData = data;
      prevTime = time;
      prevInputType = inputType;
    });
    addTextareaListener(editor, "input", () => update(sp + !isMerge));
    addTextareaListener(editor, "keydown", (e) => {
      if (!options.readOnly) {
        const code = getModifierCode(e);
        const keyCode = e.keyCode;
        const isUndo = code == mod && keyCode == 90;
        const isRedo = code == mod + 8 && keyCode == 90 || !isMac && code == mod && keyCode == 89;
        if (isUndo) {
          setEditorState(sp - 1);
          preventDefault(e);
        } else if (isRedo) {
          setEditorState(sp + 1);
          preventDefault(e);
        }
      }
    });
  };
  self.clear = () => {
    update(0);
    allowMerge = false;
  };
  self.has = (offset) => sp + offset in stack;
  self.go = (offset) => setEditorState(sp + offset);
  return self;
};

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/extensions/cursor.js
var cursorTemplate = createTemplate(
  "<div style=position:absolute;top:0;opacity:0;padding:inherit> <span><span></span> "
);
var cursorPosition = () => {
  let cEditor;
  let prevBefore = " ";
  let prevAfter = " ";
  const cursorContainer = cursorTemplate();
  const [before, span] = cursorContainer.childNodes;
  const [cursor, after] = span.childNodes;
  const selectionChange2 = (selection) => {
    let { value, activeLine } = cEditor;
    let position = selection[selection[2] < "f" ? 0 : 1];
    let newBefore = getLineBefore(value, position);
    let newAfter = value.slice(position, getLineEnd(value, position));
    if (!newBefore && !newAfter)
      newAfter = " ";
    if (prevBefore != newBefore)
      before.data = prevBefore = newBefore;
    if (prevAfter != newAfter)
      after.data = prevAfter = newAfter;
    if (cursorContainer.parentNode != activeLine)
      activeLine.prepend(cursorContainer);
  };
  const scrollIntoView = () => scrollToEl(cEditor, cursor);
  const self = (editor) => {
    editor.addListener("selectionChange", selectionChange2);
    cEditor = editor;
    editor.extensions.cursor = self;
    addTextareaListener(editor, "input", (e) => {
      if (/history/.test(e.inputType))
        scrollIntoView();
    });
    if (editor.activeLine)
      selectionChange2(editor.getSelection());
  };
  self.getPosition = () => {
    const rect1 = cursor.getBoundingClientRect();
    const rect2 = cEditor.overlays.getBoundingClientRect();
    return {
      top: rect1.y - rect2.y,
      bottom: rect2.bottom - rect1.bottom,
      left: rect1.x - rect2.x,
      right: rect2.right - rect1.x,
      height: rect1.height
    };
  };
  self.scrollIntoView = scrollIntoView;
  self.element = cursor;
  return self;
};

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/extensions/copyButton/index.js
var template2 = createTemplate(
  '<div style=display:flex;align-items:flex-start;justify-content:flex-end><button type=button dir=ltr style=display:none class=pce-copy aria-label=Copy><svg width=1.2em viewbox="0 0 48 48" overflow=visible stroke-width=4 stroke-linecap=round fill=none stroke=currentColor><rect x=16 y=16 width=30 height=30 rx=3 /><path d="M32 9V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v24a3 3 0 0 0 3 3h4"/>'
);
var clipboard2 = navigator.clipboard;
var copyButton = () => (editor) => {
  const container = template2(), btn = container.firstChild;
  btn.addEventListener("click", () => {
    var _a, _b;
    btn.setAttribute("aria-label", "Copied!");
    if (clipboard2)
      clipboard2.writeText((_b = (_a = editor.extensions.codeFold) == null ? void 0 : _a.fullCode) != null ? _b : editor.value);
    else {
      editor.textarea.select();
      document.execCommand("copy");
      editor.setSelection(0);
    }
  });
  btn.addEventListener("pointerenter", () => btn.setAttribute("aria-label", "Copy"));
  editor.overlays.append(container);
};

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/extensions/matchTags.js
var voidlessLangs = "xml,rss,atom,jsx,tsx,xquery,actionscript".split(",");
var voidTags = /^(?:area|base|w?br|col|embed|hr|img|input|link|meta|source|track)$/i;
var createTagMatcher = (editor) => {
  let pairMap = [];
  let code;
  let tags = [];
  let tagIndex;
  let sp;
  let stack = [];
  let matchTags2 = (tokens, language, value) => {
    code = value;
    tags.length = pairMap.length = tagIndex = sp = 0;
    matchTagsRecursive(tokens, language, 0);
  };
  let matchTagsRecursive = (tokens, language, position) => {
    let noVoidTags = voidlessLangs.includes(language);
    let i = 0;
    let l = tokens.length;
    for (; i < l; ) {
      const token = tokens[i++];
      const content = token.content;
      const length = token.length;
      if (Array.isArray(content)) {
        if (token.type == "tag" && code[position] == "<") {
          const openLen = content[0].length;
          const tagName = content[2] ? code.substr(position + openLen, content[1].length) : "";
          const notSelfClosing = content[content.length - 1].length < 2 && (noVoidTags || !voidTags.test(tagName));
          if (content[2] && noVoidTags)
            matchTagsRecursive(content, language, position);
          if (notSelfClosing) {
            if (openLen > 1) {
              for (let i2 = sp; i2; ) {
                if (tagName == stack[--i2][1]) {
                  pairMap[pairMap[tagIndex] = stack[sp = i2][0]] = tagIndex;
                  i2 = 0;
                }
              }
            } else {
              stack[sp++] = [tagIndex, tagName];
            }
          }
          tags[tagIndex++] = [
            token,
            position,
            position + length,
            tagName,
            openLen > 1,
            notSelfClosing
          ];
        } else {
          let lang = token.alias || token.type;
          matchTagsRecursive(
            content,
            lang.slice(0, 9) == "language-" ? lang.slice(9) : language,
            position
          );
        }
      }
      position += length;
    }
  };
  editor.addListener("tokenize", matchTags2);
  matchTags2(editor.tokens, editor.options.language, editor.value);
  return {
    tags,
    pairs: pairMap
  };
};
var getClosestTagIndex = (pos, tags) => {
  for (let i = 0, l = tags.length; i < l; i++)
    if (tags[i][1] <= pos && tags[i][2] >= pos)
      return i;
};
var matchTags = () => (editor) => {
  var _a;
  let openEl, closeEl;
  const { tags, pairs } = (_a = editor.extensions).matchTags || (_a.matchTags = createTagMatcher(editor));
  const highlight = (remove) => [openEl, closeEl].forEach((el) => {
    el && el.classList.toggle("active-tagname", !remove);
  });
  editor.addListener("selectionChange", ([start, end]) => {
    let newEl1;
    let newEl2;
    let index;
    if (start == end && editor.focused) {
      index = getClosestTagIndex(start, tags);
      if (index + 1) {
        index = pairs[index];
        if (index + 1 && (newEl1 = getClosestToken(editor, ".tag>.tag"))) {
          newEl2 = getClosestToken(editor, ".tag>.tag", 2, 0, tags[index][1]);
        }
      }
    }
    if (openEl != newEl1) {
      highlight(true);
      openEl = newEl1;
      closeEl = newEl2;
      highlight();
    }
  });
};

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/extensions/guides.js
var template3 = createTemplate(
  "<div class=guide-indents style=left:var(--padding-left);bottom:auto;right:auto> "
);
var indentTemplate = createTemplate(
  "<div style=width:1px;position:absolute;background:var(--bg-guide-indent)>"
);
var indentGuides = () => {
  let tabSize;
  let prevLength = 0;
  let lineIndentMap;
  let active = -1;
  let currentEditor;
  const lines = [];
  const indents = [];
  const container = template3();
  const indentLevels = [];
  const update = (code) => {
    lineIndentMap = [];
    const newIndents = getIndents(code.split("\n"));
    const l = newIndents.length;
    for (let i = 0, prev = [], next = newIndents[0]; next; i++) {
      const style = (lines[i] || (lines[i] = indentTemplate())).style;
      const [top, height, left] = next;
      const old = indents[i];
      next = newIndents[i + 1];
      if (top != (old == null ? void 0 : old[0]))
        style.top = top + "00%";
      if (height != (old == null ? void 0 : old[1]))
        style.height = height + "00%";
      if (left != (old == null ? void 0 : old[2]))
        style.left = left * 100 + "%";
      const isSingleIndent = prev[0] != top && (next == null ? void 0 : next[0]) != top, isSingleOutdent = prev[0] + prev[1] != top + height && (next == null ? void 0 : next[0]) + (next == null ? void 0 : next[1]) != top + height;
      for (let j = -isSingleIndent, l2 = height + isSingleOutdent; j < l2; j++)
        lineIndentMap[j + top] = i;
      prev = indents[i] = newIndents[i];
    }
    for (let i = prevLength; i > l; )
      lines[--i].remove();
    container.append(...lines.slice(prevLength, prevLength = l));
  };
  const updateActive = () => {
    var _a;
    const newActive = (_a = lineIndentMap[currentEditor.activeLineNumber - 1]) != null ? _a : -1;
    if (newActive != active) {
      active > -1 && (lines[active].className = "");
      newActive > -1 && (lines[newActive].className = "active");
    }
    active = newActive;
  };
  const getIndents = (lines2) => {
    const l = lines2.length;
    const stack = [];
    const results = [];
    for (let prevIndent = 0, emptyPos = -1, i = 0, p = 0; ; i++) {
      const last = i == l;
      const indent = last ? 0 : indentLevels[i] = getIndentCount(lines2[i]);
      if (indent < 0) {
        if (emptyPos < 0)
          emptyPos = i;
      } else {
        for (let j = indent; j < prevIndent; j++) {
          stack[j][1] = (emptyPos < 0 || j == indent && !last ? i : emptyPos) - stack[j][0];
        }
        for (let j = prevIndent; j < indent; ) {
          results[p++] = stack[j] = [
            emptyPos < 0 || j > prevIndent ? i : emptyPos,
            0,
            j++ * tabSize
          ];
        }
        emptyPos = -1;
        prevIndent = indent;
      }
      if (last)
        break;
    }
    indentLevels.length = l;
    return results;
  };
  const getIndentCount = (text) => {
    let l = text.search(/\S/);
    let result = 0;
    if (l < 0)
      return l;
    for (let i = 0; i < l; ) {
      result += text[i++] == "	" ? tabSize - result % tabSize : 1;
    }
    return Math.ceil(result / tabSize);
  };
  return {
    lines: container.children,
    indentLevels,
    update(editor, options) {
      if (!currentEditor) {
        currentEditor = editor;
        editor.extensions.indentGuides = this;
        editor.overlays.append(container);
        editor.addListener("update", update);
        editor.addListener("selectionChange", updateActive);
      }
      container.style.display = options.wordWrap ? "none" : "";
      if (tabSize != (tabSize = options.tabSize || 2))
        update(editor.value), updateActive();
    }
  };
};

// ../../node_modules/.pnpm/prism-code-editor@3.4.0/node_modules/prism-code-editor/dist/extensions/matchBrackets/highlight.js
var highlightBracketPairs = () => (editor) => {
  let brackets, matcher, pairs, activeID = -1, els = [], selectionChange2 = () => {
    matcher || (matcher = editor.extensions.matchBrackets);
    let [start, end] = editor.getSelection();
    let newID = start == end && editor.focused && matcher ? closest(end) || -1 : -1;
    if (newID != activeID) {
      toggleActive();
      if (newID + 1) {
        let opening = brackets[pairs[newID]];
        let closing = brackets[newID];
        els = [opening, closing].map(
          (bracket) => getClosestToken(editor, ".punctuation", 0, -1, bracket[1])
        );
        if (els[0] != els[1] && opening[1] + opening[3].length == closing[1]) {
          els[0].textContent += els[1].textContent;
          els[1].textContent = "";
          els[1] = els[0];
        }
        toggleActive(true);
      } else
        els = [];
      activeID = newID;
    }
  }, closest = (offset) => {
    var _a;
    ({ brackets, pairs } = matcher);
    for (let i = 0, bracket; bracket = brackets[++i]; ) {
      if (!bracket[4] && bracket[5] >= offset && ((_a = brackets[pairs[i]]) == null ? void 0 : _a[1]) <= offset) {
        return i;
      }
    }
  }, toggleActive = (add) => els.forEach((el) => el.classList.toggle("active-bracket", !!add));
  addTextareaListener(editor, "focus", selectionChange2);
  addTextareaListener(editor, "blur", selectionChange2);
  editor.addListener("selectionChange", selectionChange2);
  editor.addListener("update", () => {
    toggleActive();
    activeID = -1;
  });
};

// src/utils/options.ts
__toESM(require_lz_string());
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

// src/modes/editor.ts
function editorOptions(config, value) {
  const create = {
    insertSpaces: config.useTabs === false,
    language: config.language,
    lineNumbers: config.lineNumbers,
    wordWrap: config.wordWrap,
    tabSize: config.tabSize,
    rtl: config.rtl,
    readOnly: config.readOnly
  };
  if (value) {
    create.value = value;
  } else if (has("value", config)) {
    create.value = config.value;
  }
  return create;
}
function setEditor(element, value, config) {
  const events = /* @__PURE__ */ Object.create(null);
  events.onupdate = [];
  events.onresize = [];
  events.onscroll = [];
  events.onselect = [];
  events.onsave = [];
  const instance = {
    onselect: (cb, scope = {}) => events.onselect.push([cb, scope]),
    onscroll: (cb, scope = {}) => events.onscroll.push([cb, scope]),
    onupdate: (cb, scope = {}) => events.onupdate.push([cb, scope]),
    onresize: (cb, scope = {}) => events.onresize.push([cb, scope]),
    onsave: (cb, scope = {}) => events.onsave.push([cb, scope]),
    error: /* @__PURE__ */ Object.create(null)
  };
  const editor = editorFromPlaceholder(element, editorOptions(config, value), ...setExtensions(config));
  const MetaKey = editor.keyCommandMap.Meta;
  let initial = value;
  let heightY;
  let errShow = false;
  let metaKey = false;
  let scrollX;
  let scrollY;
  let iselect;
  let noupdate = false;
  editor.scrollContainer.id = config.id;
  editor.textarea.name = config.id;
  if (config.lineFence) {
    editor.scrollContainer.style.setProperty("--line-fence", "block");
  }
  Object.defineProperties(instance, {
    activeLine: { get: () => editor.activeLine },
    focused: { get: () => editor.focused },
    overlays: { get: () => editor.overlays },
    lineNumber: { get: () => editor.activeLineNumber },
    tokens: { get: () => editor.tokens },
    container: { get: () => editor.scrollContainer },
    textarea: { get: () => editor.textarea },
    wrapper: { get: () => editor.wrapper },
    removed: { get: () => editor.removed },
    language: { get: () => editor.options.language },
    id: { get: () => config.id },
    keyCommandMap: { get: () => editor.keyCommandMap },
    inputCommandMap: { get: () => editor.inputCommandMap },
    initial: { get: () => initial },
    input: { get: () => editor.value },
    extensions: { get: () => editor.extensions },
    addExtensions: { get: () => editor.addExtensions },
    remove: { get: () => editor.remove }
  });
  editor.addListener("update", (e) => {
    if (errShow) {
      instance.error.hide();
      editor.update();
      return;
    }
    if (noupdate === false) {
      for (const [cb, scope] of events.onupdate) {
        cb.call(assign(scope, { get editor() {
          return instance;
        } }), e);
      }
    } else {
      noupdate = false;
    }
    heightY = editor.scrollContainer.offsetHeight;
    for (const [cb, scope] of events.onresize) {
      cb.call(assign(scope, { get editor() {
        return instance;
      } }), {
        height: heightY,
        width: editor.scrollContainer.offsetWidth,
        scrollX,
        scrollY
      });
    }
  });
  editor.addListener("selectionChange", (inputSelection) => {
    if (iselect !== inputSelection) {
      iselect = inputSelection;
      for (const [cb, scope] of events.onselect) {
        cb.call(assign(scope, { get editor() {
          return instance;
        } }), inputSelection);
      }
    }
  });
  editor.keyCommandMap.Meta = (e, selection, value2) => {
    metaKey = true;
    return MetaKey == null ? void 0 : MetaKey(e, selection, value2);
  };
  editor.keyCommandMap.s = (_event, _selection, value2) => {
    if (!metaKey) return;
    metaKey = false;
    for (const [cb, scope] of events.onsave) {
      cb.call(assign(scope, { get editor() {
        return instance;
      } }), value2);
    }
    return true;
  };
  editor.scrollContainer.onscroll = (e) => {
    scrollY = editor.scrollContainer.scrollTop;
    scrollX = editor.scrollContainer.scrollLeft;
    for (const [cb, scope] of events.onscroll) {
      cb.call(assign(scope, { get editor() {
        return instance;
      } }), { x: scrollX, y: scrollY });
    }
  };
  instance.scroll = (position = {}) => {
    if (typeof position.y === "number") {
      scrollY = editor.scrollContainer.scrollTop = position.y;
    }
    if (typeof position.x === "number") {
      scrollX = editor.scrollContainer.scrollLeft = position.x;
    }
  };
  instance.height = (y, reset = false) => {
    if (editor.value.length > config.locLimit) {
      if (!editor.scrollContainer.style.getPropertyValue("max-height")) {
        editor.scrollContainer.style.height = "auto";
        heightY = editor.scrollContainer.offsetHeight;
        editor.scrollContainer.style.height = `${heightY}px`;
        editor.scrollContainer.style.maxHeight = `${heightY}px`;
      }
      return heightY;
    }
    editor.scrollContainer.style.height = "auto";
    if (y === void 0) {
      heightY = editor.scrollContainer.offsetHeight;
      if (config.autoHeight || reset === true) {
        editor.scrollContainer.style.height = "auto";
      } else {
        editor.scrollContainer.style.height = `${heightY}px`;
        editor.scrollContainer.style.maxHeight = `${heightY}px`;
      }
    } else {
      if (heightY !== y) {
        heightY = y;
        editor.scrollContainer.style.height = `${heightY}px`;
      }
    }
    return heightY;
  };
  instance.reset = (clearHistory = false) => {
    if (clearHistory) editor.extensions.history.clear();
    insertText(editor, initial);
  };
  instance.select = (start, end = null, direction = "none") => {
    if (start === void 0) return editor.getSelection();
    if (typeof start === "number") {
      editor.setSelection(start, end, direction);
    } else if (Array.isArray(start)) {
      if (iselect !== start) {
        iselect = start;
        editor.setSelection(start[0], start[1] || null, start[2] || "none");
      }
    }
    return editor.getSelection();
  };
  instance.update = (codeInput, language, clearHistory = false) => {
    if (language) {
      if (clearHistory) {
        editor.extensions.history.clear();
        initial = codeInput;
      }
      config.language = language;
      editor.setOptions({ language, value: codeInput });
    } else {
      if (config.readOnly) {
        editor.setOptions({ value: codeInput });
      } else {
        if (codeInput !== editor.value) {
          const [start] = editor.getSelection();
          const selection = editor.value.length;
          noupdate = true;
          insertText(editor, codeInput, 0, selection, start);
        }
      }
    }
  };
  instance.options = (opts) => {
    if (typeof opts === "object") {
      assign(config, setOptions("mount", opts));
      if (config.lineFence === false) {
        editor.wrapper.style.removeProperty("--line-fence");
      }
      editor.setOptions(editorOptions(opts));
    }
    return config;
  };
  instance.enable = () => {
    if (editor.options.readOnly === true) {
      instance.options({ readOnly: false });
    }
  };
  instance.disable = () => {
    if (editor.options.readOnly === false) {
      instance.options({ readOnly: true });
    }
  };
  instance.error.show = (input, context = {}) => {
    instance.error.hide();
    const error = document.createElement("div");
    error.className = "error";
    error.setAttribute("id", "error");
    const message = document.createElement("div");
    message.className = "error-message error-ref";
    message.innerText = input;
    if (context) {
      if (context == null ? void 0 : context.title) {
        const title = document.createElement("div");
        title.className = "error-title error-ref";
        title.innerText = context.title;
        error.appendChild(title);
        error.appendChild(message);
      } else {
        error.appendChild(message);
      }
      if (context == null ? void 0 : context.stack) {
        const stack = document.createElement("div");
        stack.className = "error-stack error-ref";
        stack.innerText = context.stack;
        error.appendChild(stack);
      }
      if (context == null ? void 0 : context.heading) {
        const heading = document.createElement("div");
        heading.className = "error-heading error-ref";
        heading.innerText = context.heading;
        error.appendChild(heading);
      }
    } else {
      error.appendChild(message);
    }
    editor.overlays.appendChild(error);
    errShow = true;
  };
  instance.error.hide = () => {
    if (errShow) {
      editor.overlays.querySelector("#error").remove();
      editor.scrollContainer.classList.remove("error");
      errShow = false;
    }
  };
  if (config.autoHeight === false) setTimeout(() => instance.height(), 100);
  return instance;
}
function setExtensions(config) {
  const plugins = [
    cursorPosition(),
    defaultCommands(
      config.selfClosePairs,
      config.selfCloseRegex
    )
  ];
  if (config.copyButton) {
    plugins.push(copyButton());
  }
  if (config.indentGuides) {
    plugins.push(indentGuides());
  }
  if (config.searchWidget) {
    plugins.push(searchWidget());
  }
  if (config.matchSelected) {
    plugins.push(highlightSelectionMatches());
  }
  if (config.bracketPairs) {
    plugins.push(highlightBracketPairs());
  }
  if (config.matchTags) {
    plugins.push(matchTags());
  }
  if (config.readOnly === false) {
    plugins.push(editHistory(config.editHistory));
  }
  return plugins;
}

// src/modes/mount.ts
function select(selector, options) {
  if (document.readyState === "loading") {
    addEventListener("DOMContentLoaded", () => select(selector, options));
    return;
  }
  const single = typeof selector === "object";
  {
    document.body.querySelectorAll(selector).forEach((element) => mount(element, options));
  }
  const instances = Array.from(model.values());
  return single ? instances[instances.length - 1] : instances;
}
function mount(element, options) {
  let config;
  let input = "";
  if (element.hasAttribute("data-papyrus")) {
    const attr = decompress(element.getAttribute("data-papyrus").trim());
    config = setOptions("mount", attr);
    if (config.readOnly === false) {
      input = element.querySelector("textarea").value;
    } else {
      input = Array.from(element.querySelector("code").children).slice(1).map((child) => child.textContent).join("\n");
    }
    if (has("input", config) && config.input !== null) {
      input = config.input;
    }
    element.removeAttribute("data-papyrus");
  } else {
    if (!has("language", options)) {
      options.language = getLanguageFromCode(element);
    }
    config = setOptions("mount", options);
  }
  if (config.language === "treeview") return;
  const editor = setEditor(element, input, config);
  model.set(editor.id, editor);
  return editor;
}

// src/modes/highlight.ts
function raw(codeInput, config) {
  const input = trimInput(codeInput, config.trimStart, config.trimEnd);
  const tokenize2 = tokenizeText(input, languages[config.language]);
  const rawCode = highlightTokens(tokenize2);
  const markup = config.lineNumbers === false || config.language === "treeview" ? rawCode : rawCode.split("\n").map((token, i) => {
    const r = `<div class="line-no" aria-hidden="true" data-line="${i + 1}">${token}</div>`;
    return r;
  }).join("");
  return markup;
}
function extend2(config) {
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
  const markup = raw(codeInput, config);
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
  return `${output}${extend2(config)}${markup}</code></pre>`;
}

// src/browser.ts
var papyrus = function papyrus2(options) {
  return select("pre.prism-code-editor", options);
};
if (typeof window !== "undefined" && has("papyprus", window) === false) {
  Object.defineProperty(window, "papyrus", {
    get() {
      return model;
    }
  });
}
if (has("model", papyrus) === false) {
  Object.defineProperties(papyrus, {
    model: {
      get() {
        return model;
      }
    },
    grammar: {
      get() {
        return grammar2;
      }
    }
  });
}
papyrus.get = get;
papyrus.list = list;
papyrus.mount = mount;
papyrus.highlight = createHighlight;
var browser_default = papyrus;

export { browser_default as default };
