import del from 'del';

export default function () {
  const files = ['lacuna/*.js', 'lacuna/*.css'];

  return del(files);
}
