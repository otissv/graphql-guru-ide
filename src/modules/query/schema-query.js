import { query } from '../helpers/async-query.js';
import { API_ROUTE } from '../constants/routes-constants';
import { localAuth } from '../local/services-local';

export default function schema () {
  const { id, token } = localAuth();

  return query({
    url: API_ROUTE,
    auth: { id, token },
    actions: ['__schema'],
    query: `query IntrospectionQuery {
      __schema {
      queryType { 
        name
        description
        ofType {
          kind
          name
          description
        }
        interfaces {
          kind
          name
          description
        }
        enumValues {
          name
          description
          isDeprecated
          deprecationReason
        }
        fields {
          name
          description
          isDeprecated
          deprecationReason
          name
          args {
            name
            description
            defaultValue
          }
          type {
            kind
            name
            description
          }
        }
        
      }
      mutationType {
        name
        description
        ofType {
          kind
          name
          description
        }
        interfaces {
          kind
          name
          description
        }
        enumValues {
          name
          description
          isDeprecated
          deprecationReason
        }
        fields {
          name
          description
          isDeprecated
          deprecationReason
          name
          args {
            name
            description
            defaultValue
          }
          type {
            kind
            name
            description
          }
        }
      }
        subscriptionType {
          name
        description
        ofType {
          kind
          name
          description
        }
        interfaces {
          kind
          name
          description
        }
        enumValues {
          name
          description
          isDeprecated
          deprecationReason
        }
        fields {
          name
          description
          isDeprecated
          deprecationReason
          name
          args {
            name
            description
            defaultValue
          }
          type {
            kind
            name
            description
          }
        }
      }
        types {name
        description
        ofType {
          kind
          name
          description
        }
        interfaces {
          kind
          name
          description
        }
        enumValues {
          name
          description
          isDeprecated
          deprecationReason
        }
        fields {
          name
          description
          isDeprecated
          deprecationReason
          name
          args {
            name
            description
            defaultValue
          }
          type {
            kind
            name
            description
          }
        }
      }
        directives {
          name
        description
          locations
          args {
            name
            description
            defaultValue
          }
          onOperation
          onFragment
          onField
        }
    }
    }`
  });
}
