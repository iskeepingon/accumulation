"use strict"

function safe_add(d, _) {
  var r = (65535 & d) + (65535 & _)
  return (d >> 16) + (_ >> 16) + (r >> 16) << 16 | 65535 & r
}

function bit_rol(d, _) {
  return d << _ | d >>> 32 - _
}

function md5_cmn(d, _, r, m, n, t) {
  return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(m, t)), n), r)
}

function md5_ff(d, _, r, m, n, t, f) {
  return md5_cmn(_ & r | ~_ & m, d, _, n, t, f)
}

function md5_gg(d, _, r, m, n, t, f) {
  return md5_cmn(_ & m | r & ~m, d, _, n, t, f)
}

function md5_hh(d, _, r, m, n, t, f) {
  return md5_cmn(_ ^ r ^ m, d, _, n, t, f)
}

function md5_ii(d, _, r, m, n, t, f) {
  return md5_cmn(r ^ (_ | ~m), d, _, n, t, f)
}

function binl_md5(d, _) {
  d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _
  var r, m, n, t, f, i = 1732584193, e = -271733879, h = -1732584194, a = 271733878
  for (r = 0; r < d.length; r += 16) m = i, n = e, t = h, f = a, i = md5_ff(i, e, h, a, d[r], 7, -680876936), a = md5_ff(a, i, e, h, d[r + 1], 12, -389564586), h = md5_ff(h, a, i, e, d[r + 2], 17, 606105819), e = md5_ff(e, h, a, i, d[r + 3], 22, -1044525330), i = md5_ff(i, e, h, a, d[r + 4], 7, -176418897), a = md5_ff(a, i, e, h, d[r + 5], 12, 1200080426), h = md5_ff(h, a, i, e, d[r + 6], 17, -1473231341), e = md5_ff(e, h, a, i, d[r + 7], 22, -45705983), i = md5_ff(i, e, h, a, d[r + 8], 7, 1770035416), a = md5_ff(a, i, e, h, d[r + 9], 12, -1958414417), h = md5_ff(h, a, i, e, d[r + 10], 17, -42063), e = md5_ff(e, h, a, i, d[r + 11], 22, -1990404162), i = md5_ff(i, e, h, a, d[r + 12], 7, 1804603682), a = md5_ff(a, i, e, h, d[r + 13], 12, -40341101), h = md5_ff(h, a, i, e, d[r + 14], 17, -1502002290), e = md5_ff(e, h, a, i, d[r + 15], 22, 1236535329), i = md5_gg(i, e, h, a, d[r + 1], 5, -165796510), a = md5_gg(a, i, e, h, d[r + 6], 9, -1069501632), h = md5_gg(h, a, i, e, d[r + 11], 14, 643717713), e = md5_gg(e, h, a, i, d[r], 20, -373897302), i = md5_gg(i, e, h, a, d[r + 5], 5, -701558691), a = md5_gg(a, i, e, h, d[r + 10], 9, 38016083), h = md5_gg(h, a, i, e, d[r + 15], 14, -660478335), e = md5_gg(e, h, a, i, d[r + 4], 20, -405537848), i = md5_gg(i, e, h, a, d[r + 9], 5, 568446438), a = md5_gg(a, i, e, h, d[r + 14], 9, -1019803690), h = md5_gg(h, a, i, e, d[r + 3], 14, -187363961), e = md5_gg(e, h, a, i, d[r + 8], 20, 1163531501), i = md5_gg(i, e, h, a, d[r + 13], 5, -1444681467), a = md5_gg(a, i, e, h, d[r + 2], 9, -51403784), h = md5_gg(h, a, i, e, d[r + 7], 14, 1735328473), e = md5_gg(e, h, a, i, d[r + 12], 20, -1926607734), i = md5_hh(i, e, h, a, d[r + 5], 4, -378558), a = md5_hh(a, i, e, h, d[r + 8], 11, -2022574463), h = md5_hh(h, a, i, e, d[r + 11], 16, 1839030562), e = md5_hh(e, h, a, i, d[r + 14], 23, -35309556), i = md5_hh(i, e, h, a, d[r + 1], 4, -1530992060), a = md5_hh(a, i, e, h, d[r + 4], 11, 1272893353), h = md5_hh(h, a, i, e, d[r + 7], 16, -155497632), e = md5_hh(e, h, a, i, d[r + 10], 23, -1094730640), i = md5_hh(i, e, h, a, d[r + 13], 4, 681279174), a = md5_hh(a, i, e, h, d[r], 11, -358537222), h = md5_hh(h, a, i, e, d[r + 3], 16, -722521979), e = md5_hh(e, h, a, i, d[r + 6], 23, 76029189), i = md5_hh(i, e, h, a, d[r + 9], 4, -640364487), a = md5_hh(a, i, e, h, d[r + 12], 11, -421815835), h = md5_hh(h, a, i, e, d[r + 15], 16, 530742520), e = md5_hh(e, h, a, i, d[r + 2], 23, -995338651), i = md5_ii(i, e, h, a, d[r], 6, -198630844), a = md5_ii(a, i, e, h, d[r + 7], 10, 1126891415), h = md5_ii(h, a, i, e, d[r + 14], 15, -1416354905), e = md5_ii(e, h, a, i, d[r + 5], 21, -57434055), i = md5_ii(i, e, h, a, d[r + 12], 6, 1700485571), a = md5_ii(a, i, e, h, d[r + 3], 10, -1894986606), h = md5_ii(h, a, i, e, d[r + 10], 15, -1051523), e = md5_ii(e, h, a, i, d[r + 1], 21, -2054922799), i = md5_ii(i, e, h, a, d[r + 8], 6, 1873313359), a = md5_ii(a, i, e, h, d[r + 15], 10, -30611744), h = md5_ii(h, a, i, e, d[r + 6], 15, -1560198380), e = md5_ii(e, h, a, i, d[r + 13], 21, 1309151649), i = md5_ii(i, e, h, a, d[r + 4], 6, -145523070), a = md5_ii(a, i, e, h, d[r + 11], 10, -1120210379), h = md5_ii(h, a, i, e, d[r + 2], 15, 718787259), e = md5_ii(e, h, a, i, d[r + 9], 21, -343485551), i = safe_add(i, m), e = safe_add(e, n), h = safe_add(h, t), a = safe_add(a, f)
  return [i, e, h, a]
}

function binl2rstr(d) {
  var _, r = ""
  for (_ = 0; _ < 32 * d.length; _ += 8) r += String.fromCharCode(d[_ >> 5] >>> _ % 32 & 255)
  return r
}

function rstr2binl(d) {
  var _, r = []
  for (r[(d.length >> 2) - 1] = void 0, _ = 0; _ < r.length; _ += 1) r[_] = 0
  for (_ = 0; _ < 8 * d.length; _ += 8) r[_ >> 5] |= (255 & d.charCodeAt(_ / 8)) << _ % 32
  return r
}

function rstr_md5(d) {
  return binl2rstr(binl_md5(rstr2binl(d), 8 * d.length))
}

function rstr_hmac_md5(d, _) {
  var r, m, n = rstr2binl(d), t = [], f = []
  for (t[15] = f[15] = void 0, n.length > 16 && (n = binl_md5(n, 8 * d.length)), r = 0; r < 16; r += 1) t[r] = 909522486 ^ n[r], f[r] = 1549556828 ^ n[r]
  return m = binl_md5(t.concat(rstr2binl(_)), 512 + 8 * _.length), binl2rstr(binl_md5(f.concat(m), 640))
}

function rstr2hex(d) {
  var _, r, m = "0123456789abcdef", n = ""
  for (r = 0; r < d.length; r += 1) _ = d.charCodeAt(r), n += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _)
  return n
}

function str2rstr_utf8(d) {
  return unescape(encodeURIComponent(d))
}

function raw_md5(d) {
  return rstr_md5(str2rstr_utf8(d))
}

function hex_md5(d) {
  return rstr2hex(raw_md5(d))
}

function raw_hmac_md5(d, _) {
  return rstr_hmac_md5(str2rstr_utf8(d), str2rstr_utf8(_))
}

function hex_hmac_md5(d, _) {
  return rstr2hex(raw_hmac_md5(d, _))
}

function md5(d, _, r) {
  return _ ? r ? raw_hmac_md5(_, d) : hex_hmac_md5(_, d) : r ? raw_md5(d) : hex_md5(d)
}

Object.defineProperty(exports, "__esModule", {value: !0}), exports.default = md5
