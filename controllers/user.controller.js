//For new User registration
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//registration
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const user = await User.findOne({ email }); //check if the user exists
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

//login
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };

        //if role is correct or not
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: "strict" }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Something went wrong ! ",
            success: false
        })
    }
}

//logout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", " ", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

//update-profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;


        //cloudinary .... 
        let skillsArray=[];
        if (skills && typeof skills === "string"){ 
        skillsArray = skills.split(",");
    } 
        const userId = req.id; //middleware authentication
    let user = await User.findById(userId);
    if (!user) {
        return res.status(400).json({
            message: "User not found.",
            success: false
        })
    }

    //updating data - (user ne jo bhi update kra hoga vo update ho jaayega)
    if (fullname) user.fullname = fullname
    if (email) user.email = email
    if (phoneNumber) user.phoneNumber = phoneNumber
    if (bio) user.profile.bio = bio
    if (skills) user.profile.skills = skillsArray

    //resume....


    await user.save();

    user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    }

    return res.status(200).json({
        message: "Profile updated successfully.",
        user,
        success: true
    })

} catch (error) {
    console.log(error);
}
};

//OVERALL FLOW
// 1. User Registration (Sign Up)
// User fills a sign-up form with:
// Name, Email, Phone, Password, Role (e.g., recruiter/job-seeker)
// Backend checks:
// Is anything missing?
// Does this email already exist?
// If everything is okay:
// Hashes the password (for safety)
// Saves the user in the database
// Sends back "Account created" message

// 🔑 2. User Login (Sign In)
// User fills a login form with:
// Email, Password, Role
// Backend checks:
// Is anything missing?
// Does this email exist?
// Does the password match?
// Does the role match?
// If yes to all:
// Creates a JWT token (used to keep the user logged in)
// Stores the token in a cookie
// Sends back success message + user info

// 🔓 3. Logout
// When the user logs out:
// The server clears the token cookie
// Sends back "Logged out successfully"