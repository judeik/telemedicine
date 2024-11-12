// auth.js
const authenticateToken = (req, res, next) => {
    if (!req.session.patientId && !req.session.adminId && !req.session.doctorId) {
        return res.status(401).send('Unauthorized');
    }
    next();
};

module.exports = { authenticateToken };
