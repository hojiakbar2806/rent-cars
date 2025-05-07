class ResourceNotFoundException(Exception):
    def __init__(self, resource: str, resource_id: str):
        self.resource = resource
        self.resource_id = resource_id
        self.message = f"{resource.capitalize()} with ID {resource_id} not found"
        super().__init__(self.message)

class ResourceAlreadyExistException(Exception):
    def __init__(self, resource: str, stmt: str):
        self.resource = resource
        self.stmt = stmt
        self.message = f"{resource.capitalize()} already exists with this {stmt}"
        super().__init__(self.message)