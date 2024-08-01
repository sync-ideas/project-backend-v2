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
exports.registerStudentsWithExcel = void 0;
const registerStudent_1 = require("./registerStudent");
const student_helper_js_1 = __importDefault(require("../../helpers/student.helper.js"));
function registerStudentsWithExcel(excelFile, dictionary) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentsStatus = [];
            const students = yield student_helper_js_1.default.registerFromExcel(excelFile, Object.assign({}, dictionary));
            const promises = students.map((student) => __awaiter(this, void 0, void 0, function* () {
                const registredStudent = yield (0, registerStudent_1.registerStudent)(student);
                if (!registredStudent.result) {
                    studentsStatus.push(Object.assign(Object.assign({}, student), { status: registredStudent.message }));
                }
                else {
                    studentsStatus.push(Object.assign(Object.assign({}, student), { status: registredStudent.message }));
                }
            }));
            yield Promise.all(promises);
            return studentsStatus;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.registerStudentsWithExcel = registerStudentsWithExcel;
