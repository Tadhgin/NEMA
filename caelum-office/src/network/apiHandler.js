import { validateApiKey } from "../security/apiAuth.js";

export const handleApiRequest = (req) => {
    if (!validateApiKey(req.apiKey)) {
        return "Unauthorized request.";
    }
    return "Request accepted.";
};