import  {diamond,equilateral} from './patterns';
import {permissions,validateUsers} from './utils';
import {users} from './constants.js'

diamond(5);
equilateral(5);
permissions('getUsers','head-trainer','delete')
validateUsers(users)