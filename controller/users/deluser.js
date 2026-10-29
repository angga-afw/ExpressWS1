const {User} = require('../../models');

module.exports = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email', 'role', 'avatar']
    });

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    } else {
        await user.destroy();
        return res.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        });
    }
};