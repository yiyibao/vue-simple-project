module.exports = {
	root: true,
	parser: 'babel-eslint',
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    extends: 'vue',
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": false
        },
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
		],//tab空格
		eqeqeq: 0,//禁止检测等于比较
		'no-console': 0,//禁止检测console
        "linebreak-style": [
            "error",
            "unix"
		],
		'camelcase':0,//禁止检测命名
		'consistent-this':0,//禁止检测命名
		'no-else-return': "error",
        "quotes": [
            "error",
            "single"
        ],//单引号
        "semi": [
            "warn",
            "never"
        ]//不适用分号
    }
};