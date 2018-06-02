export default function(server) {
  server.createList('author', 10);
  server.loadFixtures('rentals');
  server.loadFixtures('reviews');
}
