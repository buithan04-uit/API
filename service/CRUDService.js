
const { emit } = require('nodemon');
const { validate } = require('deep-email-validator');
const nodemailer = require('nodemailer');



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
    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



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

async function isEmailValid(email) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        const { valid, reason, validators } = await validate(email, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (valid) {
            return true;
        } else {
            console.error('Invalid email:', reason, validators);
            return false;
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Email validation timed out');
        } else {
            console.error('Error validating email:', error);
        }
        return false;
    }
}



module.exports = {
    createUser,
    findUserByEmail,
    getAllUsers,
    generateRandomString,
    sendVerificationEmail,
    updatePassword,
    isEmailValid
};