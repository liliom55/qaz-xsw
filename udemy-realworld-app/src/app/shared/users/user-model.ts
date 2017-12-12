export class Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}
export class Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
export class User {
  id: number;
  name: string;
  userName: string;
  email: string;
  address = new Address();
  phone: string;
  website: string;
  company = new Company();
}
