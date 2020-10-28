import { validateEmail } from './helpers';

export default function validateUsers(users): void {
    console.log('User validation starts.......');
    let validUsers = 0;
    let invalidUsers = 0;
    const userValid = [];
    const userInvalid = [];
    for (const x of users ) {
        if (validateEmail(x.traineeEmail) && validateEmail(x.reviewerEmail)) {
            userValid[validUsers] = x;
            validUsers++;
        }
        else {
            userInvalid[invalidUsers] = x;
            invalidUsers++;
        }
    }
    console.log('Valid users are');
    userValid.forEach ((item) => console.log(item) );
    console.log('Number of valid users are ' + validUsers);
    console.log('Invalid users are');
    userInvalid.forEach ((item) =>  console.log(item) );
    console.log('invalid users are ' + invalidUsers);
}


