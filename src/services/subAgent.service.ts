import {
    createSubAgentRepo,
    findOneSubAgentRepo,
} from "../repositories/subAgent.repository";
import { errors } from "../constants/errors";

export const createSubAgentService = async (data: any) => {
    try {
        const existingSubAgent = await findOneSubAgentRepo({
            phone: data?.phone,
        });

        if (existingSubAgent) {
            throw new Error(errors.SUB_AGENT_ALREADY_EXIST);
        }
        return await createSubAgentRepo(data);
    } catch (e) {
        console.error(e);
        throw e;
    }
};
