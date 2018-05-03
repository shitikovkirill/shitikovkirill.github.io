export default function() {

  this.namespace = '';

  this.get('/authors', (schema, request) => {
    return schema.authors.all();
  });

  this.get('/authors/:id/blog-posts', (schema, request) => {
    let author = schema.authors.find(request.params.id);

    return author.blogPosts;
  });

  this.get('/authors/:id', (schema, request) => {
    return schema.authors.find(request.params.id);
  });
}
