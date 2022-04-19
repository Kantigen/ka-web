import del from 'del';

export default function() {
    var files = ['lacuna/*.js', 'lacuna/*.css'];

    return del(files);
}
