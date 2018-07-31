const   request                =   require('request'),
        ObjectID               =   require('mongodb').ObjectID

exports.getIndex = (req, res) => {
    res.json({
        response: {
            message: 'Base weather ingest page',
            code: 200
        }
    })
}

exports.post = (req, res) => {
    res.json({
        response: {
            message: 'Base post functionality',
            code: 200
        }
    })
}

exports.put = (req, res) => {
    res.json({
        response: {
            message: 'Base put functionality',
            code: 200
        }
    })
}

exports.patch = (req, res) => {
    res.json({
        response: {
            message: 'Base patch functionality',
            code: 200
        }
    })
}

exports.getAll = (req, res) => {

    res.json({
        response: {
            message: 'Base get all functionality',
            code: 200
        }
    })

}

exports.get = (req, res) => {
    res.json({
        response: {
            message: 'Base get functionality',
            code: 200
        }
    })

}

exports.delete = (req, res) => {
    res.json({
        response: {
            message: 'Base delete functionality',
            code: 200
        }
    })
}


