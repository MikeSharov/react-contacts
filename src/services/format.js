export default {

	name(name) {
		return name.replace(/[^a-zA-Z\s-']/g, '').replace(/\b[a-z]/g, char => char.toUpperCase());
	},

	phone(phone) {
		let digits = phone.replace(/[^\d]/g, '');
		return `(${digits.substr(0, 3)}) ${digits.substr(3, 3)}-${digits.substr(6, 4)}`;
	},

	email(email) {
		return email.toLowerCase().replace(/[^a-zA-Z\d@.]/g, '');
	}

}