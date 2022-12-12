const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService =  require('../users/user.service')
const {config} = require('../../config/config');

const mailer = require('nodemailer')

const service = new UserService()

class AuthService {
    async getUser(email, password) {
        const user = await service.findOneByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw booms.unauthorized();
        }
        delete user.dataValues.password
        return user;
    }

    async signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        }

        const response = {
            user,
            token: jwt.sign(payload, config.jwtSecret)
        }

        return response;
    }

    async sendMail(mail) {
        const user = await service.findOneByEmail(mail);
        if (!user) {
            throw boom.unauthorized();
        }

        const transporter = mailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "7409313a15f325",
                pass: "90d9e012d5ceca"
            }
        });

        const info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: `${user.email}`, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        return {message: "Message sent", info: info.messageId};
    }
}

module.exports = AuthService;
