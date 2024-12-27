import userModel from "../model/user.model.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(403).json({
        success: false,
        message: "Email Already Exits..",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
   const newUser= await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    const emailSent = await sendVerificationMail(newUser.email, newUser._id);
    if(emailSent){
        return res.status(201).json({
            success: true,
            message: "User Created Successfully..",
          });
    }else{
        return res.status(500).json({
            success: false,
            message: "Failed to send verification email. Please try again.",
          });
    }
    
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user:  process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendVerificationMail = async (emailId,userID) => {
  try {
    console.log("sending email to ", emailId);

    await transporter.sendMail({
      to: emailId,
      subject: "Email Verfication Link from our App service",
      html: `
            <body>
            <h1> Verfication Link </h1>
            <a href='http://localhost:3000/api/v1/user/verify?email=${emailId}&&id=${userID}'> Click Here</a>
            </body>
            `,
    });
    console.log("Email Sent successfully");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields required..",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Incorrect email password..",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Incorrect Email or Password.",
      });
    }

    if (user) {
      if (user.verficationStatus === true) {
        return res.status(200).json({
          success: true,
          message: `Welcome back ${user.fullName}`,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: `Please verify Email..`,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: `User does not exists`,
      });
    }
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { email,id } = req.query;
    if (!email || !id) {
        return res.status(400).json({
          success: false,
          message: "Email and ID are required for verification.",
        });
      }
    const user = await userModel.findOne({ email,_id:id });

    if (user) {
      if (user.verficationStatus === true) {
        return res.status(200).json({
          success: true,
          message: `User is already verified...`,
        });
      } else {
        user.verficationStatus = true;

        await user.save();
        res.status(200).json({
          success: true,
          message: `Welcome back ${user.name}`,
        });
      }
    } else {
      return res.status(403).json({
        success: true,
        message: `User does not exists`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllUser =async (req,res)=>{
    try {
        const user = await userModel.find();
        return res.status(200).json({
            success:true,
            user,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }

}
export { signup, login, verifyUser,getAllUser };
