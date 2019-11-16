const express = require('express');
const router = express.Router();

router.post('/piphole', (req, res) => {
    console.log("########################## REQ:", req)
    res.send("ok")
})

module.exports = router;