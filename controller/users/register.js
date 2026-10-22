const bcrypt = require('bcrypt');
const { User } = require('../../models');
const Validator = require('fastest-validator');

const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        name: "string|empty:false",
        email: "email|empty:false",
        password: "string|min:6|empty:false",
        role: {type:'enum', values:['admin','user'], optional:true},
        avatar: "string|optional:true"
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            data: validate
        });
    }

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (user) {
        return res.status(409).json({
            status: 'error',
            message: 'Email already registered'
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role || 'user',
        avatar: req.body.avatar || null
    });

    return res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: newUser
    });

    // Continue with registration logic
};