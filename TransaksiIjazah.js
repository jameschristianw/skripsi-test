const {
    BaseTransaction,
    TransactionError
} = require('@liskhq/lisk-transactions');

class TransaksiIjazah extends BaseTransaction {

    static get TYPE () {
        return 20;
    }

    static get FEE () {
        // return `${10 ** 8}`; // (= 1 LSK)
        return `0`;
    };

	async prepare(store) {
		await store.account.cache([
			{
				address: this.senderId,
			},
		]);
	}

	validateAsset() {
		const errors = [];
		if (!this.asset.nama || typeof this.asset.nama !== 'string' || this.asset.nama.length > 64) {
			errors.push(
				new TransactionError(
					'Invalid "asset.hello" defined on transaction',
					this.id,
					'.asset.hello',
					this.asset.hello,
					'A string value no longer than 64 characters',
				)
			);
		}
		return errors;
	}

	applyAsset(store) {
        const errors = [];
        const sender = store.account.get(this.senderId);
        const newObj = { ...sender, asset: { hello: this.asset.hello } };
        store.account.set(sender.address, newObj);
        return errors; 
	}

	undoAsset(store) {
		const sender = store.account.get(this.senderId);
		const oldObj = { ...sender, asset: null };
		store.account.set(sender.address, oldObj);
		return [];
	}
}

module.exports = TransaksiIjazah;


