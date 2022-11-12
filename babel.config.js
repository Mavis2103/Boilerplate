/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
		plugins: [
			// ... some other plugins
			[
				"module-resolver",
				{
					root: ["./"],
					alias: {
						/**
						 * Regular expression is used to match all files inside `./src` directory and map each `.src/folder/[..]` to `~folder/[..]` path
						 */
						"(.+)": "./src/\\1",
					},
					extensions: [
						".ios.js",
						".android.js",
						".js",
						".jsx",
						".json",
						".tsx",
						".ts",
						".native.js",
					],
				},
			],
		],
	};
};
