
const { emit } = require('nodemon');
const connection = require('../config/Database');

const createUser = async (firstname, lastname, email, sdt, password) => {
    const [results, fields] = await connection.query(
        'INSERT INTO Users (firstname,lastname ,email , sdt ,password) VALUES (?, ?, ?, ?, ?)',
        [firstname, lastname, email, sdt, password]
    );
};

const findUserByEmail = async (email) => {
    const [results, fields] = await connection.query(
        'SELECT * FROM Users WHERE email = ?',
        [email]
    );
    return results;
}
const getAllUsers = async () => {
    const [results, fields] = await connection.query(
        'SELECT * FROM Users'
    );
    return results;
}

const updatePassword = async (newpassword, email) => {
    const [results, fields] = await connection.query(
        'UPDATE Users SET password = ? WHERE email = ?',
        [newpassword, email]
    );
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const nodemailer = require('nodemailer');

// Hàm gửi mã xác nhận qua email
async function sendVerificationEmail(userEmail, verificationCode) {
    // Thiết lập transporter với thông tin SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Hoặc các dịch vụ khác: Yahoo, Outlook, v.v.
        auth: {
            user: 'than.65.cvan@gmail.com',      // Email của bạn
            pass: 'urzq rcft pshx xhuh'       // Mật khẩu hoặc App Password của email
        }
    });

    // Thiết lập nội dung email
    const mailOptions = {
        from: 'than.65.cvan@gmail.com',       // Địa chỉ email người gửi
        to: userEmail,                     // Email người nhận
        subject: 'Verification Code',      // Tiêu đề email
        text: `Your verification code is: ${verificationCode}` // Nội dung email
    };

    // Gửi email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
}

const { validate } = require('deep-email-validator');

async function isEmailValid(email) {
    const { valid, reason, validators } = await validate(email);
    if (valid) {
        console.log('Email is valid');
    } else {
        console.log(`Email is invalid: ${reason}`);
    }
    return valid;
}

// Ví dụ sử dụng
isEmailValid('example@example.com').then(valid => {
    if (valid) {
        console.log('Email tồn tại');
    } else {
        console.log('Email không tồn tại');
    }
});

module.exports = {
    createUser,
    findUserByEmail,
    getAllUsers,
    generateRandomString,
    sendVerificationEmail,
    updatePassword,
    isEmailValid
};