import { Name, Password } from '../object-value'
import Email from '../object-value/Email'

export interface User {
    name: Name
    email: Email
    password: Password
}
