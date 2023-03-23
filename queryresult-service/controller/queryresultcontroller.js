import {
    ormQueryTransport as _queryTransport, ormCreateManyTransport as _createManyTransport
} from '../model/orms.js'

export async function getTransport(req, res) {
    try {
        const { location } = req.body;
        //dummy values
        const resp = await _queryTransport(0, 50, 0, 1000);
        if (resp.err) {
            return res.status(409).json({ message: 'Could not query transport!' });
        } else {
            return res.status(201).json({ transport: resp });
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Server error' })
    }
}

export async function addTransport(req, res) {
    try {
        const { name, type, xcoord, ycoord, description } = req.body;
        if (name) {
            const resp = await _createManyTransport([ {name, type, xcoord, ycoord, description} ])
            if (resp.err) {
                return res.status(409).json({ message: 'Could not create transport!' });
            } else {
                console.log(`Created new transport successfully!`)
                return res.status(201).json({ message: `Created new transport ${name} successfully!` });
            }
        } else {
            return res.status(400).json({ message: 'name missing!' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when creating new question!' })
    }
}
