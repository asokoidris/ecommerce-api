import { faker } from '@faker-js/faker';

class UserSeeder {
    static generateUserData() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            organization: faker.company.name(),
            position: faker.person.jobTitle(),
            country: faker.location.country(),
            howDidYouHearAboutUs: 'opeyemi',
        };
    }
}

export default UserSeeder;
