import { plainToClass } from "class-transformer"

import Api from '../api'

export class Todo {
  id
  userId
  name
  email
  title
  createdAt
  deletedAt

  static fromJSON(json) {
		return plainToClass(Todo, json)
	}

	static fromJSONArray(jsonArray) {
		return jsonArray.map((json) => Todo.fromJSON(json))
	}

  static async getAll() {
    try {
      const {error, data} = await Api.get('/get-todos')
      return {error, results: Todo.fromJSONArray(data)}
    } catch (error) {
      console.log(error)
      return {error: Api.parseError(error, "Something went wrong.")}
    }
  }

  static async add(params) {
    try {
      const {error} = await Api.post('/add-todo', params)
      return {error}
    } catch (error) {
      console.log(error)
      return {error: Api.parseError(error, "Something went wrong.")}
    }
  }

  static async remove(id) {
    try {
      const {error} = await Api.post('/remove-todo', {id})
      return {error}
    } catch (error) {
      console.log(error)
      return {error: Api.parseError(error, "Something went wrong.")}
    }
  }

  static async update(id, title) {
    try {
      const {error} = await Api.post('/update-todo', {id, title})
      return {error}
    } catch (error) {
      console.log(error)
      return {error: Api.parseError(error, "Something went wrong.")}
    }
  }
}