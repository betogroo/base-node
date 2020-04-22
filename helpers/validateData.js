'use strict';
const { check } = require('express-validator')
const UserService = require('../services/UserService')
const RoleService = require('../services/RoleService')
const badLanguage = ['bosta', 'merda', 'coco']
const validateData = []

const user = [
    check('name')
        .not().isEmpty().withMessage('O campo Nome não pode ser vazio')
        .not().isIn(badLanguage).withMessage('por favor não use palavrões no nome')
        .not().isNumeric().withMessage('Campo nome não aceita números')
        .trim(),
    check('rg').isNumeric().withMessage('O campo RG só aceita número')
        .trim(),
    check('email').isEmail().withMessage('Email inválido')
        .not().isEmpty().withMessage('Obrigatório o cadastro do email')
        .trim()
]



const role = [
    check('name').not().isEmpty().withMessage('O campo não pode ser vazio')
        .isLength({ min: 3, max: 20 }).withMessage('O campo deve ter entre 3 e 20 caracteres alfanuméricos')
        .not().isIn(badLanguage).withMessage('por favor não use palavrões no nome')
        .trim()

]

validateData.User = user
validateData.Role = role

module.exports = validateData