const {getCards, createCard, deleteCardById, likeCard, dislikeCard} = require("../controllers/cards");
const routerCard = require('express').Router();

routerCard.get('/cards', getCards);
routerCard.post('/cards', createCard);
routerCard.delete('/cards/:cardId', deleteCardById);
routerCard.put('/cards/:cardId/likes', likeCard);
routerCard.delete('/cards/:cardId/likes', dislikeCard);

module.exports = routerCard