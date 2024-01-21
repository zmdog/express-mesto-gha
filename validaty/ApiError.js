class ApiError extends Error {

  errorCodeGetter(err) {
    if (err.name === 'ValidationError') return 400 //переданы некорректные данные в методы создания или изменения
    if (err.name === 'CastError') return 404 //не найден пользователь или карточка
    return 505 //стандартная ошибка
  }

  instanceOf(res, err, message){
    console.log(err.name)
    return res.status(this.errorCodeGetter(err)).send({ message: message})
  }
}

module.exports = {
  ApiError
}