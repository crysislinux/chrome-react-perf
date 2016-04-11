/* eslint-disable no-undef, no-console */
import mockConsole from '../../app/utils/mockConsole';

describe('Replace the target properties of console', () => {
  let callbacks;
  let infoValue;
  let logValue;

  const infoMessage = 'I am calling console.info';
  const logMessage = 'I am calling console.log';
  beforeEach(() => {
    infoValue = null;
    logValue = null;
    callbacks = {
      info: (value) => {
        infoValue = value;
      },
      log: (value) => {
        logValue = value;
      }
    };

    mockConsole.mock(callbacks);
  });

  afterEach(() => mockConsole.restore());

  it('replaced functions were called', () => {
    console.info(infoMessage);
    console.log(logMessage);
    expect(infoValue).toBe(infoMessage);
    expect(logValue).toBe(logMessage);
  });

  it('should not mock more than once before restore', () => {
    const result = mockConsole.mock(callbacks);
    expect(result).toBe(false);
  });

  it('should not affect more properties than wanted', () => {
    expect(typeof console.error).toBe('function');
  });

  it('restore mocked properties', () => {
    mockConsole.restore();

    console.log(infoMessage);
    console.log(logMessage);

    expect(infoValue).not.toBe(infoMessage);
    expect(logValue).not.toBe(logMessage);
  });

  it('replace again after restore', () => {
    mockConsole.restore();
    mockConsole.mock(callbacks);
    console.info(infoMessage);
    console.log(logMessage);
    expect(infoValue).toBe(infoMessage);
    expect(logValue).toBe(logMessage);
  });
});
