class GeneralError extends Error {
	constructor(message) {
		super();
		this.message = message;
	}

	getCode() {
		if (this instanceof BadRequest) {
			return 400;
		} else if (this instanceof NotFound) {
			return 404;
		}
	}
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}

module.exports = {
	GeneralError,
	BadRequest,
	NotFound,
};
