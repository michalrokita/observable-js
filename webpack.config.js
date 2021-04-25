const webpack = require('webpack')
const path = require('path')
const plugins = []
const libraryName = 'observables-rjs'
let filename = libraryName

if (process.env.NODE_ENV === 'production') {

    plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }))

    filename += '.min.js'

} else {
    filename += '.js'
}

module.exports = {
    entry: path.resolve('./src/index.js'),
    output: {
        path: path.resolve('build'),
        filename,
        library: {
            type: 'umd',
            name: libraryName
        }
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                include: [
                    path.resolve('src')
                ],
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins
}
