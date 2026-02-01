const api = require('../api');
const events = require('../events');

describe('API Module', () => {
  describe('exports.events', () => {
    test('should export a function', () => {
      expect(typeof api.events).toBe('function');
    });

    test('should handle GET request for all events', () => {
      const mockRes = {
        json: jest.fn().mockReturnThis()
      };

      api.events(null, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(events);
      expect(mockRes.json).toHaveBeenCalledTimes(1);
    });

    test('should return the events array', () => {
      const mockRes = {
        json: jest.fn()
      };

      api.events({}, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ id: 1, title: 'Docker Workshop' })
      ]));
    });

    test('should respond with valid event structure', () => {
      const mockRes = {
        json: jest.fn((data) => {
          expect(Array.isArray(data)).toBe(true);
          data.forEach(event => {
            expect(event).toHaveProperty('id');
            expect(event).toHaveProperty('title');
            expect(event).toHaveProperty('date');
          });
        })
      };

      api.events({}, mockRes);
    });
  });

  describe('exports.event', () => {
    test('should export a function', () => {
      expect(typeof api.event).toBe('function');
    });

    test('should handle request with eventId parameter', () => {
      const mockReq = {
        param: {
          eventId: 0
        }
      };

      const mockRes = {
        json: jest.fn()
      };

      api.event(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalled();
    });

    test('should return event data for valid eventId', () => {
      const mockReq = {
        param: {
          eventId: 0
        }
      };

      const mockRes = {
        json: jest.fn()
      };

      api.event(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(events[0]);
    });

    test('should handle different eventIds', () => {
      const mockRes = {
        json: jest.fn()
      };

      // Test with eventId 1
      api.event({ param: { eventId: 1 } }, mockRes);
      expect(mockRes.json).toHaveBeenCalledWith(events[1]);

      // Reset and test with eventId 2
      mockRes.json.mockClear();
      api.event({ param: { eventId: 2 } }, mockRes);
      expect(mockRes.json).toHaveBeenCalledWith(events[2]);
    });

    test('should call json method on response', () => {
      const mockRes = {
        json: jest.fn()
      };

      api.event({ param: { eventId: 0 } }, mockRes);

      expect(mockRes.json).toHaveBeenCalledTimes(1);
    });

    test('should return undefined for out of bounds eventId', () => {
      const mockRes = {
        json: jest.fn()
      };

      api.event({ param: { eventId: 999 } }, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(undefined);
    });
  });

  describe('Module Integration', () => {
    test('should have both events and event functions', () => {
      expect(api).toHaveProperty('events');
      expect(api).toHaveProperty('event');
    });

    test('events function should return all events', () => {
      const mockRes = {
        json: jest.fn()
      };

      api.events({}, mockRes);

      const callArgs = mockRes.json.mock.calls[0][0];
      expect(callArgs.length).toBe(events.length);
    });
  });
});
