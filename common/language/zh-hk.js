
import lang from './lang.js'
import cn from './zh-cn.js'

function deepCopy(obj) {
	var result = Array.isArray(obj) ? [] : {}
	for (var key in obj) {
		if (typeof obj[key] === 'object' && obj[key] !== null) {
			result[key] = deepCopy(obj[key])
		} else {
			result[key] = lang(obj[key])
		}
	}
	return result;
}
let tw = deepCopy(cn)
// console.log(JSON.stringify(tw, {}, 4))
//#ifdef H5
if (location.hostname === 'localhost') {
	//tw = cn
}
//#endif
export default tw
