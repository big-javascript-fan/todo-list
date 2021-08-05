import {all} from 'redux-saga/effects'

import * as UserSagas from './user'

export default function* rootSaga() {
	yield all([
		UserSagas.watchLogin(),
		UserSagas.watchRegister(),
		UserSagas.watchGetProfile(),
		UserSagas.watchGetTodos(),
	])
}
