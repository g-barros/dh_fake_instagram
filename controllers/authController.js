const Sequelize = require('sequelize');
const configDB = require('../configs/database');
const bcrypt = require('bcrypt');

const authController = {
    create: (_req, res) => {
        res.render("auth/login");
    },

    store: async (req, res) => {
        const {email, password} = req.body;
        const conexao = new Sequelize(configDB);

        const [user] = await conexao.query (
            "SELECT * FROM users where email = :email limit 1",
            {
                replacements: {
                    email,
                },
                type: Sequelize.QueryTypes.SELECT,
            }
        );
        
        console.log(user);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.render("auth/login", {
                msg: "Email ou senha errados!",
            });
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
        };

        return res.redirect('/home');
    },
};

module.exports = authController;