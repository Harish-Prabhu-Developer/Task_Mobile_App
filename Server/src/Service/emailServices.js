//emailServices.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const transporter=nodemailer.createTransport({ 
    service: process.env.Mail_DOMAIN,
    auth: {
        user: process.env.Mail_USER_NAME,
        pass: process.env.Mail_PASSWORD,
    
    }
});

//OTP Email
export const sendOTP= (email,otp,name)=>{
    const mailOptions={
        from: process.env.Mail_USER_NAME,
        to: email,
        subject: "OTP Verification",
        html: ` <p>Hi ${name},</p>
                <p>Your OTP is <strong>${otp}</strong></p>`
    };
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.warn(err);
        }else{
            console.log(info);
        }
    });
    
};




//New password Email
export const sendNewPassword= (email,password,name)=>{
    const mailOptions={
        from: process.env.Mail_USER_NAME,
        to: email,
        subject: "New Password",
        html: ` <p>Hi ${name},</p>
                <p>Your new password is <strong>${password}</strong> </p>`
    };
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.warn(err);
        }else{
            console.log(info);
        }
    });
};


