import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    
    const token = req.cookies?.session_token;
    
    if (!token) {
        return res.status(401).json({ message: "Session expired or no token found!" });
    }
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid!" });
        }
        
        req.userId = payload.id; // Pass user ID to the next route handler
        next(); // CRUCIAL: Pass control to your controller (e.g., getPosts)
    });

};
