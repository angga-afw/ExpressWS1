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
            message: validate
        });
    }

    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }

    const emailExists = req.body.email;
    if (emailExists) {
        const existingUser = await User.findOne({
            where: { email: emailExists }
        });

        if (existingUser && emailExists !== user.email) {
            return res.status(409).json({
                status: 'error',
                message: 'Email already registered'
            });
        }
    }
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const {
        name,
        email,
        password,
        role,
        avatar  
    } = req.body;

    await user.update({
        name: name || user.name,
        email: email || user.email,
        password: password ? hashedPassword : user.password,
        role: role || user.role,
        avatar: avatar || user.avatar
    });

    return res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        data: user
    });
};