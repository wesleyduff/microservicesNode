var express = require('express');
var router = express.Router();


router.get('/healthCheck', (req, res) => {
    return eval(req.controller).getIndex(req, res);
});

/**
 * POST
 */
router.post('/:data', (req, res) => {
    return eval(req.controller).post(req, res);
})

/**
 * GET
 */
router.get('', (req, res) => {
    return eval(req.controller).getAll(req, res);
})
router.get('/:data', (req, res) => {
    return eval(req.controller).get(req, res);
})
/**
 * PUT
 */
router.put('/', (req, res) => {
    return eval(req.controller).put(req, res);
})

/**
 * PATCH
 */
router.patch('/', (req, res) => {
    return eval(req.controller).patch(req, res);
})

/**
 * DELETE
 */
router.delete('/', (req, res) => {
    return eval(req.controller).delete(req, res);
})


module.exports = router;