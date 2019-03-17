import {UserRole} from '../../user/models/userRole.enum';

export interface JwtPayload {
    id: number;
    role: UserRole;
    iat?: Date;
}
