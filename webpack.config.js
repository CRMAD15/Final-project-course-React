const path = require('path');

// PLUGINS Y MINIFICADORES DE CSS Y SCSS/SASS
// Para reducir el tamaño de las hojas de estilo de nuestro proyecto
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Para el template de HTML que va a usar Webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // para reducir los CSS
const { SourceMapDevToolPlugin } = require('webpack'); // Para conocer el Source Map de nuestro proyecto

// Configuración del puerto

const port = process.env || 3000;

// Exportar configuración de webpack

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.[hash].js',
        publicPath: '/',
    },
    context: path.resolve(__dirname),
    devServer: {
        port,
        inline: true,
        historyApiFallback: true,
    },

    devtool: 'eval-source-map',
    modules: {
        rules: [
            // Reglas para los archivos de Js y Jsx
            // Tienen que pasar el LINTING para poder pasar
            {
                enforce: 'pre',
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use: [
                    'eslint-loader',
                    'source-map-loader',
                ],
            },
            // Reglas para los archivos de Js y Jsx
            // Reglas de babel para ES y Jsx
            {
                test: /\.(js|jsx)$/,
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
            /* Reglas para archivos CSS y SCSS para minificarlos y cargarlos en
             la solución final o bundle */

            {

                test: /(\.css|\.scss|\.sass)$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',

                ],
            },
            // Reglas para archivos de imagenes
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],

    },
    plugins: [
        // template HTML
        new HtmlWebpackPlugin(
            {
                template: './index.html',
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
    },
};
