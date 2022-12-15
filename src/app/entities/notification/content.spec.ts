import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Notification content');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less then 5 characters', () => {
    expect(() => new Content('A'.repeat(4))).toThrowError();
  });

  it('should not be able to create a notification content with more then 240 characters', () => {
    expect(() => new Content('A'.repeat(241))).toThrowError();
  });
});
