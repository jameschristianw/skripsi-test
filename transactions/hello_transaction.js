const {
    BaseTransaction,
    TransactionError
} = require('@liskhq/lisk-transactions');

class HelloTransaction extends BaseTransaction {

    /**
    * Set the `HelloTransaction` transaction TYPE to `10`.
    * Every time a transaction is received, it is differentiated by the type.
    * The first 10 types, from 0-9 is reserved for the default Lisk Network functions.
    */
    static get TYPE () {
        return 20;
    }

    /**
    * Set the `HelloTransaction` transaction FEE to 1 LSK.
    * Every time a user posts a transaction to the network, the transaction fee is paid to the delegate who includes the transaction into the block that the delegate forges.
    */
    static get FEE () {
        // return `${10 ** 8}`; // (= 1 LSK)
        return `0`;
    };

    /**
    * Prepares the necessary data for the `apply` and `undo` step.
    * The "hello" property will be added only to sender's account, therefore it is the only resource required in the `applyAsset` and `undoAsset` steps.
    */
	async prepare(store) {
		await store.account.cache([
			{
				address: this.senderId,
			},
		]);
	}

    /**
    * Validation of the value of the "hello" property, defined by the `HelloTransaction` transaction signer.
    * The implementation below checks that the value of the "hello" property needs to be a string, which is not longer than 64 characters.
    */
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

    /**
    * applyAsset is where the custom logic of the Hello World app is implemented.
    * applyAsset() and undoAsset() uses the information about the sender's account from the `store`.
    * Here it is possible to store additional information regarding the accounts using the `asset` field. The content property of "hello" transaction's asset is saved into the "hello" property of the account's asset.
    */
	applyAsset(store) {
        const errors = [];
        const sender = store.account.get(this.senderId);
        // if (sender.asset && sender.asset.hello) {
        //     errors.push(
        //         new TransactionError(
        //             'You cannot send a hello transaction multiple times',
        //             this.id,
        //             '.asset.hello',
        //             this.amount.toString()
        //         )
        //     );
        // } else {
        //     const newObj = { ...sender, asset: { hello: this.asset.hello } };
        //     store.account.set(sender.address, newObj);
        // }
        const newObj = { ...sender, asset: { hello: this.asset.hello } };
        store.account.set(sender.address, newObj);
        return errors; // array of TransactionErrors, returns empty array if no errors are thrown
	}

    /**
    * Inverse of `applyAsset`.
    * Undoes the changes made in applyAsset() step - reverts to the previous value of "hello" property, if not previously set this will be null.
    */
	undoAsset(store) {
		const sender = store.account.get(this.senderId);
		const oldObj = { ...sender, asset: null };
		store.account.set(sender.address, oldObj);
		return [];
	}
}

module.exports = HelloTransaction;
