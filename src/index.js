const fs = require('fs');
const crypto = require('crypto');
const Form = require('form-data');
const { resolve } = require('path');
const api = require('./services/apiCordination');

class Cordination {
	constructor() {
		this.filename = 'answer.json';
		this.data = {};

		this.request();
		this.decrypts();
		this.sha1();
		this.write();
		this.post();
	}

	async request() {
		const response = await api.get('/generate-data?token=MEU_TOKEN');
		this.data = response.data;
	}

	async write() {
		await fs.writeFileSync(this.filename, JSON.stringify(this.data));
	}

	async decrypts() {
		const dataCrypto = this.data.cifrado;
		const shift = this.data.numero_casas;
		let dataDecrypted = '';

		for (let i = 0; i < dataCrypto.length; i++) {
			const value = dataCrypto[i];

			if (value.charCodeAt() > 96 && value.charCodeAt() < 123) {
				let index = value.charCodeAt() - shift;
				if (index < 97) {
					index = 123 - (97 - index);
				}
				dataDecrypted += String.fromCharCode(index);
			} else {
				dataDecrypted += value;
			}
		}

		this.data.decifrado = dataDecrypted;
	}

	sha1() {
		const cryptographicSummary = crypto
			.createHash('sha1')
			.update(this.data.decifrado)
			.digest('hex');
		this.data.resumo_criptografico = cryptographicSummary;
	}

	async post() {
		const file = resolve(__dirname, '..', 'answer.json');

		const form = new Form();
		form.append('answer', fs.createReadStream(file, 'utf8'));

		const config = { headers: form.getHeaders() };

		const response = await api.post(
			'/submit-solution?token=MEU_TOKEN',
			form,
			config
		);

		console.log(response.data);
	}
}

Cordination();
