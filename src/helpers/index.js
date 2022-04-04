export const findById = (resources, id) => {
  return resources.find(r => r.id === id)
}

// update or insert if it doe snot exists
export const upsert = (resources, resource) => {
  const index = resources.findIndex(p => p.id === resource.id)
  if (resource.id && index !== -1) {
    resources[index] = resource
  } else {
    resources.push(resource)
  }
}

// const fetchResource = (resource, id) => fetch(`/api/${resource}/${id}`)
// const makeFetcher = resource => id => fetchResource(resource, id)
// const fetchTheater = makeFetcher('theaters')