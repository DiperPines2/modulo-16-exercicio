const gulp = require('gulp') //pacote do gulp.
const sass = require('gulp-sass')(require('sass')) //compila o sass e importa o pacote do sass.
const sourceMaps = require('gulp-sourcemaps') //faz o navegador compreender o arquivo fonte e nao o da build.
const uglify = require('gulp-uglify') //comprime javascript.
const obfuscate = require('gulp-obfuscate') //transforma os arquivos .js ilegiveis para segurança do codigo.
const imagemin = require('gulp-imagemin') //comprime imagens

function comprimeImagem() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js') //pasta alvo de arquivos 
        .pipe(uglify()) //executa o uglify
        .pipe(obfuscate()) //executa o obfuscate
        .pipe(gulp.dest('./build/scripts')) //pasta destino
}

function compilaSass() {    //funcao que compila o sass
    return gulp.src('./source/styles/*.scss')   //funcao que acessa os codigos a serem compilados.
        .pipe(sourceMaps.init())    //inicia a verificação do codigo a ser compilado.
        .pipe(sass({    //executa o sass.
            outputStyle: 'compressed'
        }))
        .pipe(sourceMaps.write('./maps'))   //cria o arquivo de mapeamento e joga para a pasta build/styles diretamente.
        .pipe(gulp.dest('./build/styles')) //destino da compilação.
}

exports.default = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass))
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript))
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImagem))
}                                       //ignoreInitial false,  faz com que a tarefa watch que inicia sem termino, seja finalizada, alterando em tempo real as alteraçoes do DOM.