export default function() {

  this.namespace = '';

  this.get('/authors', (schema, request) => {
    return schema.authors.all();
  });
}
