const { create: createService, respond: respondService, fetchAll: fetchAllService } = require('../service/friendRequestService.js');

const create = async (req, res) => {
    try {
        const { requesterId, recipientId } = req.body;
        const friendRequest = await createService(requesterId, recipientId);
        res.status(201).json(friendRequest);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
};

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
        const { userId } = req.params;
        const friendRequests = await fetchAllService(userId);
        res.status(200).json(friendRequests);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { create, respond, fetchAll };

