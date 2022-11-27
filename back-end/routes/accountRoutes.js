const express = require('express');
const router = express.Router();
const Account = require('../models/accountModel');

async function getAccount(req, res, next) {
    let account;
    try {
        account = await Account.findById(req.params.id);
        if (account === null) {
            res.status(404).json({ message: "Cannot find this account" });
        }
    } catch (err) {
        console.log(err);
    }
    res.account = account;
    next();
}

router.get('/', async (req, res) => {
    try {
        const accounts = await Account.find();
        res.send(accounts)
    } catch (err) {
        res.status(500).json({ message: "Error" });
    }
})

router.post('/', async (req, res) => {
    const account = new Account({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        university: req.body.university,
        studentAccount: req.body.studentAccount
    })
    try {
        const newAccount = await account.save();
        res.status(201).json(newAccount);
    } catch(err) {
        res.status(400).json({message: err})
    }
})

module.exports = router;