const Sequelize = require("sequelize");
const configDB = require("../configs/database");
const bcrypt = require('bcrypt');

const userController = {
    create: (req, res) => {
        return res.render("auth/register");
    },
       
    store: async (req, res) => {
        const {name, email, username, password} = req.body;

        const conexao = new Sequelize(configDB);

        const hashPassword = bcrypt.hashSync(password, 10);

        const user = await conexao.query(`INSERT INTO users (name, email, username, password, create_at, update_at) VALUES (:name, :email, :username, :password, :create_at, :update_at)`, {
            type: Sequelize.QueryTypes.INSERT,
            replacements: {
                name,
                email,
                username,
                password: hashPassword,
                create_at: new Date(),
                update_at: new Date(),
            },
            type: Sequelize.QueryTypes.INSERT,
        });

        if(!user) {
            return res.render('auth/register', {
                msg: "Erro ao cadastrar o usuário."
            });
        }

        return res.redirect('/home');
    },
};

module.exports = userController;