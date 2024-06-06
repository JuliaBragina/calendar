import { createServer, Response } from 'miragejs';

let users = [
  { id: '1', name: 'John Doe', login: 'john', pass: '12345' }
];

let events = [
  { id: 1, name: 'Event 1', start: "2024-06-03T09:00:00Z", stop: "2024-06-03T11:45:00Z"},
  { id: 2, name: 'Event 2', start: "2024-06-04T10:00:00Z", stop: "2024-06-04T12:15:00Z" },
  { id: 3, name: 'Event 3', start: "2024-06-05T11:50:00Z", stop: "2024-06-05T12:00:00Z" },
  { id: 4, name: 'Event 4', start: "2024-06-06T12:10:00Z", stop: "2024-06-06T13:00:00Z" },
  { id: 5, name: 'Event 5', start: "2024-06-07T10:00:00Z", stop: "2024-06-07T12:00:00Z" },
  { id: 6, name: 'Event 6', start: "2024-06-07T15:00:00Z", stop: "2024-06-07T17:00:00Z" },
  { id: 7, name: 'Event 7', start: "2024-06-07T15:00:00Z", stop: "2024-06-07T17:00:00Z" },
  { id: 8, name: 'Event 8', start: "2024-05-28T10:00:00Z", stop: "2024-05-28T12:00:00Z" },
  { id: 9, name: 'Event 9', start: "2024-05-29T15:00:00Z", stop: "2024-05-29T17:00:00Z" },
  { id: 10, name: 'Event 10', start: "2024-05-30T15:00:00Z", stop: "2024-05-30T17:00:00Z" }
];

export function makeServer() {
  return createServer({
    routes() {
      this.namespace = 'api';

      // Users routes
      this.post('/signup', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        if (users.some(user => user.login === attrs.login)) {
          return new Response(400, {}, { errors: ['Login already exists'] });
        }
        let newUser = { id: String(users.length + 1), ...attrs };
        users.push(newUser);
        return { user: newUser };
      });

      this.post('/signin', (schema, request) => {
        let { login, pass } = JSON.parse(request.requestBody);
        let user = users.find(user => user.login === login && user.pass === pass);
        if (user) {
          return { user };
        } else {
          return new Response(401, {}, { errors: ['Invalid login or password'] });
        }
      });

      this.get('/user', (schema, request) => {
        if (request) {
          if (users) {
            return { users };
          }
        }
        return new Response(401, {}, { errors: ['Unauthorized'] });
      });

      this.get('/signout', (req, res) => {
        return res;
      });

      // Events routes
      this.get('/events', (schema, request) => {
        let { start, stop } = request.queryParams;
        let filteredEvents = events.filter(event => {
          let eventStart = new Date(event.start);
          let eventStop = new Date(event.stop);
          return eventStart >= new Date(start) && eventStop <= new Date(stop);
        });
        return { filteredEvents };
      });

      this.put('/events', (schema, request) => {
        let newEvent = request.queryParams;
        newEvent.id = events.length + 1;
        events.push(newEvent);
        return { newEvent };
      });

      this.delete('/events', (schema, request) => {
        let id = request.queryParams.id;
        events = events.filter(event => event.id !== id);
        return { events };
      });
    }
  });
}
