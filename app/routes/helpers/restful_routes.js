const resource_routes = (router, prefix_resource, resource, controller, second_prefix_resource=null) => {
    let resourceRoot = `/${prefix_resource}s/:${prefix_resource}_id/${resource}s`
    if(second_prefix_resource){
        resourceRoot = `/${prefix_resource}s/:${prefix_resource}_id/${second_prefix_resource}s/:${second_prefix_resource}_id/${resource}s`
    }

    router.get(resourceRoot, controller.index)
    router.post(resourceRoot, controller.create)
    router.get(resourceRoot+`/:${resource}_id`, controller.show)
    router.put(resourceRoot+`/:${resource}_id`, controller.update)
    router.delete(resourceRoot+`/:${resource}_id`, controller.destroy)
}


module.exports = {
    resource_routes
}