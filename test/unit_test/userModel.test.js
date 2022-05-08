import mongoose from "mongoose";
import { describe, it, expect, beforeAll, afterAll, should, afterEach } from "vitest";
import fakerUser from '.././authHelper'

import User from "../../src/models/User";

const testDatabase = "mongodb://localhost:27017/test_database"
mongoose.connect(testDatabase)

describe('User Model test', ()=> {
beforeAll(async()=> {
    await User.remove()
})
afterAll(async()=> {
    await mongoose.connection.close()
})
it("has a module", ()=> {
    expect(User).toBeDefined()
})
describe('create a new user', ()=> {
    it('should save a new user', async()=> {
const user = new User(fakerUser.user)
const savedUser = await user.save()
expect(savedUser.email).toEqual(fakerUser.user.email)
    })
})
})