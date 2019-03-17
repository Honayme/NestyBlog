import {UserRole} from '../../user/enums/userRole.enum';

export interface JwtPayload {
    id: number;
    role: UserRole;
    iat?: Date;
}
