'use strict';
const { check } = require('express-validator')
const UserService = require('../services/UserService')
const RoleService = require('../services/RoleService')

const checkData = []


// checa se o email já está cadastrado
const email = [
    check('email').custom(async value => {
        const user = await UserService.getByEmail(value);
        if (user) {
            return Promise.reject('Email já em uso');
        }
    })
        .trim()
]

// checa se um id já existe para impedir. Usado me tabelas sem autoincrement
const id = [
    check('id').isNumeric().withMessage('O campo tem que ser numérico').custom(async value => {
        const role = await RoleService.getRole(value);
        if (role) {
            return Promise.reject('Nível já cadastrado');
        }
    })
]

checkData.Email = email
checkData.Id = id


module.exports = checkData