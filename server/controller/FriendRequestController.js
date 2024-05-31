const { create: createService, remove: removeService, respond: respondService, fetchAll: fetchAllService, fetchStatus: fetchStatusService } = require('../service/friendRequestService.js');

const create = async (req, res) => {
    try {
        const requesterId = req.user.id;
        const { recipientId } = req.body;
        const friendRequest = await createService(requesterId, recipientId);
        res.status(201).json(friendRequest);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const requesterId = req.user.id;
        const { recipientId } = req.body;

        if (!recipientId) {
            return res.status(400).json({ error: 'Recipient ID is required' });
        }

        const friendRequest = await removeService(requesterId, recipientId);
        res.status(200).json(friendRequest);
    } catch(err) {
        let status = 400;
        if (err.message == 'friend request not found') {
            status = 404;
        }
        res.status(status).json({ error: err.message });
    }
}

const respond = async (req, res) => {
    try {
        const  { requestId, status } = req.body;
        const friendRequest = await respondService(requestId, status);
        res.status(200).json(friendRequest);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
};

const fetchAll = async (req, res) => {
    try {
        const userId  = req.user.id;
        const friendRequests = await fetchAllService(userId);
        res.status(200).json(friendRequests);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
};

const fetchStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const requesterId = req.user.id;
        const status = await fetchStatusService(requesterId, userId);
        res.status(200).json({ status });
    } catch(err) {
        res.status(500).json({error : err.message});
    }
}

module.exports = { create, remove, respond, fetchAll, fetchStatus };

