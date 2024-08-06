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
exports.registerStudent = void 0;
const postgre_dao_1 = __importDefault(require("../../dao/postgre.dao"));
function registerStudent(student) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const postgreDAOInstance = yield postgre_dao_1.default.getInstance();
            const existingStudentArray = yield postgreDAOInstance.getFromTable("students", {
                name: student.name,
                surname: student.surname
            });
            if (existingStudentArray.length > 0) {
                for (const existingStudent of existingStudentArray) {
                    if (existingStudent.internal_id == student.internal_id &&
                        existingStudent.personal_id == student.personal_id) {
                        return {
                            message: `Student with this name: ${student.name}, surname: ${student.surname}, internal_id: ${student.internal_id} and personal_id: ${student.personal_id} already exists`
                        };
                    }
                }
            }
            const registeredStudent = yield postgreDAOInstance.insertIntoTable("students", student);
            if (!registeredStudent)
                throw new Error("Unable to register student");
            return {
                message: "Student created",
                result: true,
                student: registeredStudent[0]
            };
        }
        catch (err) {
            throw err;
        }
    });
}
exports.registerStudent = registerStudent;