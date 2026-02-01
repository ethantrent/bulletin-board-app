const events = require('../events');

describe('Events Module', () => {
  test('should export an array of events', () => {
    expect(Array.isArray(events)).toBe(true);
  });

  test('should have at least 3 events', () => {
    expect(events.length).toBeGreaterThanOrEqual(3);
  });

  test('should have event with id 1', () => {
    const event = events.find(e => e.id === 1);
    expect(event).toBeDefined();
    expect(event.id).toBe(1);
  });

  test('first event should have Docker Workshop title', () => {
    expect(events[0].title).toBe('Docker Workshop');
  });

  test('first event should have detail property', () => {
    expect(events[0]).toHaveProperty('detail');
    expect(events[0].detail).toBe('Linuxing in London ');
  });

  test('first event should have date property', () => {
    expect(events[0]).toHaveProperty('date');
    expect(events[0].date).toBe('2017-11-21');
  });

  test('second event should have WinOps #17 title', () => {
    expect(events[1].title).toBe('WinOps #17');
  });

  test('second event should have WinOps London detail', () => {
    expect(events[1].detail).toBe('WinOps London');
  });

  test('third event should have Docker London title', () => {
    expect(events[2].title).toBe('Docker London');
  });

  test('third event should have id 3', () => {
    expect(events[2].id).toBe(3);
  });

  test('each event should have an id', () => {
    events.forEach(event => {
      expect(event).toHaveProperty('id');
      expect(typeof event.id).toBe('number');
    });
  });

  test('each event should have a title', () => {
    events.forEach(event => {
      expect(event).toHaveProperty('title');
      expect(typeof event.title).toBe('string');
    });
  });

  test('each event should have a date', () => {
    events.forEach(event => {
      expect(event).toHaveProperty('date');
      expect(typeof event.date).toBe('string');
    });
  });

  test('events with detail should be strings', () => {
    events.forEach(event => {
      if (event.hasOwnProperty('detail')) {
        expect(typeof event.detail).toBe('string');
      }
    });
  });

  test('should return same data on multiple calls', () => {
    const events1 = require('../events');
    const events2 = require('../events');
    expect(events1).toEqual(events2);
  });
});
