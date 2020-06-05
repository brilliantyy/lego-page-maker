const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	devServer: {
		public: 'pm.to8to.com',
		host: '0.0.0.0',
		port: 8080
	},
    chainWebpack: config => {
		config.resolve.alias
			.set('@assets', resolve('./src/assets'))
			.set('@components', resolve('./src/components'))
			.set('@public', resolve('./public'))
	}
}