function toRupiah(value) {
  var formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
  return formatter.format(value)
}

module.exports = toRupiah