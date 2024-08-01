"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const postgre_dao_1 = __importDefault(require("../../dao/postgre.dao"));
function updateUser(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const postgreDAOInstance = yield postgre_dao_1.default.getInstance();
            const usersUpdated = yield postgreDAOInstance.updateTable('users', userData, { id: userData.id });
            if (usersUpdated > 0) {
                return true;
            }
            throw new Error('User not updated');
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateUser = updateUser;
