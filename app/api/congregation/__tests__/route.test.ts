import {createMocks} from 'node-mocks-http'
import {GET} from '../route'
import { describe } from 'node:test'

jest.mock('@prisma/client', ()=>{
    const originalModule = jest.requireActual('@prisma/client');
    return {
        __esModule: true,
        ...originalModule,
        PrismaClient: function(){
            return {
                user: {
                    findMany: jest.fn().mockResolvedValue([
                        { }
                    ])
                }
            }
        }
    }
})

describe('/api/congregation', ()=>{
    test('returns a list of users',async()=>{
        const {req,res} = createMocks({
            method: 'GET'
        })
        const response = await GET(req)
        
        expect(response.status).toBe(200)
        expect(await response.json()).toEqual([
            {id:1, name: 'Alice'},
            {id: 2, name: 'Bob'}
        ])
    })

})