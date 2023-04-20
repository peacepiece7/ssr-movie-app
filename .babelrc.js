// https://velog.io/@sooyun9600/React-is-not-defined-에러-해결
module.exports = {
  presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
}
