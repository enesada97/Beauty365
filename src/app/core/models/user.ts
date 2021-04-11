export class User {
	userId: number;
	fullName: string;
	email: string;
	address: string;
	notes: string;
	status: boolean;
	mobilePhones: string;
  constructor(user) {
    {
      this.userId=user.userId || 0;
      this.fullName=user.fullName || '';
      this.email=user.email || '';
      this.address=user.address || '';
      this.notes=user.notes || '';
      this.status=user.status || true;
      this.mobilePhones=user.mobilePhones || '';
    }
  }
}
