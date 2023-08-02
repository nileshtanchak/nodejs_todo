import ErrorHandller from "../middleware/error.js";
import { User } from "../model/user.js";
import { sendCookies } from "../utils/features.js"
import bcrypt from "bcrypt";


export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) return next(new ErrorHandller("User already exists", 400));

        const hashedPassword = await bcrypt.hash(password, 10);

        const saveUser = new User({ name, email, password: hashedPassword });
        await saveUser.save();
        sendCookies(saveUser, res, "User Created successfully", 201)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) 
            return next(new ErrorHandller("Invalid email or password", 404));
    

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        sendCookies(user, res, "Welcom Back", 200)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const profile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    });
}

export const logout = (req, res) => {

    res.status(200).cookie("token", "", {expire: Date(Date.now),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message: "User logout successfully"
    });
}

