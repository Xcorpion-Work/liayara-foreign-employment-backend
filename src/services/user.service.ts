import {
    aggregateUserRepo,
    createUserRepo,
    findUserRepo,
    findUsersRepo,
    updateUserRepo,
} from "../repositories/user.repository";
import { v4 as uuid } from "uuid";
import { errors } from "../constants/errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "./email.service";
import { EMAIL_TYPES } from "../helpers/emailHandler";
import { findPermissionsRepo } from "../repositories/permission.repository";
import { createRoleRepo, findRoleRepo } from "../repositories/role.repository";
import mongoose from "mongoose";
import ObjectId = mongoose.Types.ObjectId;
import { updateRoleService } from "./role.service";

export const createUserService = async (data: any) => {
    try {
        const { email, phone, nic } = data;
        const isExistingUser = await checkExistingUserService(
            email,
            phone,
            nic
        );
        if (isExistingUser.length > 0) {
            throw new Error(errors.USER_IS_ALREADY_EXIST);
        }
        if (!data.password) {
            data.password = generateRandomPassword();
        }
        const mailPw = data.password;
        data.password = await bcrypt.hash(data.password, 10);
        data.recoveryCode = await generateRecoveryCode();
        data.uuid = uuid();
        data.status = true;
        data.role = data.isSuperAdmin
            ? await createSuperAdminRole()
            : data.role;
        const newUser = await createUserRepo(data);
        return { ...newUser.toObject(), mailPw };
    } catch (e: any) {
        console.error(e.message);
        throw e;
    }
};

export const createSuperAdminRole = async () => {
    try {
        const permissions = await findPermissionsRepo({});
        const allPermissionIds = permissions.map((p) => p._id);
        const superAdmin = await createRoleRepo({
            name: "Super Admin",
            permissions: allPermissionIds,
        });
        return new ObjectId(superAdmin._id);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const generateRecoveryCode = async (): Promise<string> => {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
};

const generateRandomPassword = (length = 12) => {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
    return Array.from(
        { length },
        () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
};

const checkExistingUserService = (
    email: string,
    phone: string,
    nic: string
) => {
    const pipeline = [
        {
            $match: {
                $or: [
                    { email: email }, // Match documents with this email
                    { phone: phone }, // Match documents with this phone
                    { nic: nic }, // Match documents with this phone
                ],
            },
        },
    ];
    return aggregateUserRepo(pipeline);
};

export const findUserByUuidService = async (uuid: string) => {
    try {
        const user: any = await findUserRepo({ uuid: uuid });
        return await getOneAggregateUserService(user?._id);
    } catch (e: any) {
        console.error(e.message);
        throw e;
    }
};

export const userLoginService = async (data: any) => {
    try {
        const { emailOrPhone, password } = data;
        if (!emailOrPhone) {
            throw new Error("Email or phone number is required.");
        }
        const isEmail = /^\S+@\S+$/.test(emailOrPhone);
        let user: any;
        if (isEmail) {
            user = await findUserByEmailService(emailOrPhone);
        } else {
            user = await findUserByPhoneService(emailOrPhone);
        }
        if (!user) {
            throw new Error("user not found");
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error("Password is invalid");
        }

        if (!user.status) {
            throw new Error(errors.USER_DEACTIVATED);
        }

        const payload: any = {
            accessToken: await generateAccessToken(user),
            refreshToken: await generateRefreshToken(user),
        };
        return payload;
    } catch (e: any) {
        console.error(e.message);
        throw e;
    }
};

export const loginByForgotPasswordService = async (data: any) => {
    try {
        const { uuid, recoveryCode } = data;
        if (!uuid) {
            throw new Error(errors.UUID_REQUIRED_FOR_PASSWORD_FORGOT_USERS);
        }

        const user = await findUserRepo({ uuid });
        if (!user) {
            throw new Error("user not found");
        }

        const newRecoveryCode = await generateRecoveryCode();
        await updateUserRepo({ uuid: uuid }, { recoveryCode: newRecoveryCode });

        if (recoveryCode !== user.recoveryCode) {
            throw new Error(errors.RECOVERY_CODE_IS_NOT_VALID);
        }

        if (!user.status) {
            throw new Error(errors.USER_DEACTIVATED);
        }

        const payload: any = {
            accessToken: await generateAccessToken(user),
            refreshToken: await generateRefreshToken(user),
        };
        return payload;
    } catch (e: any) {
        console.error(e.message);
        throw e;
    }
};

const findUserByEmailService = async (email: any) => {
    return await findUserRepo({ email: email });
};

const findUserByPhoneService = async (phone: any) => {
    return await findUserRepo({ phone: phone });
};

const generateAccessToken = async (user: any) => {
    const ACCESS_TOKEN_SECRET: any = process.env.access_secret;

    return jwt.sign(
        { username: user.username, uuid: user.uuid }, // Payload
        ACCESS_TOKEN_SECRET, // Secret key
        { expiresIn: "30m" } // Options
    );
};

const generateRefreshToken = async (user: any) => {
    const REFRESH_TOKEN_SECRET: any = process.env.refresh_secret;

    return jwt.sign(
        { username: user.username, uuid: user.uuid }, // Payload
        REFRESH_TOKEN_SECRET, // Secret key
        { expiresIn: "24h" } // Options
    );
};

export const confirmLoginService = async (data: any) => {
    try {
        return await getOneAggregateUserService(data._id);
    } catch (e: any) {
        console.error(e.message);
        throw e;
    }
};

export const tokenRefreshService = async (data: any) => {
    const REFRESH_TOKEN_SECRET: any = process.env.refresh_secret;

    try {
        const decoded: any = jwt.verify(
            data.refreshToken,
            REFRESH_TOKEN_SECRET
        );
        const user: any = await findUserByUuidService(decoded.uuid);
        return {
            accessToken: await generateAccessToken(user),
            refreshToken: await generateRefreshToken(user),
        };
    } catch (e: any) {
        console.error(e.message);
        throw e;
    }
};

export const changePasswordService = async (data: any, user: any) => {
    try {
        const userWithPassword: any = await findUserRepo({
            _id: new ObjectId(user._id),
        });
        const isCurrentPasswordMatch = await bcrypt.compare(
            data.currentPassword,
            userWithPassword.password
        );
        if (!isCurrentPasswordMatch) {
            throw new Error("Current password is wrong");
        }
        if (data.newPassword !== data.confirmPassword) {
            throw new Error("New password and Confirm password is not match");
        }
        const password = await bcrypt.hash(data.newPassword, 10);
        const result: any = await updateUserRepo(
            { _id: user._id },
            { password }
        );

        const userObj = result?.toObject?.() || result;
        delete userObj.password;
        delete userObj.recoveryCode;

        return userObj;
    } catch (e: any) {
        console.error(e.message);
        throw e;
    }
};

export const findAllUsersService = async (data: any) => {
    try {
        return await findUsersRepo(data);
    } catch (e: any) {
        console.error(e.message);
        throw e;
    }
};

export const changeUserStatusService = async (id: any, data: any) => {
    try {
        return await updateUserRepo({ _id: id }, data);
    } catch (e: any) {
        console.error(e.message);
        throw e;
    }
};

export const forgotPasswordService = async (emial: string) => {
    try {
        const user = await findUserRepo({ email: emial });
        if (!user) {
            throw new Error(errors.USER_CANNOT_BE_FOUND);
        }
        return await sendEmail(EMAIL_TYPES.FORGOT_PASSWORD, user.email, user);
    } catch (e: any) {
        console.error(e.message);
        throw e;
    }
};

export const getPagedUsersService = async (data: any) => {
    try {
        const { pageSize, page } = data.filters;
        const skip = (page - 1) * pageSize;

        const pipeline = [
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "role",
                    foreignField: "_id",
                    as: "role",
                },
            },
            {
                $unwind: {
                    path: "$role",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $addFields: {
                    roleName: "$role.name",
                },
            },
            {
                $facet: {
                    metadata: [
                        {
                            $count: "total",
                        },
                    ],
                    data: [
                        {
                            $skip: skip,
                        },
                        {
                            $limit: pageSize,
                        },
                    ],
                },
            },
            {
                $unwind: {
                    path: "$metadata",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $addFields: {
                    "metadata.pageIndex": page,
                },
            },
            {
                $project: {
                    total: "$metadata.total",
                    pageIndex: "$metadata.pageIndex",
                    result: "$data",
                },
            },
            {
                $project: {
                    "result.uuid": 1,
                    "result.username": 1,
                    total: 1,
                    "result.updatedAt": 1,
                    "result.roleName": 1,
                    "result.status": 1,
                    "result.role.updatedAt": 1,
                    "result.role.status": 1,
                    "result.role.permissions": 1,
                    "result.role.name": 1,
                    "result.role.createdAt": 1,
                    "result.role._id": 1,
                    "result.role.__v": 1,
                    "result.remark": 1,
                    "result.phone": 1,
                    "result.nic": 1,
                    "result.email": 1,
                    "result.dateOfBirth": 1,
                    "result.createdAt": 1,
                    "result.altPhone": 1,
                    "result.address": 1,
                    "result._id": 1,
                    "result.__v": 1,
                    pageIndex: 1,
                },
            },
        ];
        const roles = await aggregateUserRepo(pipeline);

        return roles[0] || { total: 0, pageIndex: page, result: [] };
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getOneAggregateUserService = async (id: any) => {
    try {
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "role",
                    foreignField: "_id",
                    as: "role",
                },
            },
            {
                $unwind: {
                    path: "$role",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: "permissions",
                    localField: "role.permissions",
                    foreignField: "_id",
                    as: "role.permissionsData",
                },
            },
            {
                $addFields: {
                    permissionCodes: {
                        $map: {
                            input: "$role.permissionsData",
                            as: "perm",
                            in: "$$perm.code",
                        },
                    },
                    roleName: "$role.name",
                },
            },
            {
                $project: {
                    __v: 1,
                    _id: 1,
                    address: 1,
                    altPhone: 1,
                    createdAt: 1,
                    dateOfBirth: 1,
                    email: 1,
                    nic: 1,
                    permissionCodes: 1,
                    phone: 1,
                    remark: 1,
                    role: 1,
                    roleName: 1,
                    status: 1,
                    updatedAt: 1,
                    username: 1,
                    uuid: 1,
                },
            },
        ];
        const users = await aggregateUserRepo(pipeline);

        return users[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const updateUserService = async (id: string, data: any) => {
    try {
        const existingUser: any = await findUsersRepo({
            _id: new ObjectId(id),
        });

        if (!existingUser || existingUser.length < 1) {
            throw new Error(errors.USER_ID_IS_INVALID);
        }

        if (data.status === true) {
            const relatedRole: any = await findRoleRepo({
                _id: existingUser[0]?.role,
            });
            if (!relatedRole?.status) {
                await updateRoleService(existingUser[0]?.role, {
                    status: true,
                });
            }
        }

        const updatedUser: any = await updateUserRepo(
            { _id: new ObjectId(id) },
            data
        );
        return await getOneAggregateUserService(updatedUser._id);
    } catch (e) {
        console.error(e);
        throw e;
    }
};
