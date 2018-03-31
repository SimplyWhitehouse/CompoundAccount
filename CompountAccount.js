/** Acts as an account that is affected by compound interest
	PARAMS
		{Object} config	- Constructor uses the value and rate properties
			config.value - The starting value of the account
			config.rate  - The interest rate of the account
*/
function CompoundAccount(config){
	config = config || {};
				
	// Start value of the account, default $0
	this.value = config.hasOwnProperty("value") ? toMoney(config.value) : 0;

	// Interest rate of the account, default 0%
	const rate = config.hasOwnProperty("rate") ? config.rate : 0;


	function toMoney(num){
		return ~~(num*100)/100;
	}

	/** Accrues interest at the assigned rate, and will try to apply the delta to the principal
		PARAM
			{number} delta - The change in principal to be applied to the account
		RETURNS
			{number} - The amount of delta that was not applied to the principal
	*/
	this.step = function(delta){
		delta = toMoney(delta) || 0;
		
		let newValue = toMoney(this.value*(1+rate) + delta),
		let remainingDelta = 0
		
		if (newValue < 0) {
			remainingDelta = -newValue;
			newValue = 0;
		}
		this.value = newValue;
		return remainingDelta;
	}
}