/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	verbose: true,
	preset: "jest-expo",
	transform: {
		"^.+\\.jsx$": "babel-jest",
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				tsconfig: "tsconfig.spec.json",
			},
		],
	},
	maxWorkers: 4,
	transformIgnorePatterns: [
		"node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|native-base)",
	],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	roots: ["."],
	modulePaths: ["./src/"],
	moduleDirectories: ["node_modules"],
	// collectCoverage: true,
	// collectCoverageFrom: [
	// 	"**/*.{js,jsx,ts,tsx}",
	// 	"!**/coverage/**",
	// 	"!**/node_modules/**",
	// 	"!**/babel.config.js",
	// 	"!**/jest.setup.js",
	// ],
};
