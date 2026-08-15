const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'stella-shipping-secret-key-2024';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Không tìm thấy token xác thực hoặc token không hợp lệ' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token đã hết hạn hoặc không hợp lệ' });
    }
};

// Middleware to check if user is Admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Quản trị viên') {
        next();
    } else {
        res.status(403).json({ error: 'Bạn không có quyền thực hiện thao tác này' });
    }
};

module.exports = {
    verifyToken,
    isAdmin
};
