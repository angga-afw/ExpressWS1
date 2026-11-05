const bcrypt = require('bcrypt');
const { User } = require('../../models');
const Validator = require('fastest-validator');
const jwt = require('jsonwebtoken');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        email: "email|empty:false",
        password: "string|min:6|empty:false"
    };
    
    const validate = v.validate(req.body, schema);
    if (validate !== true) {
        return res.status(400).json({
            status: "error",
            message: validate
        });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: "error",
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '60s' });

        return res.status(200).json({
            status: "success",
            data: {
                id: user.id,
                email: user.email,            
                token: token
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};