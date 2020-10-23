import {validateEmail} from './helpers'

// const users=[
//     {
//         traineeEmail: 'trainee1@successive.tech',
//         reviewerEmail: 'reviewer1@successive.tech',
//     },
//     {
//         traineeEmail: 'trainee2@successive.tech',
//         reviewerEmail: 'reviewer2@successive.tech',
//     },

//     {
//         traineeEmail: 'trainee3@gmail.com',
//         reviewerEmail: 'reviewer3@successive.tech',
//     }
// ]

// function validateEmail(email)
// {
//     const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@successive.tech$/
//     return re.test(email);
// }

export default function validateUsers(users)
{
    console.log("User validation starts.......")
    let validUsers=0;
    let invalidUsers=0;
    let userValid=[]
    let userInvalid=[]
    for(let i=0;i<users.length;i++)
    {
        if(validateEmail(users[i].traineeEmail) && validateEmail(users[i].reviewerEmail))
        {
            userValid[validUsers]=users[i];
            validUsers++;
        }
        else
        {
            userInvalid[invalidUsers]=users[i]
            invalidUsers++;
        }
    }
    console.log("Valid users are")
    userValid.forEach(function(item) {
        console.log(item)
      })
    console.log("Number of valid users are "+ validUsers)
    console.log("Invalid users are")
    userInvalid.forEach(function(item) {
        console.log(item)
      })
    console.log("invalid users are "+ invalidUsers)
}


