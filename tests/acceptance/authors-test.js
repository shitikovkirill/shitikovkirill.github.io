test("I can view the authors", function() {
  let authors = server.createList('author', 3);

  visit('/authors');

  andThen(() => {
    equal(find('li').length, 3);
    equal(find('li:first').text(), authors[0].name);
  });
});
