/**
 * Title: Main Router
 * Descriptions: Provide route handler for base url
 * Author: Moidul Hasan Khan
 * Date: 05/04/2022
 */

// Dependencies


// Module Scafolding
const baseRouteHandler = (req, res, next) => {
    res.status(200).json({
        message: "This is base url"
    })
}


// export module
module.exports = baseRouteHandler;