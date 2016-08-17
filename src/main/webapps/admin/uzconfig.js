/*!
 * Config For UZ
 * Power by FIS3
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-08-06
 */

// For prod
fis.media('prod').match('*.js', {
    optimizer: fis.plugin('uglify-js'),
})

fis.match('**', {
    deploy: [
        fis.plugin('skip-packed'),
        fis.plugin('local-deliver', {
            to: require('path').join(fis.findDir('uzconfig.js'), '../../node/public/admin')
        })
    ]
})

fis.match('index.html', {
    release: false
})
