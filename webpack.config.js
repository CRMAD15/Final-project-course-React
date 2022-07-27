const path = require('path');

// PLUGINS Y MINIFICADORES DE CSS Y SCSS/SASS
// Para reducir el tamaño de las hojas de estilo de nuestro proyecto
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Para el template de HTML que va a usar Webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // para reducir los CSS
const { SourceMapDevToolPlugin } = require('webpack'); // Para conocer el Source Map de nuestro proyecto

// Configuración del puerto

const port = process.env.PORT || 3000;

// Exportar configuración de webpack

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.[hash].js',
        publicPath: '/',
    },
    context: path.resolve(__dirname),
    devServer: {
        port,
        historyApiFallback: true,
    },

    devtool: 'eval-source-map',
    module: {
        rules: [
            // Reglas para archivos JS y JSX
            // Tienen que pasar previamente a la build, por el linting
            {
                enforce: 'pre',
                test: /(\.js|.jsx)$/,
                exclude: /node_modules/,
                use: [
                    // 'eslint-loader',
                    'source-map-loader',
                ],
            },
            // Reglas para archivos JS y JSX
            // Babel ES y JSX
            {
                test: /(\.js|.jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env',
                            '@babel/react',
                        ],
                    },
                },
            },
            // Reglas para archivos SCCS, SASS y CSS
            // Sirve para minificarlos en un solo archivo y una línea
            {
                test: /(\.css|\.scss|\.sass)$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ],
            },
            // Reglas para los archivos de imágenes
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: { loader: 'file-loader' },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './public/index.html',
            },
        ),
        new MiniCssExtractPlugin(
            {
                filename: './css/styles.css',
            },
        ),
        new SourceMapDevToolPlugin(
            {
                filename: '[file].map',
            },
        ),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.sass'],
        modules: [
            'node_modules',
        ],
        alias: {
            'react-redux': path.join(__dirname, '/node_modules/react-redux/dist/react-redux.min'),
        },
    },
};
