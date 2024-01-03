/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { GET } from '../route';
import { test, expect } from '@jest/globals';
import { prismaMock } from '@/singleton';
import type { NextApiResponse } from 'next';
test('should create new user',async()=>{
  const congregationData = { id: "uuid-1234", congregationName: "Maywood", address: "Zoe St" }
  prismaMock.congregation.create.mockResolvedValue(congregationData)
  // Use Jest's mock functionality
  const urlWithId = new URL('http://localhost');
  urlWithId.searchParams.set('id','uuid-1234')
  const req = {
    method: 'GET',
    query: {},
    cookies: {},
    geo: {},
    ip: '127.0.0.1',
    nextUrl: urlWithId,
    // Add other methods and properties you need for your test, mocked with jest.fn()
  } as unknown as NextRequest;
  //The as unknown as NextApiResponse is a way to work around the circular reference issue by first asserting
  // to unknown and then to the desired type.
  const res = {status: jest.fn(()=> res), json: jest.fn()} as unknown as NextApiResponse
  await GET(req,res)

  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.json).toHaveBeenLastCalledWith(congregationData)
}
)