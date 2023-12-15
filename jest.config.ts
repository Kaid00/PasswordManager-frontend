import {Config} from '@jest/types'

const baseTestDir = '<rootDir>/src/test';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        `${baseTestDir}/**/*test.ts`
    ]
}

export default config;

