/**
 * Get Environment Variables
 * @author VirgilClyne
 * @param {String} key - Persistent Store Key
 * @param {String} name - Platform Name
 * @param {Object} database - Default Database
 * @return {Promise<*>}
 */
async function getENV(key, name, database) {
	//$.log(`⚠ ${$.name}, Get Environment Variables`, "");
	/***************** BoxJs *****************/
	// 包装为局部变量，用完释放内存
	// BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
	let BoxJs = $.getjson(key, database);
	//$.log(`🚧 ${$.name}, Get Environment Variables`, `BoxJs类型: ${typeof BoxJs}`, `BoxJs内容: ${JSON.stringify(BoxJs)}`, "");
	/***************** Settings *****************/
	let Settings = BoxJs?.Settings?.[name] || database.Settings[name];
	//$.log(`🎉 ${$.name}, Get Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	let Config = BoxJs?.Config?.[name] || database?.Config?.[name];
	let Caches = BoxJs?.Caches?.[name];
	if (typeof Caches == "string") Caches = JSON.parse(Caches)
	/***************** Argument *****************/
	if (typeof $argument != "undefined") {
		if ($argument) {
			//$.log(`🎉 ${$.name}, $Argument`);
			let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
			//$.log(JSON.stringify($argument));
			let newArg = {};
			for (var item in arg) setPath(newArg, item, arg[item]);
			//$.log(JSON.stringify(newArg));
			Object.assign(Settings, newArg);
		}
		function setPath(object, path, value) {path.split(".").reduce((o, p, i) => o[p] = path.split(".").length === ++i ? value : o[p] || {}, object)}
	};
	//$.log(`🎉 ${$.name}, Get Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	return { Settings, Caches, Config }
};