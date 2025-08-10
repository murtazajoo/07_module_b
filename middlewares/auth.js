export const isAdmin = (req, res, next) => {
    if (req.cookies.admin === "true") {
        next();
    } else {
        res.status(403).end("Forbidden");
    }
};
