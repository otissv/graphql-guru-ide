// API routes
let domain;

if (window.app && window.app.domain) {
  domain = window.app.domain;
} else {
  domain = 'http://localhost:8000';
}

if (domain === 'http://localhost:8000') {
  // console.warn(`API server is set to ${domain}.\nThis can be changed in services.json, domain`);
}

export const ROOT_ROUTE = '/';
export const SCHEMA_ROUTE = `${domain}/schema`;
export const IDE_ROUTE = `${domain}/ide`;

// Root route
