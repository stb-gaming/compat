const getBrowserInfo = (function(){
    var ua= navigator.userAgent;
    var tem; 
    var M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
});
  
  const browserInfo = getBrowserInfo();

document.getElementById("browser").innerText = browserInfo



function createCanvas() {
	return document.createElement('canvas')
}

function checkWasm() {
	try {
		if(typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function') {
			const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
			if(module instanceof WebAssembly.Module) {
				return new WebAssembly.Instance(module) instanceof WebAssembly.Instance
			}
		}

	} catch (e) {
	}
	return false;
}


const tests = {
	js: true,
	canvas: !!createCanvas().getContext,
	uint8: !!window.Uint8Array,
	uint16: !!window.Uint16Array,
	uint32: !!window.Uint32Array,
	fetch: !!window.fetch,
	gamepad: !!navigator.getGamepads,
	keyboard: !!window.KeyboardEvent,
	midi: !!navigator.requestMIDIAccess,
	'2d': !!createCanvas().getContext('2d'),
	'webgl': !!createCanvas().getContext('webgl'),
	'webgl2': !!createCanvas().getContext('webgl2'),
	'webgpu': !!createCanvas().getContext('webgpu'),
	wasm: checkWasm()
}

for (const key in tests) {
	const element = document.getElementById(key)
	if(element) element.className = tests[key]?"yes":"no"
}