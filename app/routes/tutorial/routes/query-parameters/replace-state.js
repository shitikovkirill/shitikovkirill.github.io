import Route from '@ember/routing/route';

export default Route.extend ({
  queryParams: {
    query: {
      //assigning replace state as true
      replace: true
    }
  }
});
