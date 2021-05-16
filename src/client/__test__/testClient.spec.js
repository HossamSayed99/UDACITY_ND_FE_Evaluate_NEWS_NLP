import 'babel-polyfill'
import {postUrl, submitForm} from '../index.js'


describe('Client Test', () => {
    test('Checking that post url is defined', () => {
        expect(postUrl).toBeDefined();
    })
    test('Checking that submit form is defined', () => {
        expect(submitForm).toBeDefined();
    })
})