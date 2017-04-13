export default {

	name(name) {
		return name && name.match(/^[a-zA-Z\s-']+$/);
	},

	phone(phone) {
		return phone && phone.replace(/[^\d]/g, '').length === 10;
	},

	email(email) {
		return email && email.match(/^[a-zA-Z\d]+@[a-zA-Z\d]+\.[a-zA-Z]+$/);
	}
}