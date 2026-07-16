class Department:
    def __init__(
        self,
        id=None,
        department_name=None,
        department_code=None,
        department_head=None,
        description=None,
        status="Active"
    ):
        self.id = id
        self.department_name = department_name
        self.department_code = department_code
        self.department_head = department_head
        self.description = description
        self.status = status

    def to_dict(self):
        return {
            "id": self.id,
            "department_name": self.department_name,
            "department_code": self.department_code,
            "department_head": self.department_head,
            "description": self.description,
            "status": self.status
        }