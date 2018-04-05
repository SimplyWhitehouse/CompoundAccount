/** Acts as an account that is affected by compound interest
	PARAMS
		{Object} config	- Constructor uses the value and rate properties
			config.value - The starting value of the account
			config.rate  - The interest rate of the account
*/
function CompoundAccount(config){
	// Default config isn't filled because we need to check for the properties either way
	//   No sense in investing the effort
	config = config || {};
				
	// Start value of the account, default $0
	this.value = config.hasOwnProperty("value") ? roundToMoney(config.value) : 0;

	// Interest rate of the account, default 0%
	this.rate = config.hasOwnProperty("rate") ? config.rate : 0;

	// Floor to the hundredth
	function roundToMoney(num){
		return ~~(num*100)/100;
	}

	/** Accrues interest at the assigned rate, and will try to apply the delta to the principal
		PARAM
			{number} delta - The change in principal to be applied to the account
		RETURNS
			{number} - The amount of delta that was not applied to the principal
	*/
	this.step = function(delta){
		delta = roundToMoney(delta) || 0;
		
		let newValue = roundToMoney(this.value*(1+this.rate) + delta);
		let remainingDelta = 0
		
		if (newValue < 0) {
			remainingDelta = newValue;
			newValue = 0;
		}

		this.value = newValue;
		return remainingDelta;
	}
}