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

        const isMatch = await bcrypt.compare(password, user.dataValues.Session.dataValues.password);
        if (!isMatch) {
            throw boom.unauthorized();
        }
        delete user.dataValues.Session.dataValues.password
        return user;
    }

    signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        }

        const token = jwt.sign(payload, config.jwtSecret);

        return {
            user,
            token
        };
    }

    async sendRecovery(email) {
        const user = await service.findOneByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }
        const payload = { sub: user.id };
        const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
        const link = `http://myfrontend.com/recovery?token=${token}`;
        await service.update(user.id, {recoveryToken: token});
        const mail = {
            from: `"Admin" <${config.smtpEmail}>`, // sender address
            to: `${user.email}`, // list of receivers
            subject: 'Email para recuperar contraseña', // Subject line
            html: `<b>Ingresa a este link => ${link}</b>`, // html body
        }

        return await this.sendMail(mail);
    }

    async changePassword(token, newPassword){
        try {
            const payload = jwt.verify(token, config.jwtSecret);

            const user = await service.findOne(payload.sub);

            if (user.recoveryToken !== token) {
                throw boom.unauthorized();
            }
            const hash = await bcrypt.hash(newPassword, 10);
            console.log(hash);
            await service.update(user.id, {recoveryToken: null, password: hash});
            return { message: 'Password Changed'}
        } catch (error) {
            throw boom.unauthorized()
        }
    }

    async sendMail(infoMail) {
        const transporter = mailer.createTransport({
            host: config.smtpHost,
            port: config.smtpPort,
            auth: {
                user: config.smtpUser,
                pass: config.smtpPassword
            }
        });

        await transporter.sendMail(infoMail);

        return {message: "Message sent"};
    }
}

module.exports = AuthService;
