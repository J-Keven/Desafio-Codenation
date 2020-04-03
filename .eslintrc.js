module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: [
		'airbnb-base',
		'prettier'
	],
	plugins: ['prettier'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		"sourceType": "module",
		ecmaVersion: 2018,
	},
	rules: {
		"prettier/prettier": "error",
		"class-methods-use-this": "off",
		"no-prams-reassign": "off",
		"camelcase": "off",
		"no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
		"global-require": "off",
		// "no-unused-vars": ["error", { "argsIgnorePattern": "req" }],
		// "no-unused-vars": ["error", { "argsIgnorePattern": "res" }]
	},
};
