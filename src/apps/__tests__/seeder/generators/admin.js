import { faker } from '@faker-js/faker';
import { ADMIN_TYPES } from '../../../../utils/constant/options'
import keys from '../../../../config/keys';


class AdminSeeder {
    static generateAdminData(role = 'Admin', isSuperadmin = false) {
        // Excluding 'SuperAdmin' role by default
        const availableRoles = Object.values(ADMIN_TYPES).filter(r => r !== ADMIN_TYPES.SUPER_ADMIN);

        if (!availableRoles.includes(role)) {
            role = [ADMIN_TYPES.ADMIN, ADMIN_TYPES.USER_ADMIN, ADMIN_TYPES.ORDER_ADMIN][Math.floor(Math.random() * 3)];
        }

        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: isSuperadmin ? keys.superAdmin.email : faker.internet.email(),
            password: isSuperadmin ? keys.superAdmin.password : faker.internet.password(),
            role: [role],
        };
    }
}


export default AdminSeeder;
