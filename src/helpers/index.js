export const findById = (resources, id) => {
  if (!resources) return null
  return resources.find(r => r.id === id)
}

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
