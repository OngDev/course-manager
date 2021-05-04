import { HttpException, HttpStatus, } from "@nestjs/common";
export class BadRequestException extends HttpException {
    constructor() {
        super('Forbidden', HttpStatus.FORBIDDEN);
    }
}